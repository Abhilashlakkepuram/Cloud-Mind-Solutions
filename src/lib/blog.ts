/**
 * Insights content.
 *
 * Posts are structured blocks rather than MDX so the long-form typography stays
 * under the design system's control and no markdown pipeline is needed. Swapping
 * to MDX or a CMS later means replacing `body` — the post template renders from
 * the block union and does not care where the blocks come from.
 *
 * All four posts are real, written articles. Authors are [PLACEHOLDER] until the
 * team page is filled in.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; lang: string; code: string };

export interface Post {
  slug: string;
  title: string;
  /** Shown on the card and as the meta description. */
  excerpt: string;
  category: Category;
  publishedAt: string; // ISO
  readMinutes: number;
  author: { name: string; role: string };
  cover: { label: string; width: number; height: number };
  body: Block[];
}

export const CATEGORIES = [
  "Applied AI",
  "Cloud",
  "Security",
  "Software",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const posts: Post[] = [
  {
    slug: "rag-permissions-not-hallucination",
    title: "Your RAG system's biggest risk isn't hallucination. It's permissions.",
    excerpt:
      "Everyone tests retrieval systems for made-up answers. Almost nobody tests them for correctly-sourced answers shown to the wrong person — which is the failure that ends up in a breach notification.",
    category: "Applied AI",
    publishedAt: "2026-08-04",
    readMinutes: 7,
    author: { name: "[PLACEHOLDER] Founder Name", role: "Founder · Applied AI" },
    cover: { label: "Post cover — retrieval and permissions", width: 1200, height: 675 },
    body: [
      {
        type: "p",
        text: "Ask a team how they are testing their retrieval system and you will hear about hallucination. They have a set of questions, they check whether the answers are grounded in the source documents, and they track a faithfulness score. That work is worth doing. It is also aimed at the second-most-important failure mode.",
      },
      {
        type: "p",
        text: "The first is quieter. The system retrieves a real passage, from a real document, cites it correctly, and shows it to somebody who was never allowed to open that file. Every quality metric passes. The answer is faithful, grounded, and accurate. It is also a data incident.",
      },
      { type: "h2", text: "How it happens" },
      {
        type: "p",
        text: "Almost always the same way. The indexing job runs as a service account, because that is the straightforward way to read every document in the corpus. The account needs broad access to do its job, so it gets broad access. The embeddings that come out the other side carry no memory of who could read the source.",
      },
      {
        type: "p",
        text: "At query time the system searches that flattened index. The retrieval layer knows about semantic similarity. It does not know that the HR investigation file is restricted, because by the time the text became a vector, that fact was gone.",
      },
      {
        type: "quote",
        text: "The permissions were not bypassed. They were discarded at ingestion, and nothing downstream ever knew they existed.",
      },
      { type: "h2", text: "Why the usual mitigations don't hold" },
      {
        type: "p",
        text: "Three fixes come up repeatedly, and each fails in a way worth understanding before you rely on it.",
      },
      {
        type: "h3",
        text: "Telling the model not to",
      },
      {
        type: "p",
        text: "A system prompt instructing the model to withhold restricted material is a request, not a control. The passage is already in the context window. You are asking the model to be discreet about information you handed it, and you cannot audit that decision after the fact.",
      },
      { type: "h3", text: "Filtering after retrieval" },
      {
        type: "p",
        text: "Better, and still leaky. If you retrieve ten chunks and drop three the user cannot see, the seven that remain were selected in the context of the three. Worse, the shape of what is missing is often informative on its own — a user learning that four documents about their own department exist but cannot be shown has learned something.",
      },
      { type: "h3", text: "One index per team" },
      {
        type: "p",
        text: "This works until permissions stop being neatly hierarchical, which is immediately. Matter-level access in a law firm, per-patient access in a clinic, and per-deal access in finance are all overlapping rather than nested. You end up with an index per user, and then you have a rebuild problem instead of a security problem.",
      },
      { type: "h2", text: "What actually works" },
      {
        type: "p",
        text: "Carry the permission with the chunk, and filter inside the search rather than around it.",
      },
      {
        type: "ol",
        items: [
          "At ingestion, capture the ACL of the source document and store it as metadata on every chunk derived from it.",
          "At query time, resolve the caller's identity into the set of principals they hold — user, groups, roles, and any matter or case scoping.",
          "Pass those principals into the vector search as a pre-filter, so restricted chunks are never candidates for retrieval in the first place.",
          "Re-check at generation time against the live source of truth, because group membership changes between indexing and query.",
        ],
      },
      {
        type: "code",
        lang: "python",
        code: `# The filter belongs INSIDE the search, not after it.
results = index.query(
    vector=embed(question),
    top_k=8,
    filter={"acl_principals": {"$in": caller.principals()}},
)`,
      },
      {
        type: "p",
        text: "The difference between a pre-filter and a post-filter looks like an implementation detail and is not. A pre-filter changes what is retrievable. A post-filter changes what is displayed, after the restricted content has already influenced ranking and already entered your logs.",
      },
      {
        type: "callout",
        title: "The test that catches this",
        text: "Add adversarial cases to your evaluation set: a question whose best answer lives in a document the test user cannot open. The correct output is a refusal or a materially worse answer. If your system returns the good answer, it just failed — and no faithfulness metric will tell you.",
      },
      { type: "h2", text: "The retention problem nobody plans for" },
      {
        type: "p",
        text: "One more consequence, because it arrives about a year in. If your retention policy says a document class is deleted after seven years, that policy now applies to the embeddings and to any cached generation derived from them. Most teams discover this when someone asks whether a deletion request actually deleted anything.",
      },
      {
        type: "p",
        text: "Plan for it at design time. Keep a durable link from every chunk back to its source document so deletion can cascade. Retrofitting that link into a live index is unpleasant work, and it is always scheduled at the least convenient moment.",
      },
      {
        type: "p",
        text: "None of this is difficult engineering. It is just work that has to happen at ingestion, which is the point in the project where everyone is most eager to see the demo work and least interested in access control.",
      },
    ],
  },

  {
    slug: "dependency-map-cost",
    title: "What a dependency map costs — and what skipping one costs more",
    excerpt:
      "Two weeks of discovery feels like two weeks of nothing happening. It is the cheapest insurance available on a migration, and the reason most overruns are decided before any workload moves.",
    category: "Cloud",
    publishedAt: "2026-07-21",
    readMinutes: 6,
    author: { name: "[PLACEHOLDER] Founder Name", role: "Founder · Cloud & Platform" },
    cover: { label: "Post cover — dependency mapping", width: 1200, height: 675 },
    body: [
      {
        type: "p",
        text: "Every migration overrun we have seen traces back to the same root cause, and it is never the thing on the risk register. It is a dependency nobody knew about, discovered during a cutover window, at the point where rolling back is expensive and pressing on is worse.",
      },
      {
        type: "p",
        text: "The uncomfortable part is that discovery is unglamorous. Two weeks of interviews and packet captures produces a document, not a running system. Sponsors who have just approved a migration budget want to see workloads moving. Saying \"we are not touching anything for a fortnight\" is a hard sell, and it is the right call almost every time.",
      },
      { type: "h2", text: "What the map is actually for" },
      {
        type: "p",
        text: "Not for the systems you know about. Those are on the architecture diagram already. The map exists to surface the four categories that are never documented:",
      },
      {
        type: "ul",
        items: [
          "Scheduled jobs on machines that are not in the inventory, usually running as a departed employee's account",
          "Hardcoded IP addresses and hostnames in configuration files, which survive a lift-and-shift right up until DNS changes",
          "Database links and linked servers connecting two systems that officially do not integrate",
          "Licences tied to a MAC address, a hostname, or a physical dongle in a rack you are about to decommission",
        ],
      },
      {
        type: "quote",
        text: "Every organisation has at least one system that everything quietly depends on and nobody owns. It is not on the diagram because the person who built it left.",
      },
      { type: "h2", text: "How to actually build one" },
      {
        type: "p",
        text: "Three sources, and you need all three because each misses what the others catch.",
      },
      {
        type: "h3",
        text: "Network flow data",
      },
      {
        type: "p",
        text: "Capture for a minimum of two weeks, and prefer a full month if a period-end process exists. This is the single most common discovery mistake: a week of capture misses everything that runs monthly, and the monthly job is disproportionately likely to be the fragile one.",
      },
      { type: "h3", text: "Configuration inspection" },
      {
        type: "p",
        text: "Grep the configuration for IP literals, connection strings, and file share paths. Flow data shows you traffic that happened; configuration shows you intent, including paths that only fire under conditions you did not observe.",
      },
      { type: "h3", text: "Conversations" },
      {
        type: "p",
        text: "Ask the people who get paged what they worry about. Not the architects — the operators. The question that works is: \"if you had to take this down for an hour, who would call you?\" People who cannot describe an architecture can always answer that.",
      },
      {
        type: "callout",
        title: "The output is not a diagram",
        text: "It is a list, with an owner, a criticality, and a migration wave for every item. A diagram looks better in a steering pack. A list is what you sequence work from, and it is what you can check off during a cutover at 2am.",
      },
      { type: "h2", text: "The arithmetic" },
      {
        type: "p",
        text: "Two engineers for two weeks is a real cost and easy to quantify. Set it against the alternative: a cutover that fails, a rollback that has never been rehearsed, a business day lost, and the credibility cost of the second attempt. The discovery phase is cheaper than one failed weekend, and failed weekends are the normal outcome of skipping it.",
      },
      {
        type: "p",
        text: "There is a second return that is harder to price. The map outlives the migration. It becomes the disaster recovery plan, the onboarding document, and the thing you hand an auditor. Teams have told us afterwards that the inventory turned out to be more durably useful than the migration it enabled.",
      },
      {
        type: "p",
        text: "One rule makes it stick: nothing moves until the map is signed off. Not as a bureaucratic gate — as an admission that a plan built on an incomplete inventory is a guess wearing a Gantt chart.",
      },
    ],
  },

  {
    slug: "ninety-one-findings-is-not-a-report",
    title: "Ninety-one findings is not a security report",
    excerpt:
      "A list sorted by CVSS score is not a priority order, because severity is a property of a vulnerability and risk is a property of your network. Here is what to ask for instead.",
    category: "Security",
    publishedAt: "2026-07-02",
    readMinutes: 6,
    author: { name: "[PLACEHOLDER] Founder Name", role: "Founder · Security" },
    cover: { label: "Post cover — attack path analysis", width: 1200, height: 675 },
    body: [
      {
        type: "p",
        text: "A client handed us the assessment their previous vendor had delivered. Ninety-one findings, sorted by CVSS score, each with a paragraph of generic remediation advice copied from the scanner's knowledge base. Twelve months old. Nothing had been fixed.",
      },
      {
        type: "p",
        text: "That is not a failure of diligence on the client's part. It is the predictable result of receiving an unrankable list. Faced with ninety-one items and no way to tell which four matter, the rational response is paralysis.",
      },
      { type: "h2", text: "Why severity is not priority" },
      {
        type: "p",
        text: "CVSS scores a vulnerability in isolation. It is deliberately context-free, which makes it useful for describing a vulnerability and useless for prioritising your remediation.",
      },
      {
        type: "p",
        text: "A critical on an isolated internal host with no path to anything valuable matters less than a medium on the jump box that holds domain admin credentials. The scanner cannot make that distinction. It does not know your network, your data classification, or which system would end your week if it were compromised.",
      },
      {
        type: "quote",
        text: "Severity describes the vulnerability. Risk describes what the vulnerability lets somebody do in your environment. Only the second one is actionable.",
      },
      { type: "h2", text: "Work backwards from the target" },
      {
        type: "p",
        text: "Attack-path analysis inverts the process. Rather than enumerating weaknesses and sorting them, start from what an attacker would actually be after and map the routes that reach it.",
      },
      {
        type: "ol",
        items: [
          "Name the crown jewels concretely: the customer database, the payment path, the domain controller, the source repository.",
          "Pick realistic starting positions — a phished user account, a compromised vendor login, an internet-facing service.",
          "Map the routes between them. Every hop is a finding that matters, and a finding that shortens a route matters more than one that does not appear on any.",
          "Rank by path length and impact. The finding that collapses a five-hop path to two is your first fix, whatever its score.",
        ],
      },
      {
        type: "p",
        text: "In the case above, this produced four findings on the critical path. The client's own team remediated all four in eleven days — work that had sat untouched for a year as part of a ninety-one item list. Nothing about their capacity changed. The list became rankable.",
      },
      {
        type: "callout",
        title: "What to ask a prospective assessor",
        text: "\"Show me a sample report.\" If the findings are sorted by CVSS with generic remediation text, you are buying scanner output with a cover page. If they are organised by attack path, with reproduction steps you could follow yourself, you are buying analysis.",
      },
      { type: "h2", text: "The rest of the findings still matter" },
      {
        type: "p",
        text: "To be clear: the other eighty-seven were not fictional. They were documented, with the reasoning for deprioritising each one written down, so the decision could be revisited when the network changed.",
      },
      {
        type: "p",
        text: "That last part matters more than it sounds. Deprioritised is not the same as dismissed. A finding that is unreachable today becomes reachable the moment somebody adds a firewall rule, and the record of why it was parked is what lets the next person re-evaluate it in seconds rather than reassessing from scratch.",
      },
      {
        type: "p",
        text: "A good report has fewer items in the main list and a longer appendix. If yours is the other way round, you have bought coverage rather than judgement.",
      },
    ],
  },

  {
    slug: "characterization-tests",
    title: "Characterization tests: how to change code nobody understands",
    excerpt:
      "You do not need to know why a behaviour exists to protect it while you work around it. This is the technique that makes legacy modernization survivable — and the one most teams skip.",
    category: "Software",
    publishedAt: "2026-06-16",
    readMinutes: 7,
    author: { name: "[PLACEHOLDER] Engineer Name", role: "Principal Engineer · Software" },
    cover: { label: "Post cover — characterization testing", width: 1200, height: 675 },
    body: [
      {
        type: "p",
        text: "The standard objection to modernizing a legacy system is reasonable: we cannot safely change this because we do not understand what it does. The standard response — read it until you do — does not scale past a few thousand lines, and it does not work at all when the behaviour depends on fourteen years of accumulated data.",
      },
      {
        type: "p",
        text: "Characterization tests sidestep the problem. Instead of encoding what the system should do, they record what it currently does. You do not need to understand a behaviour to protect it.",
      },
      { type: "h2", text: "The distinction that matters" },
      {
        type: "p",
        text: "A unit test asserts intent: given this input, the answer should be that, because the specification says so. A characterization test asserts observed reality: given this input, the system currently returns that, and I want to know immediately if that changes.",
      },
      {
        type: "p",
        text: "The difference is that a characterization test is never wrong at the moment you write it. It cannot be — you generated the expectation from the system itself. What it gives you is a tripwire.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Not "this is correct" — "this is what it does today".
@pytest.mark.parametrize("quote_id", HISTORICAL_QUOTE_IDS)
def test_pricing_unchanged(quote_id, snapshot):
    result = legacy.calculate_price(load_quote(quote_id))
    snapshot.assert_match(result, f"pricing/{quote_id}.json")`,
      },
      { type: "h2", text: "How to build the corpus" },
      {
        type: "p",
        text: "Production data is the only input worth using. Synthetic cases exercise the paths you thought of, which are by definition the paths you already understand.",
      },
      {
        type: "ul",
        items: [
          "Pull a representative sample of real historical inputs — a few hundred is usually plenty, spread across the full range of what the system has actually seen",
          "Run them through the current system and record every output as a snapshot",
          "Include the edge cases the operators complain about; those are where the undocumented behaviour lives",
          "Commit the snapshots. They are the specification you never had",
        ],
      },
      {
        type: "callout",
        title: "Scrub before you commit",
        text: "Production data means real customer records. Anonymise identifiers and monetary values before snapshots go into version control, and keep the mapping out of the repository. This step gets skipped under deadline pressure more often than any other.",
      },
      { type: "h2", text: "What you find" },
      {
        type: "p",
        text: "This is where the technique earns its keep. On a recent engagement the snapshots surfaced eleven cases where the legacy pricing logic did something indefensible — rounding in the wrong direction, applying a discount twice under a specific combination of conditions.",
      },
      {
        type: "p",
        text: "The instinct is to fix them. Resist it, at least at first. Downstream reports had been reconciling against those outputs for a decade. Correcting the rounding would have been correct and would have broken the month-end reconciliation in a way nobody would have connected to the pricing change.",
      },
      {
        type: "quote",
        text: "We asked the client which of the eleven were bugs. Nobody had ever asked them that question. Two were bugs. Nine were deliberate decisions whose rationale had been lost.",
      },
      {
        type: "p",
        text: "That conversation is the real output. Preserve the behaviour, document it, and let the business decide — separately, and with the consequences visible — whether to change it.",
      },
      { type: "h2", text: "Then you can move" },
      {
        type: "p",
        text: "With the net in place, extraction becomes mechanical. Move one piece of functionality behind an interface. Run the suite. If the snapshots still match, the change was behaviour-preserving. If they do not, you know precisely which inputs diverged before anything reaches production.",
      },
      {
        type: "p",
        text: "This is what makes incremental modernization possible where a rewrite is not. Each increment is independently verifiable and independently reversible. You can stop after three of eight and still be meaningfully better off — which matters, because budgets and priorities move, and a strategy that only pays off at completion usually does not get there.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

/** Same category first, then most recent. */
export function relatedPosts(current: Post, limit = 3) {
  return sortedPosts
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
