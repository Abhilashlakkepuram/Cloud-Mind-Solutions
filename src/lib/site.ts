export const company = {
  name: "CloudMind Solutions",
  legalName: "CloudMind Solutions Inc.",
  tagline: "Innovate. Integrate. Elevate.",
  address: {
    street: "7901 4th St N, Ste 300",
    city: "St. Petersburg",
    state: "FL",
    zip: "33702",
    country: "USA",
  },
  phone: "+1 (727) 555-0180", // [PLACEHOLDER] replace with real line
  email: "hello@cloudmindsolutions.com", // [PLACEHOLDER]
  whatsapp: {
    /**
     * [PLACEHOLDER] Digits only — country code first, no “+”, spaces or dashes.
     * wa.me rejects anything else. US number 727-555-0180 becomes 17275550180.
     */
    number: "17275550180",
    /** Pre-filled first message. Keep it short; it is editable by the sender. */
    message: "Hi CloudMind — I'd like to talk about a project.",
  },
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 6:00 PM ET" },
    { days: "Saturday – Sunday", time: "On-call for managed IT clients" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "X", href: "https://x.com/" },
  ],
} as const;

export const addressLine = `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`;

export type ServiceKey =
  | "ai-consulting"
  | "cloud-infrastructure"
  | "cybersecurity"
  | "software-consulting"
  | "managed-it";

export interface ServiceSummary {
  slug: ServiceKey;
  name: string;
  navLabel: string;
  /** One specific, non-generic sentence. Says what we actually do. */
  blurb: string;
  /** Short mono-set capability list used in nav + cards. */
  capabilities: string[];
}

export const services: ServiceSummary[] = [
  {
    slug: "ai-consulting",
    name: "AI Consulting",
    navLabel: "AI Consulting",
    blurb:
      "We put language models behind your existing systems — retrieval over your own documents, evaluation before rollout, and governance you can show an auditor.",
    capabilities: ["LLM & RAG systems", "Process automation", "Predictive analytics", "AI governance"],
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud & Infrastructure Consulting",
    navLabel: "Cloud & Infrastructure",
    blurb:
      "Migration plans that survive contact with production, and a cost model you can defend line by line across AWS, Azure, and GCP.",
    capabilities: ["Migration planning", "Cost optimization", "Hybrid & multi-cloud", "Infrastructure as code"],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity Consulting",
    navLabel: "Cybersecurity",
    blurb:
      "Risk assessments that name real attack paths, penetration tests with reproducible findings, and the compliance evidence to close the audit.",
    capabilities: ["Risk assessment", "Penetration testing", "Zero-trust architecture", "Incident response"],
  },
  {
    slug: "software-consulting",
    name: "Software Consulting",
    navLabel: "Software Consulting",
    blurb:
      "Custom builds, modernization of systems nobody wants to touch, and integrations between platforms that were never designed to talk.",
    capabilities: ["Custom development", "Legacy modernization", "API development", "Systems integration"],
  },
  {
    slug: "managed-it",
    name: "Managed IT Services",
    navLabel: "Managed IT",
    blurb:
      "Helpdesk with named engineers, endpoint and network operations, and 24/7 monitoring that pages a human before your users notice.",
    capabilities: ["Helpdesk & support", "Endpoint management", "Network operations", "24/7 monitoring"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.navLabel,
      href: `/services/${s.slug}`,
      description: s.capabilities.slice(0, 3).join(" · "),
    })),
  },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    heading: "Services",
    links: services.map((s) => ({ label: s.navLabel, href: `/services/${s.slug}` })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Industries We Serve", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export const siteUrl = "https://www.cloudmindsolutions.com"; // [PLACEHOLDER] set real domain
