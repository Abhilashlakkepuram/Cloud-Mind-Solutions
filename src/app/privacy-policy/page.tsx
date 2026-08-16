import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { company, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.legalName} collects, uses, and retains personal information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: { title: "Privacy Policy — CloudMind Solutions", url: `${siteUrl}/privacy-policy` },
};

/**
 * Written to describe what this site ACTUALLY does today, verified against the
 * code rather than copied from a template:
 *   - two forms post to /api/contact and /api/careers
 *   - no analytics package is installed
 *   - no cookies are set by the application
 *   - fonts are self-hosted via next/font — no request to Google at runtime
 *   - the map renders locally; no third-party iframe unless `embedSrc` is set
 * If any of those change, this page must change with them.
 */
const sections: LegalSection[] = [
  {
    id: "scope",
    heading: "What this policy covers",
    body: (
      <>
        <p>
          This policy applies to {siteUrl} and to personal information you submit through it. It
          does not cover information we process on behalf of a client under a services agreement —
          that processing is governed by the agreement and any data processing addendum attached to
          it.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <p>We collect only what you type into a form. There are two:</p>
        <p>
          <strong className="font-medium">Contact form.</strong> Your name, work email, company,
          optional phone number, the subject area you selected, and your message.
        </p>
        <p>
          <strong className="font-medium">Careers form.</strong> Your name, email, the role you are
          applying for, any links you provide, and your written response.
        </p>
        <p>
          Both forms include a hidden field used to detect automated submissions. It is not visible
          to you and is never populated by a person.
        </p>
        <p>
          Our hosting provider processes standard server request data — IP address, user agent, and
          requested URL — as an ordinary part of serving the site and protecting it from abuse.
        </p>
      </>
    ),
  },
  {
    id: "no-tracking",
    heading: "What we do not collect",
    body: (
      <>
        <p>
          As of the effective date above, this website runs <strong className="font-medium">no
          analytics package, no advertising pixels, and no third-party tracking scripts</strong>.
        </p>
        <p>
          The application sets no cookies. Fonts are served from our own domain rather than a font
          CDN, so loading a page makes no request to a third party on your behalf. The office map is
          drawn locally and does not embed a third-party map service.
        </p>
        <p>
          [PLACEHOLDER] If analytics, a scheduling embed, or a chat widget is added later, this
          section and the cookies section must be updated before that change ships, and a consent
          mechanism may become necessary.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How we use it",
    body: (
      <>
        <p>
          To reply to you, to assess an application, and to keep a record of the enquiry. That is
          the whole list.
        </p>
        <p>
          We do not add form submissions to a marketing list, and we do not run automated follow-up
          sequences. If you contact us and we do not hear back, we assume the answer is no.
        </p>
        <p>
          We do not sell personal information, and we do not share it for cross-context behavioural
          advertising.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    heading: "Why we are allowed to process it",
    body: (
      <>
        <p>
          Where UK or EU data protection law applies, we rely on legitimate interests — responding
          to an enquiry you initiated, and assessing a job application you submitted. Where you have
          asked us to contact you, that request is itself the basis for the reply.
        </p>
        <p>
          You can object to this processing at any time by emailing{" "}
          <a href={`mailto:${company.email}`} className="text-blue-deep hover:underline">
            {company.email}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who else sees it",
    body: (
      <>
        <p>
          Service providers who host the site and deliver our email, acting on our instructions and
          under contract. [PLACEHOLDER] List the actual sub-processors here once hosting and email
          delivery are provisioned — a reader is entitled to know which companies hold their data.
        </p>
        <p>
          We will disclose information if legally compelled to, and we will tell you unless
          prohibited from doing so.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: (
      <>
        <p>
          [PLACEHOLDER] Confirm these periods with counsel before launch and make sure the systems
          actually enforce them — a retention policy nothing implements is worse than none.
        </p>
        <p>
          <strong className="font-medium">Enquiries:</strong> retained while we are in conversation
          and for a proposed 24 months afterwards, so we have context if you come back.
        </p>
        <p>
          <strong className="font-medium">Applications:</strong> retained for a proposed 12 months
          from your last contact, unless you ask us to delete them sooner.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to
          delete it. Email{" "}
          <a href={`mailto:${company.email}`} className="text-blue-deep hover:underline">
            {company.email}
          </a>{" "}
          and we will respond within 30 days.
        </p>
        <p>
          Depending on where you live you may have additional rights — including under the
          California Consumer Privacy Act, and under UK/EU GDPR — such as the right to complain to a
          supervisory authority. [PLACEHOLDER] Have counsel confirm which regimes apply to{" "}
          {company.legalName} and add the required disclosures.
        </p>
        <p>We will not treat you differently for exercising any of these rights.</p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <>
        <p>
          The site is served over HTTPS, and form submissions are validated on the server before
          anything is accepted. Access to submissions is limited to the people who need it to reply.
        </p>
        <p>
          We will not claim more than that. [PLACEHOLDER] Once an email or CRM destination is
          provisioned, describe its access controls and encryption here, and state honestly where
          the company stands on any formal certification rather than implying one.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        This site is intended for business use and is not directed at children under 16. We do not
        knowingly collect their information.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        If we change how this site handles personal information, we will update this page and change
        the effective date at the top. Material changes will be summarised here rather than made
        quietly.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="2026-08-17"
      intro={
        <>
          <p>
            This describes what happens to information you give us through this website. It was
            written by reading the code that runs it, not adapted from a template, so it should
            match the site&rsquo;s actual behaviour.
          </p>
          <p className="mt-4">
            The short version: two forms, no analytics, no cookies, no tracking, no mailing list. If
            you would rather not use a form, email us instead — see{" "}
            <Link href="/contact" className="text-blue-deep hover:underline">
              the contact page
            </Link>
            .
          </p>
        </>
      }
      sections={sections}
    />
  );
}
