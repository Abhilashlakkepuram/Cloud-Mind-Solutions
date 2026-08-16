export interface Industry {
  slug: string;
  name: string;
  /** The regulatory or technical constraint that actually shapes the work. */
  constraint: string;
  constraintLabel: string;
  /** Named regimes — shown as mono chips. */
  regulations: string[];
  summary: string;
  /** The question we ask before anything technical. */
  firstQuestion: string;
  /** Systems we expect to find. Specific enough to prove we have seen the sector. */
  systems: string[];
  /** Specific things we do differently because of that constraint. */
  points: string[];
}

/**
 * Five sectors, deliberately. A new firm claiming depth in twelve industries is
 * claiming depth in none — see the note rendered above this list on /industries.
 */
export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    constraintLabel: "HIPAA · HITECH",
    constraint: "PHI cannot leave systems you can audit.",
    regulations: ["HIPAA", "HITECH", "42 CFR Part 2", "HL7 / FHIR"],
    summary:
      "Clinical and billing systems integrated over fifteen years, where the interface engine is often the only thing holding the record together and nobody currently employed configured it.",
    firstQuestion:
      "Which systems touch PHI, and which of those are covered by a current business associate agreement?",
    systems: ["EHR (Epic, Cerner, athena)", "Interface engines (Mirth, Rhapsody)", "Practice management", "Imaging / PACS"],
    points: [
      "BAAs executed before any vendor touches PHI, including model providers — and confirmed in writing, not assumed from a marketing page",
      "Retrieval scoped to the requesting clinician's existing chart permissions, carried per-query rather than granted to a service account",
      "Interface engine inventory completed before any migration is scheduled, because the HL7 feeds are what break",
      "Audit logs written somewhere that survives the vendor relationship ending",
    ],
  },
  {
    slug: "finance",
    name: "Finance & Fintech",
    constraintLabel: "SOX · PCI DSS · GLBA",
    constraint: "Every change needs an auditable approval trail.",
    regulations: ["SOX", "PCI DSS", "GLBA", "FFIEC", "SOC 2"],
    summary:
      "Core banking and payment paths where the binding constraint is not uptime — it is proving, months later, who approved what and when, to somebody who was not there.",
    firstQuestion:
      "When an examiner asks who approved the last production change, where does that evidence come from?",
    systems: ["Core banking platforms", "Payment gateways", "Loan origination", "Data warehouse / reporting"],
    points: [
      "Change management wired into CI so the audit evidence is a build artifact rather than a screenshot someone remembers to take",
      "Cardholder data environment scoped down with tokenization before money is spent hardening it",
      "Model outputs logged alongside their inputs and prompt version, so adverse-action decisions stay explainable",
      "Segregation of duties enforced in IAM, not asserted in a policy document nobody reads",
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    constraintLabel: "Privilege · Ethical walls",
    constraint: "A retrieval must never cross a matter boundary.",
    regulations: ["Attorney-client privilege", "ABA Model Rule 1.6", "Client outside counsel guidelines"],
    summary:
      "Document sets where a single passage leaking between matters is a malpractice exposure and a client notification, not a bug report.",
    firstQuestion:
      "Are your ethical walls enforced by the document system, or by everyone remembering where they apply?",
    systems: ["Document management (iManage, NetDocuments)", "Practice management", "eDiscovery platforms", "Time and billing"],
    points: [
      "Ethical walls enforced at the index level, so a wall cannot be bypassed by phrasing a prompt differently",
      "Matter-scoped retrieval with the requesting user's identity carried end to end",
      "Privilege review workflows that keep a human on the final call, with the model narrowing rather than deciding",
      "Retention schedules applied to embeddings and derived indexes, not only to the source documents",
    ],
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    constraintLabel: "PCI DSS · Peak load",
    constraint: "The year is decided by six weeks of traffic.",
    regulations: ["PCI DSS", "CCPA / state privacy", "ADA / WCAG storefront"],
    summary:
      "Storefronts and fulfilment paths that must absorb a 20× spike without a re-architecture scheduled two weeks before it arrives.",
    firstQuestion:
      "What broke last peak, and has anything changed since other than hoping it won't recur?",
    systems: ["Commerce platform", "OMS / WMS", "Payment and fraud", "Marketplace integrations"],
    points: [
      "Load modelling against last season's real traffic curve, including the spike shape rather than the daily average",
      "Checkout path isolated so a catalogue or search incident cannot take payments down with it",
      "Payment scope reduced through tokenization before hardening spend is committed",
      "Freeze windows and rollback rehearsed ahead of peak, not improvised during it",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    constraintLabel: "OT/IT boundary · Uptime",
    constraint: "The plant network was never meant to meet the internet.",
    regulations: ["IEC 62443", "NIST 800-82", "CMMC (defense supply chain)"],
    summary:
      "Shop-floor systems where an hour of downtime carries a known dollar figure and the controls predate the security model now being wrapped around them.",
    firstQuestion:
      "What is an hour of unplanned line downtime worth, and who currently decides when the plant network changes?",
    systems: ["SCADA / HMI", "PLCs and historians", "ERP (shop floor integration)", "MES"],
    points: [
      "OT/IT segmentation designed with the controls engineer in the room, not inferred from a network diagram",
      "Read-only telemetry paths off the plant floor established and proven before any write path is discussed",
      "Predictive maintenance validated against your own recorded failure history, or declined if that history does not exist",
      "Patch windows planned around the production schedule, never the other way round",
    ],
  },
];
