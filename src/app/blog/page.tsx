import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { PostGrid } from "@/components/blog/PostGrid";
import { sortedPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical writing on applied AI, cloud migration, security assessment, and legacy modernization — from the engineers doing the work.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Insights — CloudMind Solutions",
    description:
      "Practical writing on applied AI, cloud, security, and software modernization.",
    url: `${siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the work, not from the marketing calendar."
        lede="We write when we learn something worth passing on — usually after an engagement surfaces a problem we had not seen framed properly anywhere else. No posting schedule, no SEO filler."
        align="wide"
        specs={[
          { k: "posts", v: String(sortedPosts.length) },
          { k: "cadence", v: "When there's something" },
          { k: "written by", v: "The engineers" },
        ]}
      />

      <Section tone="paper">
        <Container width="wide">
          <PostGrid posts={sortedPosts} />
        </Container>
      </Section>

      <CtaSection
        title="Recognise one of these problems?"
        lede="Most of what we write about started as a client engagement. If a post describes your situation more accurately than you'd like, that's usually a good reason to talk."
        secondary={{ href: "/services", label: "See the practices" }}
      />
    </>
  );
}
