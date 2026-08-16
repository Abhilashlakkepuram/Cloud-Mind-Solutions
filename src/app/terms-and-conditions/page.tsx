import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { company, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing use of the ${company.legalName} website.`,
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions — CloudMind Solutions",
    url: `${siteUrl}/terms-and-conditions`,
  },
};

const sections: LegalSection[] = [
  {
    id: "these-terms",
    heading: "What these terms govern",
    body: (
      <>
        <p>
          These terms cover your use of {siteUrl}. By using the site you accept them. If you do not,
          please stop using it.
        </p>
        <p>
          These are website terms only. They do not govern any services we perform for you — that is
          a separate signed agreement, and where the two conflict, the services agreement wins.
        </p>
      </>
    ),
  },
  {
    id: "no-offer",
    heading: "Nothing here is an offer or a quote",
    body: (
      <>
        <p>
          Descriptions of our services, timelines, and engagement structures are illustrative. They
          describe how we typically work; they are not a binding proposal and they do not constitute
          a fixed price.
        </p>
        <p>
          Any figures, case examples, or outcomes shown on this site and marked{" "}
          <span className="font-mono text-[0.9375rem]">[PLACEHOLDER]</span> are illustrative and
          should not be relied on. Work only becomes binding when both parties sign a statement of
          work.
        </p>
      </>
    ),
  },
  {
    id: "not-advice",
    heading: "The content is not professional advice",
    body: (
      <>
        <p>
          Articles published under{" "}
          <Link href="/blog" className="text-blue-deep hover:underline">
            Insights
          </Link>{" "}
          are general technical writing. They are not security, legal, financial, or regulatory
          advice for your situation, and applying them without judgement about your own environment
          is your risk to take.
        </p>
        <p>
          Compliance references — HIPAA, PCI DSS, SOX, and others — are summarised for orientation.
          They are not a statement of your obligations. Confirm those with qualified counsel or a
          qualified assessor.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <>
        <p>Please do not:</p>
        <p>
          Submit false information through our forms; use the forms to send unsolicited commercial
          messages; attempt to gain unauthorised access to the site or its infrastructure; scrape it
          at a volume that degrades it for others; or use it to break the law.
        </p>
        <p>
          If you believe you have found a security vulnerability in this site, we would genuinely
          like to hear about it. Email{" "}
          <a href={`mailto:${company.email}`} className="text-blue-deep hover:underline">
            {company.email}
          </a>{" "}
          with enough detail to reproduce it, give us reasonable time to fix it before disclosing,
          and we will not pursue you for good-faith research.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <>
        <p>
          The content, design, and code of this site belong to {company.legalName} unless stated
          otherwise. You may read it, print it, and quote from it with attribution and a link.
        </p>
        <p>
          You may not republish substantial portions as your own, or use our name or marks in a way
          that suggests endorsement or partnership without written permission.
        </p>
        <p>
          Third-party names and marks referenced on this site — cloud platforms, software vendors,
          standards bodies — belong to their respective owners. Referring to them does not imply any
          affiliation, partnership, or certification unless we say so explicitly.
        </p>
      </>
    ),
  },
  {
    id: "submissions",
    heading: "What you send us",
    body: (
      <>
        <p>
          Do not send confidential information through the website forms. They are appropriate for
          an initial enquiry. Anything sensitive should wait until we have a mutual NDA and a secure
          channel — ask, and we will set one up.
        </p>
        <p>
          If you send us an unsolicited idea, suggestion, or proposal, we cannot treat it as
          confidential and we are not able to compensate you for it. This is a standard protection
          and not a claim on your work.
        </p>
        <p>
          How we handle personal information you submit is set out in our{" "}
          <Link href="/privacy-policy" className="text-blue-deep hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    heading: "Links to other sites",
    body: (
      <p>
        We link to third-party sites where they are useful. We do not control them and are not
        responsible for their content, availability, or privacy practices. Following an external
        link is your decision.
      </p>
    ),
  },
  {
    id: "availability",
    heading: "Availability",
    body: (
      <p>
        We do not promise the site will be available uninterrupted or error-free. We may change,
        suspend, or withdraw any part of it without notice. Nothing in this section limits any
        service-level commitment in a signed services agreement.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          [PLACEHOLDER — this section in particular needs counsel.] Have a lawyer draft language
          appropriate to Florida law and to the company&rsquo;s insurance position. Generic
          limitation clauses copied from other sites are frequently unenforceable and occasionally
          counterproductive.
        </p>
        <p>
          Nothing in these terms excludes liability that cannot lawfully be excluded, including for
          fraud or for death or personal injury caused by negligence.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the State of Florida, United States. {company.address.city}{" "}
        sits in Pinellas County, so venue is stated here as the state and federal courts serving
        Pinellas County, Florida. [PLACEHOLDER] Confirm venue and any arbitration preference with
        counsel — this is a clause worth getting right rather than inheriting.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms. The effective date at the top shows when they last changed, and
        continuing to use the site after a change means you accept the updated version.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="2026-08-17"
      intro={
        <p>
          Plain terms for using this website. They are short on purpose — the parts that actually
          matter to a client relationship live in the signed services agreement, not here.
        </p>
      }
      sections={sections}
    />
  );
}
