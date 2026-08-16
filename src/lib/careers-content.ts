/**
 * Careers content.
 *
 * Startup positioning: no perks arms race, no "rocket ship" language, and no
 * claim of a track record the company does not have. The pitch is the honest
 * one — early, small, senior, and explicit about what that costs a candidate.
 */

export interface Opening {
  id: string;
  title: string;
  practice: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** What would make this role a bad fit — stated up front, deliberately. */
  notForYouIf: string[];
}

/**
 * Ships empty on purpose. The list component renders a real empty state rather
 * than a placeholder role. Add entries here and the page becomes a listing with
 * no other changes.
 */
export const openings: Opening[] = [];

export const careerSpecs = [
  { k: "team size", v: "[PLACEHOLDER] 6" },
  { k: "open roles", v: openings.length > 0 ? String(openings.length) : "None right now" },
  { k: "base", v: "St. Petersburg, FL" },
];

export const whyHere = {
  title: "The pitch is narrow, and it will not suit everyone.",
  lede:
    "We are a new company with a small team and no bench. That is genuinely good for some engineers and genuinely bad for others, so here is the version without the recruiting gloss.",
  gains: {
    heading: "Why you might want this",
    items: [
      "You own engagements end to end — assessment, build, and the 3am page. Nobody hands your work to a delivery tier.",
      "You talk to the client directly. No account manager translating what they meant.",
      "Breadth by necessity. In a small team you will touch cloud, security, and application work in the same quarter.",
      "Your written work is the product. Assessments and decision records here get read by CTOs, not filed.",
      "Founding-team influence on how the firm operates, while those decisions are still cheap to change.",
    ],
  },
  costs: {
    heading: "Why you might not",
    items: [
      "Client-facing work means deadlines you do not control and the occasional difficult conversation about scope.",
      "On-call is real. It is shared and it is small, which means it comes round more often than at a large MSP.",
      "No specialist track yet. If you want to go three years deep on one platform, a bigger firm will serve you better.",
      "[PLACEHOLDER] Compensation is competitive for the region but we are not paying FAANG bands. Confirm the actual range before publishing.",
      "Early-stage uncertainty. We think this works. We cannot prove it to you with five years of accounts.",
    ],
  },
};

export interface LookFor {
  title: string;
  body: string;
}

/** What we screen for when there is no open role — the standing bar. */
export const lookFor: LookFor[] = [
  {
    title: "You write clearly",
    body: "Most of this job is explaining a technical situation to someone who has to make a financial decision about it. If you can write a paragraph that a CFO and a sysadmin both understand, that is the single most valuable skill here.",
  },
  {
    title: "You have operated something in production",
    body: "Not necessarily at scale — at responsibility. You have been the person who got paged, made the call under time pressure, and wrote the timeline afterwards. That experience is not substitutable.",
  },
  {
    title: "You say the unwelcome thing",
    body: "The estimate is wrong, the approach will not work, the client is about to spend money on the wrong problem. We need people who raise it early, in the room, rather than being right quietly afterwards.",
  },
  {
    title: "You finish things",
    body: "Consulting is full of interesting problems that could absorb a career. The discipline is closing one properly — documented, handed over, supportable — before opening the next.",
  },
  {
    title: "You are honest about what you don't know",
    body: "We work in regulated environments where a confident guess is dangerous. Saying 'I have not done this, here is how I would find out' is a strength on this team, not an admission.",
  },
];

/** `icon` values are keys of `industryIcons`-style named exports in components/icons. */
export const hiringProcess = [
  {
    when: "Step 1",
    icon: "conversation" as const,
    title: "A real conversation, 45 minutes",
    body: "With a founder, not a recruiter. We talk about what you have actually built and where it went wrong. Come with something you are willing to be critical about.",
  },
  {
    when: "Step 2",
    icon: "write" as const,
    title: "A written exercise, paid",
    body: "A short, realistic scenario — usually assessing a situation and writing the recommendation. Roughly three hours, and we pay for your time at a fair hourly rate. We do not ask for free work.",
  },
  {
    when: "Step 3",
    icon: "terminal" as const,
    title: "Technical session, 90 minutes",
    body: "We work through your exercise together and go deep on a system you have operated. No whiteboard algorithms, no take-home puzzle, no trivia about syntax you would look up.",
  },
  {
    when: "Step 4",
    icon: "offer" as const,
    title: "Offer, with the reasoning",
    body: "If we say no, you get specific feedback on why. If we say yes, you get the band, how it was set, and what would move it. Two references, and we call them ourselves.",
  },
];

export const benefits = [
  {
    icon: "health" as const,
    title: "Health, dental, and vision",
    body: "[PLACEHOLDER] Confirm carrier and employer contribution percentage.",
  },
  {
    icon: "pay" as const,
    title: "Paid written exercises",
    body: "Every candidate is paid for the take-home stage. Nobody works for free during a hiring process.",
  },
  {
    icon: "time" as const,
    title: "Genuine flexible hours",
    body: "Client commitments are fixed; the rest of your day is not. On-call weeks are scheduled well ahead.",
  },
  {
    icon: "learn" as const,
    title: "Certification and training budget",
    body: "[PLACEHOLDER] Confirm annual amount. Cloud, security, and vendor certifications covered, including exam retakes.",
  },
  {
    icon: "speak" as const,
    title: "Conference time",
    body: "[PLACEHOLDER] Confirm days per year. Speaking at one counts as work, not leave.",
  },
  {
    icon: "kit" as const,
    title: "Equipment you choose",
    body: "Your machine, your keyboard, your monitor arrangement. We are not going to have an opinion about it.",
  },
];
