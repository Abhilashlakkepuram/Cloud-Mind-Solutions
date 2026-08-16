/**
 * About-page content.
 *
 * Positioning: CloudMind is a NEW COMPANY. Nothing here claims a company track
 * record that does not exist — no founding year in the past, no client counts,
 * no "trusted since". Credibility is carried by what the founders did before,
 * clearly attributed as prior work, and by commitments that can be verified on
 * day one rather than outcomes that need years to prove.
 *
 * Anything a reader could mistake for a company achievement is marked
 * [PLACEHOLDER] in the visible UI until it is real.
 */

export const founded = {
  year: "2026",
  city: "St. Petersburg, Florida",
};

/** The three facts a prospect actually wants when hiring a new firm. */
export const aboutSpecs = [
  { k: "founded", v: `${founded.year} · St. Petersburg` },
  { k: "team", v: "[PLACEHOLDER] 6 engineers" },
  { k: "clients so far", v: "[PLACEHOLDER] Accepting first cohort" },
];

export const story = {
  title: "We started CloudMind because the good version of this work already exists — it is just priced for the Fortune 500.",
  body: [
    "Between us we spent years inside consultancies and platform teams, and the pattern was consistent. Large enterprises get senior engineers who stay through delivery. Everyone else gets a well-written proposal, a partner at the kickoff, and then a delivery team that has never read the assessment.",
    "The work itself is not the hard part. Cloud migrations, retrieval systems, security assessments, and day-two operations are well-understood problems. What mid-market companies cannot buy is continuity — the same people from the first interview through to the 3am page.",
    "So we built the firm around that constraint rather than around headcount growth. Small team, senior only, no delivery tier below the people who wrote the plan. It caps how fast we can grow. That is the trade we chose on purpose.",
  ],
};

/**
 * The honest section. A new firm that pretends to be an old one gets found out
 * in the first reference check; saying it plainly is both truer and more
 * persuasive than a fabricated history.
 */
export const beingNew = {
  title: "We are a new company. Here is exactly what that means for you.",
  lede: "You are going to find this out anyway, so we would rather set the terms of the conversation.",
  gains: {
    heading: "What you get because we are new",
    items: [
      "Founders on your engagement, not a partner at kickoff and juniors afterwards. At our size there is nobody else to send.",
      "No legacy tooling or partner quotas steering the recommendation toward a vendor we have already committed spend to.",
      "Pricing set to win early references rather than to hit a utilisation target. That advantage is temporary and we will not pretend otherwise.",
      "Direct access. Your escalation path is a mobile number, not a portal.",
    ],
  },
  costs: {
    heading: "What we cannot offer yet",
    items: [
      "A decade of client references. We can offer prior work the founders did elsewhere, described honestly and with the employer named.",
      "A bench. If your project needs twenty engineers next month, we are the wrong firm and we will tell you in the first call.",
      "SOC 2 attestation. [PLACEHOLDER] Target date to be confirmed — ask us where it stands rather than assuming.",
      "24/7 coverage at the scale of a national MSP. Our on-call is real but small, and we cap how many managed clients we take on because of it.",
    ],
  },
};

export interface Principle {
  title: string;
  body: string;
}

/** Operating commitments — each one is checkable on day one, not aspirational. */
export const principles: Principle[] = [
  {
    title: "The assessment is yours whether or not you hire us",
    body: "Every engagement opens with a fixed-fee assessment, and the document it produces is yours to keep, share, or take to another firm. We would rather lose a build to a better-priced competitor than hold a client through information asymmetry.",
  },
  {
    title: "Artifacts live in your repository from the first commit",
    body: "Infrastructure code, runbooks, decision records, and test suites go into your version control, under your accounts. There is no CloudMind-hosted state backend and no proprietary wrapper. Leaving should be a decision, not an extraction.",
  },
  {
    title: "We say no to work we should not take",
    body: "Wrong size, wrong problem, or a project where an off-the-shelf product would serve you better. Turning down revenue is cheap for us and expensive for you to discover six weeks in.",
  },
  {
    title: "Estimates come with what happens if you defer",
    body: "Every recommendation carries a cost, a dependency, and the consequence of not doing it. That last part is what makes a roadmap a decision aid instead of a wish list.",
  },
  {
    title: "Bad news travels immediately",
    body: "A slipping estimate, a discovery that changes the plan, or a mistake we made. You hear it the day we know, not at the next status meeting. This is the commitment most likely to cost us a renewal and the one we are least willing to soften.",
  },
  {
    title: "We stay small on purpose",
    body: "Growth past the point where founders can be on every engagement would break the only thing that distinguishes us. When we cannot take work, we will say so and, where we can, point you somewhere else.",
  },
];

export interface TeamMember {
  /** [PLACEHOLDER] — real names and photos to be supplied. */
  name: string;
  role: string;
  focus: string;
  /** Prior work, attributed to the employer — not presented as CloudMind's. */
  background: string;
  photo: { label: string; width: number; height: number };
}

export const team: TeamMember[] = [
  {
    name: "[PLACEHOLDER] Founder Name",
    role: "Founder · Cloud & Platform",
    focus: "Migration planning, landing zones, cost optimization",
    background:
      "[PLACEHOLDER] Prior work: datacentre exits and multi-account platform builds at a named previous employer — to be filled in with real detail and the employer's name.",
    photo: { label: "Leadership headshot — Founder, Cloud & Platform", width: 640, height: 800 },
  },
  {
    name: "[PLACEHOLDER] Founder Name",
    role: "Founder · Applied AI",
    focus: "Retrieval systems, evaluation harnesses, AI governance",
    background:
      "[PLACEHOLDER] Prior work: production retrieval and evaluation systems in a regulated environment — to be filled in with real detail and the employer's name.",
    photo: { label: "Leadership headshot — Founder, Applied AI", width: 640, height: 800 },
  },
  {
    name: "[PLACEHOLDER] Founder Name",
    role: "Founder · Security",
    focus: "Attack-path assessment, penetration testing, compliance readiness",
    background:
      "[PLACEHOLDER] Prior work: offensive security and audit readiness for financial services — to be filled in with real detail, certifications, and the employer's name.",
    photo: { label: "Leadership headshot — Founder, Security", width: 640, height: 800 },
  },
  {
    name: "[PLACEHOLDER] Engineer Name",
    role: "Principal Engineer · Software",
    focus: "Legacy modernization, integrations, API design",
    background:
      "[PLACEHOLDER] Prior work: incremental modernization of long-lived production systems — to be filled in with real detail and the employer's name.",
    photo: { label: "Team headshot — Principal Engineer, Software", width: 640, height: 800 },
  },
];

/** Where the founders' prior work happened — framed as background, never as CloudMind's client list. */
export const priorWork = {
  title: "Work the founders did before CloudMind existed",
  lede:
    "We will not dress prior employment up as a CloudMind client roster. These are the kinds of systems the team has shipped elsewhere, and the reference calls go to those employers.",
  note:
    "[PLACEHOLDER] Replace each entry with a real, cleared description including the employer name and a contactable reference.",
  items: [
    "[PLACEHOLDER] Datacentre exit for a distribution business — 140 VMs, nine migration waves, completed on the lease date",
    "[PLACEHOLDER] Retrieval and triage system over clinical referral documents, deployed inside the customer's own cloud account",
    "[PLACEHOLDER] Attack-path assessment for a community bank that reduced an unrankable 91-finding report to four fixes",
    "[PLACEHOLDER] Incremental replacement of a 14-year-old quoting application with no outage to quote generation",
  ],
};
