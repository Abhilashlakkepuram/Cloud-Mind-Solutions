import type { ServiceKey } from "@/lib/site";

/**
 * Long-form content for each service detail page.
 *
 * Copy rules enforced here (see DESIGN-SYSTEM.md §9):
 *   - active voice, plain language
 *   - no "cutting-edge", "synergy", "revolutionize", "seamless", "leverage"
 *   - every headline says something specific and true about THIS practice —
 *     if it could sit on a competitor's page unchanged, it gets rewritten
 *   - fabricated figures are marked [PLACEHOLDER STAT] in the visible UI
 */

export interface IncludedItem {
  name: string;
  body: string;
}

export interface ProcessStep {
  when: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  sector: string;
  title: string;
  context: string;
  work: string[];
  results: { value: string; label: string }[];
  quote?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: ServiceKey;
  /** Short mono eyebrow used above the page H1. */
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  /** Three hard facts shown as a mono spec strip under the hero copy. */
  specs: { k: string; v: string }[];
  /** The honest framing of the problem, before any selling. */
  premise: { title: string; body: string[] };
  included: { title: string; lede: string; items: IncludedItem[] };
  process: { title: string; lede: string; steps: ProcessStep[] };
  caseStudy: CaseStudy;
  faqs: Faq[];
  /** Cross-sell: the practice clients most often add next. */
  pairsWith: { slug: ServiceKey; reason: string };
}

