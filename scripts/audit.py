"""Self-critique audit across every route: headings, a11y names, copy rules."""
import re, sys, urllib.request

BASE = "http://localhost:3001"
ROUTES = [
    "/", "/services", "/services/ai-consulting", "/services/cloud-infrastructure",
    "/services/cybersecurity", "/services/software-consulting", "/services/managed-it",
    "/industries", "/about", "/careers", "/blog",
    "/blog/rag-permissions-not-hallucination", "/blog/dependency-map-cost",
    "/blog/ninety-one-findings-is-not-a-report", "/blog/characterization-tests",
    "/contact", "/privacy-policy", "/terms-and-conditions",
]

BANNED = [
    "cutting-edge", "cutting edge", "synergy", "revolutioniz", "revolutionis",
    "seamless", "leverage", "best-in-class", "world-class", "game-chang",
    "bespoke solution", "holistic", "paradigm", "empower", "unlock the power",
]

# Phrases that would imply a track record CloudMind does not have.
TENURE = [
    r"since 20[01]\d", r"years of experience", r"trusted by \d", r"over \d+ clients",
    r"decades of", r"our \d+ clients", r"\d+\+ years",
]

def get(path):
    with urllib.request.urlopen(BASE + path, timeout=60) as r:
        return r.read().decode("utf-8", "replace")

def strip_tags(s):
    s = re.sub(r"<script.*?</script>", " ", s, flags=re.S)
    s = re.sub(r"<style.*?</style>", " ", s, flags=re.S)
    return re.sub(r"<[^>]+>", " ", s)

problems = []

for route in ROUTES:
    try:
        html = get(route)
    except Exception as e:
        problems.append((route, "FETCH", str(e)))
        continue

    body = html
    # --- headings ---
    heads = [(int(m.group(1)), strip_tags(m.group(2)).strip())
             for m in re.finditer(r"<h([1-6])\b[^>]*>(.*?)</h\1>", body, flags=re.S)]
    h1s = [h for h in heads if h[0] == 1]
    if len(h1s) != 1:
        problems.append((route, "H1", f"expected exactly 1 h1, found {len(h1s)}"))

    prev = 0
    for lvl, text in heads:
        if prev and lvl > prev + 1:
            problems.append((route, "SKIP", f"h{prev} -> h{lvl} at {text[:52]!r}"))
        prev = lvl
        if not text.strip():
            problems.append((route, "EMPTY-H", f"empty h{lvl}"))

    # --- images need accessible names ---
    # alt="" IS correct for decorative images, but only when they are also
    # removed from the accessibility tree and something adjacent carries the
    # name (e.g. the logo mark beside the wordmark). Empty alt without
    # aria-hidden is the real defect.
    for m in re.finditer(r"<img\b[^>]*>", body):
        tag = m.group(0)
        alt = re.search(r'\salt="([^"]*)"', tag)
        decorative = 'aria-hidden="true"' in tag
        if alt is None:
            problems.append((route, "IMG", f"no alt attribute: {tag[:80]}"))
        elif not alt.group(1).strip() and not decorative:
            problems.append((route, "IMG", f"empty alt, not marked decorative: {tag[:80]}"))

    # --- role=img needs a label ---
    for m in re.finditer(r'<div\b[^>]*role="img"[^>]*>', body):
        if "aria-label" not in m.group(0):
            problems.append((route, "ROLE-IMG", "role=img without aria-label"))

    # --- links must have discernible text ---
    for m in re.finditer(r"<a\b([^>]*)>(.*?)</a>", body, flags=re.S):
        attrs, inner = m.group(1), m.group(2)
        text = strip_tags(inner).strip()
        if not text and "aria-label" not in attrs and "sr-only" not in inner:
            problems.append((route, "LINK", f"link with no accessible text: {attrs[:70]}"))

    # --- buttons must have discernible text ---
    for m in re.finditer(r"<button\b([^>]*)>(.*?)</button>", body, flags=re.S):
        attrs, inner = m.group(1), m.group(2)
        text = strip_tags(inner).strip()
        if not text and "aria-label" not in attrs:
            problems.append((route, "BUTTON", f"button with no accessible text: {attrs[:70]}"))

    # --- metadata ---
    if not re.search(r"<title>[^<]{5,}</title>", body):
        problems.append((route, "TITLE", "missing or too-short <title>"))
    if not re.search(r'<meta name="description" content="[^"]{40,}"', body):
        problems.append((route, "DESC", "missing or short meta description"))
    if 'rel="canonical"' not in body:
        problems.append((route, "CANON", "no canonical link"))

    # --- copy rules ---
    text_only = strip_tags(body).lower()
    for w in BANNED:
        if w in text_only:
            problems.append((route, "BANNED", f"marketing filler: {w!r}"))
    for pat in TENURE:
        m = re.search(pat, text_only)
        if m:
            problems.append((route, "TENURE", f"implies track record: {m.group(0)!r}"))

    # --- viewport must not block zoom ---
    vp = re.search(r'<meta name="viewport" content="([^"]*)"', body)
    if vp and ("user-scalable=no" in vp.group(1) or "maximum-scale" in vp.group(1)):
        problems.append((route, "ZOOM", "viewport blocks zoom"))

print(f"Audited {len(ROUTES)} routes.\n")
if not problems:
    print("No issues found.")
else:
    by_kind = {}
    for route, kind, msg in problems:
        by_kind.setdefault(kind, []).append((route, msg))
    for kind, items in sorted(by_kind.items()):
        print(f"[{kind}]  {len(items)}")
        seen = set()
        for route, msg in items:
            key = (route, msg)
            if key in seen:
                continue
            seen.add(key)
            print(f"   {route:<44} {msg}")
        print()
sys.exit(0)
