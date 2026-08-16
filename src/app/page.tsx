import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { HowWeWork } from "@/components/home/HowWeWork";
import { IndustriesTeaser } from "@/components/home/IndustriesTeaser";
import { ProofBand } from "@/components/home/ProofBand";
import { CtaBand } from "@/components/home/CtaBand";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { company, siteUrl, addressLine } from "@/lib/site";

export const metadata: Metadata = {
  title: `${company.name} — AI & IT Consulting in St. Petersburg, FL`,
  description:
    "Cloud infrastructure, applied AI, cybersecurity, software, and managed IT — planned, built, and operated by the same engineers. Fixed-scope assessment before any build.",
  alternates: { canonical: "/" },
};

/** Organization + LocalBusiness markup so the office address is machine-readable. */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.legalName,
  url: siteUrl,
  slogan: company.tagline,
  description:
    "AI and IT consulting firm providing cloud infrastructure, applied AI, cybersecurity, software consulting, and managed IT services.",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "US",
  },
  telephone: company.phone,
  email: company.email,
  areaServed: "United States",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static object, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <span className="sr-only">{addressLine}</span>

      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <TraceDivider tone="light" className="bg-paper-100" />
      <HowWeWork />
      <IndustriesTeaser />
      <TraceDivider tone="light" flip className="bg-white" />
      <ProofBand />
      <CtaBand />
    </>
  );
}