export const serviceDetails: Record<ServiceKey, ServiceDetail> = {
  /* ===================================================================== */
  "ai-consulting": {
    slug: "ai-consulting",
    eyebrow: "AI Consulting",
    heroTitle: "Language models are easy to demo and hard to put behind a business process.",
    heroLede:
      "The demo takes an afternoon. The work is everything after it: retrieval that respects who is asking, evaluation that runs before release, a record of what the model saw, and a cost line that does not surprise you in month four.",
    specs: [
      { k: "typical first engagement", v: "6–10 weeks" },
      { k: "starts with", v: "Use-case triage" },
      { k: "we deploy into", v: "Your cloud account" },
    ],
    premise: {
      title: "Most AI projects stall in the same three places.",
      body: [
        "The pilot answers well on the twelve questions someone thought to test, then meets a real user and quotes a document they were never allowed to open. Nobody wrote down what \"good\" meant, so there is no way to tell whether a change made it better or worse. And the running cost was estimated from the demo, which used a fraction of the traffic.",
        "None of these are model problems. They are systems problems, and they are the ones we take on. We are not interested in whether a model can write a summary — it can. We are interested in whether the summary is safe to show the person who requested it, and whether you can prove it a year from now.",
      ],
    },
    included: {
      title: "What the practice covers",
      lede: "Engagements usually combine three or four of these. We would rather do fewer of them properly than list all six on a slide.",
      items: [
        {
          name: "Retrieval systems (RAG)",
          body: "Your documents indexed with the access controls they arrived with. A query carries the caller's identity end to end, so an answer can never quote a record its reader could not open on their own. Retention rules apply to the embeddings, not just the source files.",
        },
        {
          name: "Evaluation harnesses",
          body: "A test set built from your real questions and your real wrong answers, scored automatically on every change. This is the piece almost everyone skips, and it is the reason most teams cannot say whether last week's prompt change helped.",
        },
        {
          name: "Process automation",
          body: "Classification, extraction, and routing for the work that currently moves through a shared mailbox. We instrument the manual path first — if we cannot measure how long it takes today, we cannot tell you whether we improved it.",
        },
        {
          name: "Predictive analytics",
          body: "Forecasting and risk scoring validated against your own failure history, not a benchmark. If the historical data will not support a useful model, we say so in week two rather than building one that looks convincing and is not.",
        },
        {
          name: "AI governance",
          body: "Model inventory, approved-use policy, an audit trail linking every output to its inputs and prompt version, and the documentation an examiner or insurer will ask for. Written to survive the person who set it up leaving.",
        },
        {
          name: "Model routing and cost control",
          body: "Per-feature spend limits, fallback between providers, and caching where the same question gets asked forty times a day. Provider choice stays a configuration decision rather than an architectural one.",
        },
      ],
    },
    process: {
      title: "How an AI engagement runs",
      lede: "The order matters. Evaluation is built before the thing being evaluated, because retrofitting it never happens.",
      steps: [
        {
          when: "Week 1–2",
          title: "Use-case triage",
          body: "We rank candidate use cases by what a wrong answer actually costs and how well the ground truth is documented. Most lists come back with two viable candidates and several that need a data fix first. You get the ranking either way.",
        },
        {
          when: "Week 3–4",
          title: "Evaluation before build",
          body: "We assemble a scored test set with your subject-matter experts — including the questions that should return \"I don't know\". This becomes the release gate for everything that follows.",
        },
        {
          when: "Week 5–8",
          title: "Pilot with a named group",
          body: "A real user group, real data, and a feedback path that lands in the eval set. Access controls are wired from the first day, not added before launch.",
        },
        {
          when: "Week 9 onward",
          title: "Release and monitor",
          body: "Rollout behind a flag, with drift, latency, and spend on the same dashboards as the rest of your infrastructure. Regressions page a person.",
        },
      ],
    },
    caseStudy: {
      sector: "Regional health network",
      title: "Cutting a referral backlog without touching the clinical record",
      context:
        "Inbound referrals arrived as faxed PDFs and unstructured email. Three coordinators triaged roughly 400 a week by hand, and the backlog grew every month the team was short-staffed.",
      work: [
        "Extraction over the referral documents, scoped to a service account with read-only access and no write path into the EHR",
        "A scored test set of 600 historical referrals, including the ambiguous ones the coordinators disagreed on",
        "Confidence thresholds tuned so anything uncertain routes to a human rather than guessing",
        "Full audit trail linking each triage decision to the source document and prompt version",
      ],
      results: [
        { value: "72%", label: "Referrals auto-triaged" },
        { value: "3.5 days", label: "Backlog, down from 11" },
        { value: "0", label: "PHI written to a third party" },
      ],
      quote:
        "The number that mattered wasn't the accuracy rate. It was that the coordinators trusted the queue enough to stop double-checking it.",
    },
    faqs: [
      {
        q: "Will our data be used to train someone else's model?",
        a: "No. We deploy into your cloud account under enterprise agreements with zero-retention terms, and we confirm those terms in writing before any data moves. If a provider cannot offer them for your use case, we tell you and pick a different one.",
      },
      {
        q: "Can we run this without sending data to a third-party provider at all?",
        a: "Yes, with a trade-off we will be direct about. Open-weight models running in your own environment are meaningfully behind the frontier providers on hard reasoning, and you take on the GPU cost and the operational burden. For extraction, classification, and routing, that gap often does not matter. For open-ended reasoning over messy documents, it usually does.",
      },
      {
        q: "How do you stop it inventing things?",
        a: "Three ways, in order of how much they help. Retrieval means answers are grounded in your documents rather than the model's memory. The evaluation set includes questions that should return \"I don't know\", and we score refusals as correct. And confidence thresholds route uncertain cases to a person. None of these gets you to zero — the design assumption is that a wrong answer will occur, so the question is what it costs when it does.",
      },
      {
        q: "What does this cost to run once it is live?",
        a: "It depends on traffic and how much context each request carries, and any number we gave you here would be fiction. What we commit to is that you will have a per-feature spend estimate before the build starts, spend limits enforced in code, and a monthly figure you can attribute to individual features rather than one line labelled \"AI\".",
      },
      {
        q: "What happens if the model provider changes their pricing or API?",
        a: "Provider choice sits behind a routing layer, so switching is a configuration change and a re-run of the evaluation set rather than a rebuild. We do not promise the switch is free — output quality shifts between models, which is exactly what the eval set is there to measure.",
      },
      {
        q: "Do we need a data warehouse before we start?",
        a: "Usually not for document-based use cases. For predictive work, yes — and if the historical data is not there, the honest answer is that the first project is a data project, not an AI one. We would rather say that in week two than bill you for a model that cannot work.",
      },
    ],
    pairsWith: {
      slug: "cybersecurity",
      reason:
        "AI systems widen the blast radius of an access-control mistake. We would expect to pair a first AI build with a permissions review.",
    },
  },

  /* ===================================================================== */
  "cloud-infrastructure": {
    slug: "cloud-infrastructure",
    eyebrow: "Cloud & Infrastructure",
    heroTitle: "Most migrations fail on the things nobody wrote down.",
    heroLede:
      "The application inventory is never the hard part. The hard part is the scheduled task on a server under someone's desk, the firewall rule with no ticket, and the licence that does not transfer. We find those first.",
    specs: [
      { k: "platforms", v: "AWS · Azure · GCP" },
      { k: "starts with", v: "Dependency mapping" },
      { k: "we hand over", v: "Terraform you own" },
    ],
    premise: {
      title: "A migration plan is only as good as its dependency map.",
      body: [
        "Every organisation we assess has at least one system that everything quietly depends on and nobody owns. It is usually a file share, a scheduled job, or a database link written in 2014. It does not appear on the architecture diagram because the person who built it left.",
        "We spend the first two weeks finding those, because they are what turns a six-week migration into a six-month one. The output is a dependency map that is accurate on the day we hand it over — including the parts that are inconvenient.",
      ],
    },
    included: {
      title: "What the practice covers",
      lede: "Migration is the headline, but much of this work is for teams already in the cloud and paying more than they should for it.",
      items: [
        {
          name: "Migration planning and execution",
          body: "Dependency mapping, wave sequencing, and cutover runbooks rehearsed against a restored copy before they touch production. Every wave has a rollback that has actually been tested, not just documented.",
        },
        {
          name: "Cost optimization",
          body: "A line-by-line review of what you are billed for versus what you use. Commitment coverage, storage tiering, idle non-production environments, and the three instances nobody has logged into since a project ended. Findings come with the annual figure attached.",
        },
        {
          name: "Hybrid and multi-cloud",
          body: "Connectivity, identity federation, and a clear answer to which workloads should stay where. We will tell you when multi-cloud is costing you more than it saves — which is often.",
        },
        {
          name: "Infrastructure as code",
          body: "Terraform or Bicep, in your repository, with a state backend you control and a plan step in CI. Click-ops becomes the exception rather than the record of truth.",
        },
        {
          name: "Resilience and disaster recovery",
          body: "Recovery objectives agreed with the business, then tested against them. A restore that has never been performed is a hypothesis, and we treat it as one until it runs.",
        },
        {
          name: "Landing zones and account structure",
          body: "Account separation, guardrails, tagging that survives contact with real teams, and network topology laid out before the first workload lands rather than reorganised around it afterwards.",
        },
      ],
    },
    process: {
      title: "How a cloud engagement runs",
      lede: "Nothing moves until the dependency map is signed off. That single rule prevents most migration overruns.",
      steps: [
        {
          when: "Week 1–2",
          title: "Discover and map",
          body: "Read-only access, network flow capture, and interviews with the people who get paged. We produce an inventory with owners and dependencies, including everything running that shouldn't be.",
        },
        {
          when: "Week 3",
          title: "Sequence by risk and cost",
          body: "Workloads are grouped into waves. Each wave carries an estimate, a rollback plan, and a note on what breaks if you defer it. You can approve wave one and hold the rest.",
        },
        {
          when: "Week 4 onward",
          title: "Land the platform, then migrate",
          body: "Landing zone, identity, and network first — as code. Then waves, each rehearsed against restored data before the production cutover, and each ending with something running.",
        },
        {
          when: "Ongoing",
          title: "Operate and tune",
          body: "Cost review on a monthly cadence, right-sizing against real utilization, and a quarterly restore test. This is where the savings actually land.",
        },
      ],
    },
    caseStudy: {
      sector: "Third-party logistics distributor",
      title: "A datacentre exit that finished on the lease date",
      context:
        "A colocation lease expiring in nine months, 140 virtual machines, and an architecture diagram three years out of date. Two prior attempts had stalled at the discovery stage.",
      work: [
        "Six weeks of flow capture and interviews, producing a dependency map that found 19 undocumented integrations",
        "Nine migration waves sequenced so the warehouse management system moved last, after everything it depended on",
        "Each cutover rehearsed twice against restored snapshots before the production window",
        "Landing zone, network, and IAM delivered as Terraform in the client's own repository",
      ],
      results: [
        { value: "9 mo", label: "Lease exit, on date" },
        { value: "19", label: "Undocumented integrations found" },
        { value: "34%", label: "Run-rate below colo cost" },
      ],
      quote:
        "The discovery phase felt slow until it surfaced the two integrations that would have taken down order intake on cutover weekend.",
    },
    faqs: [
      {
        q: "Which cloud should we be on?",
        a: "Usually the one your team already knows. The difference in capability between AWS, Azure, and GCP matters far less than the difference between engineers who have operated a platform at 3am and engineers who have not. Existing licensing agreements and identity estate are the next strongest factors — if you are heavily invested in Microsoft identity, Azure removes real friction.",
      },
      {
        q: "Will this actually reduce our costs?",
        a: "A lift-and-shift on its own usually does not, and anyone promising otherwise is not counting the same things you are. Savings come from right-sizing, commitment coverage, storage tiering, and shutting down what nobody uses — which is optimization work, and it can start before any migration. We often run it first because it funds the rest.",
      },
      {
        q: "Can you work alongside our existing team rather than replacing them?",
        a: "That is the normal arrangement. Your engineers know the systems; we bring migration patterns and the time to do discovery properly. We pair deliberately during cutover work so the knowledge stays with you afterwards.",
      },
      {
        q: "What happens to the infrastructure code if we stop working with you?",
        a: "It is in your repository, under your account, from the first commit. There is no CloudMind-hosted state backend, no proprietary wrapper, and no module registry you need a licence for. Leaving should be a decision, not an extraction.",
      },
      {
        q: "How much downtime should we plan for?",
        a: "It depends on the workload, and the honest answer is that some cutovers need a window and some do not. Databases with replication can often move with minutes of downtime. A monolith with a local filesystem dependency may need a weekend. We tell you which category each workload falls into during discovery, before you commit to a date.",
      },
    ],
    pairsWith: {
      slug: "managed-it",
      reason:
        "A new platform needs someone on the pager. Migration and day-two operations sequence naturally together.",
    },
  },

  /* ===================================================================== */
  cybersecurity: {
    slug: "cybersecurity",
    eyebrow: "Cybersecurity",
    heroTitle: "A finding you can't reproduce isn't a finding.",
    heroLede:
      "Plenty of assessments hand you a 90-page report generated by a scanner, sorted by CVSS score, with no view on which paths an attacker would actually take through your estate. We write the ones you can act on, in the order that reduces real risk.",
    specs: [
      { k: "reports include", v: "Reproduction steps" },
      { k: "starts with", v: "Attack-path review" },
      { k: "retest", v: "Included, no re-scope" },
    ],
    premise: {
      title: "Severity scores are not a priority order.",
      body: [
        "A critical vulnerability on an isolated internal host with no route to anything valuable is a lower priority than a medium on the box that holds domain admin credentials. Scanner output cannot make that distinction because it does not know your network, your data, or your business.",
        "We work the other way round: identify what an attacker would actually be after, map the paths that reach it, and then rank findings by whether they shorten one of those paths. The report is shorter and the remediation list is one you can finish.",
      ],
    },
    included: {
      title: "What the practice covers",
      lede: "Assessment and remediation are separable. Taking the assessment and fixing things with your own team is a perfectly good outcome, and we price it so that stays true.",
      items: [
        {
          name: "Risk assessment",
          body: "Named attack paths from a realistic starting position — a phished user, a compromised vendor account, an exposed service — through to the data or systems that would actually hurt. Ranked by path length and impact, not by score.",
        },
        {
          name: "Penetration testing",
          body: "Manual testing with reproduction steps a developer can follow, evidence attached, and a retest after remediation included in the original scope. External, internal, web application, and cloud configuration.",
        },
        {
          name: "Zero-trust architecture",
          body: "Identity-centred access design, segmentation, and conditional policy — sequenced so each phase is independently useful. Nobody finishes a zero-trust programme; the point is that stopping halfway still leaves you better off.",
        },
        {
          name: "Compliance readiness",
          body: "HIPAA, PCI DSS, SOC 2, and CMMC. Control mapping, gap analysis, evidence collection wired into systems that already produce it, and the artifacts an auditor will ask for. We reduce audit scope before we secure it — the cheapest control is the system that no longer holds regulated data.",
        },
        {
          name: "Incident response",
          body: "Retainer-backed response, containment, forensics, and the written timeline your insurer and counsel will need. Tabletop exercises beforehand, because the first time a team runs the plan should not be during an incident.",
        },
        {
          name: "Detection engineering",
          body: "Tuned detections mapped to techniques your estate is actually exposed to, with alerts routed to somebody who can act on them. An unread alert queue is worse than no alerting, because it looks like coverage.",
        },
      ],
    },
    process: {
      title: "How a security engagement runs",
      lede: "Rules of engagement are agreed in writing before anything is touched, including what we will not do without a phone call first.",
      steps: [
        {
          when: "Week 1",
          title: "Scope and rules of engagement",
          body: "What is in scope, what is explicitly out, testing windows, escalation contacts, and the conditions under which we stop and call you. Signed before any testing begins.",
        },
        {
          when: "Week 2–3",
          title: "Test and validate",
          body: "Manual testing supported by tooling, not the reverse. Every finding is reproduced and evidenced. Anything critical is reported the same day rather than held for the report.",
        },
        {
          when: "Week 4",
          title: "Report and walk through",
          body: "A ranked remediation list with reproduction steps, a technical session with your engineers, and a separate plain-language summary for the board. Both are written by the people who did the testing.",
        },
        {
          when: "After remediation",
          title: "Retest",
          body: "We verify the fixes and update the report. Included in the original scope — a retest should not require a new statement of work.",
        },
      ],
    },
    caseStudy: {
      sector: "Community bank",
      title: "Four findings that mattered out of a scanner's ninety-one",
      context:
        "An annual assessment from a previous vendor had produced 91 findings and no meaningful remediation, because the list was unrankable and the team had stopped reading it.",
      work: [
        "Attack-path mapping from three realistic starting positions, including a compromised branch workstation",
        "Manual testing of the paths that reached core banking or customer data",
        "Four findings identified as materially shortening a path to the crown jewels; the rest documented and deprioritised with reasoning",
        "Remediation walkthrough with the internal team, who did the fixes themselves",
      ],
      results: [
        { value: "4", label: "Findings on the critical path" },
        { value: "11 days", label: "To full remediation" },
        { value: "100%", label: "Verified closed at retest" },
      ],
      quote:
        "The previous report told us we had ninety-one problems. This one told us which four an attacker would actually use.",
    },
    faqs: [
      {
        q: "Will testing take our systems down?",
        a: "Testing carries risk and we do not pretend otherwise. We agree testing windows, exclude fragile systems by name, and stop immediately on any sign of instability. Denial-of-service testing is out of scope unless you specifically ask for it in writing. For genuinely fragile production systems we test a staging replica and say so clearly in the report.",
      },
      {
        q: "Do you just run a scanner?",
        a: "Scanners are used for coverage, not for findings. Anything that appears in the report has been reproduced by hand with evidence attached. If a finding is scanner output we could not validate, it goes in an appendix marked as unverified rather than in the main list.",
      },
      {
        q: "We need a report for a client or insurer by a specific date. Can you meet it?",
        a: "Usually, if the scope is agreed with enough lead time. Be direct with us about the deadline and what the report needs to demonstrate — a client security questionnaire and a PCI assessment are different pieces of work, and scoping for the wrong one wastes both our time.",
      },
      {
        q: "What if you find something serious mid-test?",
        a: "We stop and call you the same day, before it goes in any document. Critical findings are reported as they are discovered. You should never learn about active exposure from a PDF three weeks later.",
      },
      {
        q: "Can you fix what you find?",
        a: "We can, but it is a separate engagement and you are under no obligation to use us. There is an obvious conflict in the same firm finding and billing for problems, so we keep the assessment fee fixed and independent of what turns up. Taking the report and remediating in-house is a perfectly good outcome.",
      },
    ],
    pairsWith: {
      slug: "managed-it",
      reason:
        "Findings close faster when the team holding the endpoints and patch cycle is the same one that read the report.",
    },
  },

  /* ===================================================================== */
  "software-consulting": {
    slug: "software-consulting",
    eyebrow: "Software Consulting",
    heroTitle: "The system everyone is afraid to touch is usually the one making money.",
    heroLede:
      "Legacy is not an insult — it means the thing worked long enough to become load-bearing. We modernize it in increments that keep it earning, rather than proposing the rewrite that ends up shelved eighteen months in.",
    specs: [
      { k: "delivery", v: "2-week increments" },
      { k: "starts with", v: "Characterization tests" },
      { k: "code lives in", v: "Your repository" },
    ],
    premise: {
      title: "Full rewrites fail for a reason that has nothing to do with engineering.",
      body: [
        "A rewrite asks a business to fund two systems, freeze feature work, and wait — sometimes for years — for parity with something that already works. Priorities shift, sponsors change, budgets tighten, and the project is cancelled with a half-finished replacement and an original system that is now two years further behind.",
        "Incremental modernization is slower on paper and far more likely to finish. We put tests around current behaviour first, then move functionality out piece by piece behind an interface, so value lands continuously and you can stop at any boundary with something that runs.",
      ],
    },
    included: {
      title: "What the practice covers",
      lede: "Roughly two-thirds of this work is on systems that already exist. Greenfield builds are the smaller half of the practice.",
      items: [
        {
          name: "Legacy modernization",
          body: "Characterization tests around current behaviour, then extraction behind a stable interface. Each increment ships independently and can be reverted independently. No big-bang cutover.",
        },
        {
          name: "Custom development",
          body: "New systems where an off-the-shelf product genuinely does not fit. We will tell you when one does — recommending a purchase over a build costs us revenue and saves you a maintenance liability.",
        },
        {
          name: "Systems integration",
          body: "Making platforms talk that were never designed to. Idempotent handlers, explicit reconciliation, and a dead-letter path someone actually monitors. Integrations fail; the question is whether you find out from a dashboard or from a customer.",
        },
        {
          name: "API development",
          body: "Versioned, documented, and designed around what consumers need rather than the shape of your database tables. Contract tests so a breaking change fails in CI instead of in production.",
        },
        {
          name: "Data migration",
          body: "Reconciliation counts on both sides, a rehearsed rollback, and a defined answer for records that do not map cleanly — agreed with the business before the run, not improvised during it.",
        },
        {
          name: "Technical due diligence",
          body: "Pre-acquisition or pre-investment assessment of a codebase, its delivery practices, and its key-person risk. Written plainly enough for an investment committee, specific enough for the engineers who inherit it.",
        },
      ],
    },
    process: {
      title: "How a software engagement runs",
      lede: "Tests before changes. On a system nobody fully understands, the tests are how you find out what it currently does.",
      steps: [
        {
          when: "Week 1–2",
          title: "Read the system, not the documentation",
          body: "We work through the code, the database, and the production logs, and we talk to whoever supports it. The output is a written account of what it actually does, which routinely differs from what everyone believes.",
        },
        {
          when: "Week 3",
          title: "Characterization tests",
          body: "Tests that pin current behaviour — including the behaviour that looks like a bug but that something downstream depends on. This is the safety net that makes everything after it possible.",
        },
        {
          when: "Week 4 onward",
          title: "Extract in increments",
          body: "Functionality moves out piece by piece behind an interface, each increment behind a flag and independently reversible. You can stop at any boundary and still be ahead.",
        },
        {
          when: "Handover",
          title: "Leave it supportable",
          body: "Architecture decision records, a runbook, and pairing sessions with the team who will own it. We consider the engagement finished when your engineers can make the next change without us.",
        },
      ],
    },
    caseStudy: {
      sector: "Precision manufacturer",
      title: "Retiring a quoting system one endpoint at a time",
      context:
        "A 14-year-old quoting application in an unsupported framework, with the original developer long gone and no test suite. It produced every customer quote in the business, and two rewrite attempts had already been abandoned.",
      work: [
        "Characterization tests covering 240 historical quotes, including eleven cases where the legacy pricing logic was arguably wrong but downstream reports relied on it",
        "A routing layer in front of the application so traffic could move endpoint by endpoint",
        "Pricing, then catalogue, then document generation extracted across eight increments",
        "The legacy system kept running and serving un-migrated endpoints throughout",
      ],
      results: [
        { value: "8", label: "Increments, each shippable" },
        { value: "0", label: "Quoting outages during migration" },
        { value: "11", label: "Pricing quirks documented, not silently fixed" },
      ],
      quote:
        "They found eleven places where the old system did something odd, and asked us which ones were bugs. Nobody had ever asked.",
    },
    faqs: [
      {
        q: "Should we rewrite or modernize?",
        a: "Modernize, in almost every case where the current system is in production and earning. A rewrite is defensible when the platform is genuinely unsupportable, when the domain has changed so fundamentally that the model no longer fits, or when the system is small enough to replace in weeks. Those cases are rarer than they feel from inside the frustration of maintaining something old.",
      },
      {
        q: "What if the original developers are gone and nothing is documented?",
        a: "That is the common case, and it is what the first two weeks are for. The code and the production database are the documentation. Characterization tests then let us change things safely without a complete understanding up front — you do not need to know why a behaviour exists to protect it while you work around it.",
      },
      {
        q: "Do you work in our stack or bring your own?",
        a: "Yours. Introducing a language your team cannot maintain would leave you more dependent on us, which is the wrong outcome. If we think the stack is genuinely a problem, we will say so and let you decide — but we will not solve it by quietly adding a second one.",
      },
      {
        q: "Who owns the code?",
        a: "You do, in your repository, from the first commit. No escrow arrangement, no licensed components you would have to keep paying for, and no build that only runs on our machines.",
      },
      {
        q: "How do you estimate work on a system nobody understands?",
        a: "We do not give you a fixed price for the whole thing, because anyone who does is either padding heavily or about to have a difficult conversation with you. We fix the price of the first two weeks, and by the end of it we can estimate the increments with real confidence. Each increment is then separately scoped and separately stoppable.",
      },
    ],
    pairsWith: {
      slug: "cloud-infrastructure",
      reason:
        "Modernized applications usually want a different platform underneath. The two workstreams sequence well together.",
    },
  },

  /* ===================================================================== */
  "managed-it": {
    slug: "managed-it",
    eyebrow: "Managed IT",
    heroTitle: "24/7 monitoring only matters if somebody answers.",
    heroLede:
      "Every managed provider claims round-the-clock coverage. The differences that show up at 3am are whether a human picks up, whether they have seen your environment before, and whether they can act without waiting for an escalation tier to wake up.",
    specs: [
      { k: "escalation", v: "Named engineers" },
      { k: "coverage", v: "24/7/365" },
      { k: "runbooks", v: "In your repository" },
    ],
    premise: {
      title: "The commodity part is easy. The relationship is what breaks.",
      body: [
        "Patching, backups, endpoint management, and alerting are well-understood problems with mature tooling. Any competent provider can deliver them. That is not where managed IT relationships fail.",
        "They fail when the person who answers has never seen your environment, when the runbook lives in a portal you lose access to at the end of the contract, and when nobody can tell you what changed last Tuesday. We are structured to avoid those three specifically: a named team, runbooks in your repository, and a change log you can read without asking us for it.",
      ],
    },
    included: {
      title: "What the practice covers",
      lede: "Delivered as one service. We do not break these out into tiers where the useful parts sit behind the top one.",
      items: [
        {
          name: "Helpdesk and end-user support",
          body: "A named team who learn your environment, your applications, and the people using them. Escalation goes to an engineer who has worked on your systems before, not to whoever is next in a general queue.",
        },
        {
          name: "Endpoint management",
          body: "Provisioning, patching, disk encryption, and configuration baselines across Windows, macOS, and mobile. Joiners, movers, and leavers handled as a defined process, because offboarding is where access quietly accumulates.",
        },
        {
          name: "Network operations",
          body: "Firewalls, switching, wireless, and remote access — monitored, patched, and documented. Configuration changes are version-controlled and reviewed, not applied live and remembered.",
        },
        {
          name: "24/7 monitoring and response",
          body: "Alerting tuned to your environment so pages mean something. Runbooks for the known cases, a named engineer for everything else, and a written timeline after every Sev-1.",
        },
        {
          name: "Backup and recovery",
          body: "Backups verified by restore, on a schedule, with the results reported to you. An unverified backup is a belief, not a control, and the difference only becomes apparent on the worst possible day.",
        },
        {
          name: "Vendor and licence management",
          body: "We hold the vendor relationships and chase the tickets — including the ones where the answer is that you are paying for seats nobody uses. Renewal dates tracked so the negotiation starts before the auto-renew.",
        },
      ],
    },
    process: {
      title: "How onboarding runs",
      lede: "The first 30 days are documentation, not change. We do not touch anything we do not yet understand.",
      steps: [
        {
          when: "Week 1–2",
          title: "Inventory and access",
          body: "Systems, licences, contracts, and credentials catalogued into a password manager you own. We find what the previous arrangement left undocumented — there is always something.",
        },
        {
          when: "Week 3–4",
          title: "Baseline and instrument",
          body: "Monitoring, patch status, backup verification, and endpoint baselines. We report what we find as-is, including anything embarrassing, before we change it.",
        },
        {
          when: "Week 5–8",
          title: "Close the obvious gaps",
          body: "Unverified backups, unpatched internet-facing systems, and dormant accounts with live access. Ranked by risk, with the reasoning written down, and agreed with you before anything moves.",
        },
        {
          when: "Ongoing",
          title: "Operate and review",
          body: "Monthly reporting you can read, a quarterly review covering what broke and what it cost, and a roadmap that is honest about what we would defer.",
        },
      ],
    },
    caseStudy: {
      sector: "Litigation firm",
      title: "Finding out the backups had not run for seven months",
      context:
        "A 40-person firm transitioning from a provider who had been acquired twice. Backup reports showed green. Nobody had attempted a restore in over two years.",
      work: [
        "Full inventory during onboarding, including a restore test against the document management system",
        "Discovered the backup agent had silently failed after a server rebuild seven months earlier — the dashboard was reporting on a job that no longer had a target",
        "Rebuilt backup with verified restores on a monthly schedule and results reported to the managing partner",
        "Ethical-wall permissions reviewed against the matter list, which found 14 accounts with access beyond their matters",
      ],
      results: [
        { value: "7 mo", label: "Of backups that did not exist" },
        { value: "14", label: "Over-permissioned accounts closed" },
        { value: "Monthly", label: "Verified restore, reported" },
      ],
      quote:
        "The dashboard was green for seven months. Nobody had asked it to prove anything.",
    },
    faqs: [
      {
        q: "Do you replace our internal IT team?",
        a: "More often we work alongside one. A common arrangement is that we take the after-hours coverage, patching, and monitoring so the internal team can work on projects rather than the queue. Where there is no internal team, we are the whole function — but we would rather be additive than a replacement.",
      },
      {
        q: "What actually happens when something breaks at 3am?",
        a: "The alert pages an on-call engineer with access to your runbooks and prior context on your environment. Known cases have documented procedures. Anything else escalates to a named engineer from your account team. You get a written timeline the following morning, whether or not you noticed the incident.",
      },
      {
        q: "What is the contract term, and what happens if we leave?",
        a: "Twelve months initially, then monthly. On exit you keep the documentation, the runbooks, and the password vault, and we support the transition to whoever takes over. Runbooks live in your repository throughout, so there is nothing to hand back — you already have it.",
      },
      {
        q: "How is this priced?",
        a: "Per user per month, with infrastructure counted separately. No per-ticket charges, because charging per ticket gives us a reason to prefer that you keep having problems. Onboarding is quoted separately and once.",
      },
      {
        q: "Will you support software you did not implement?",
        a: "Yes, with one honest caveat. During onboarding we will flag anything genuinely unsupportable — an operating system past end of life, or a business-critical application from a vendor that no longer exists. We will keep it running and tell you plainly what the risk is, rather than refusing to touch it or pretending it is fine.",
      },
      {
        q: "Do you have a minimum size?",
        a: "Around 25 users. Below that, the onboarding work that makes the relationship worthwhile is hard to justify against the monthly fee, and you are usually better served by a smaller local provider. We will say so rather than take the contract.",
      },
    ],
    pairsWith: {
      slug: "cybersecurity",
      reason:
        "Managed IT maintains the endpoint and patch posture that most security findings depend on — the two practices share the same evidence.",
    },
  },
};
