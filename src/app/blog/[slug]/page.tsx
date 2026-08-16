import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, SectionLabel } from "@/components/ui/Section";
import { CtaSection } from "@/components/layout/CtaSection";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowLeft, IconArrowRight, IconClock, IconTag } from "@/components/icons";
import { formatDate, postBySlug, posts, relatedPosts } from "@/lib/blog";
import { company, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const related = relatedPosts(post);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: company.legalName },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── Article header ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-900 pb-(--spacing-section-sm) pt-32 lg:pt-40">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute -right-[10%] -top-[25%] h-[38rem] w-[38rem] rounded-full opacity-[0.14] blur-[130px]"
          style={{ backgroundImage: "radial-gradient(circle, #38BDF8 0%, transparent 68%)" }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-900" />

        <Container width="wide" className="relative">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[0.875rem] text-white/55 transition-colors duration-200 hover:text-cyan-bright"
          >
            <IconArrowLeft
              width={15}
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
            />
            All insights
          </Link>

          <SectionLabel tone="light" className="mt-8">
            {post.category}
          </SectionLabel>

          <h1 className="mt-7 max-w-4xl text-(length:--text-4xl) text-white">{post.title}</h1>

          <p className="mt-7 max-w-2xl text-(length:--text-lg) leading-relaxed text-white/65">
            {post.excerpt}
          </p>

          {/* Byline */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
            <ImagePlaceholder
              label={`Author headshot — ${post.author.role}`}
              width={48}
              height={48}
              context="Post byline"
              variant="plain"
              className="h-12 w-12 shrink-0 rounded-full"
            />
            <div>
              <p className="text-[0.9375rem] font-medium text-white">{post.author.name}</p>
              <p className="label-mono mt-1 text-cyan-bright">{post.author.role}</p>
            </div>
            <span aria-hidden className="hidden h-8 w-px bg-white/15 sm:block" />
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] text-white/55">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden className="h-px w-4 bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <IconClock width={13} />
                {post.readMinutes} min read
              </span>
              <span aria-hidden className="h-px w-4 bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <IconTag width={13} />
                {post.category}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* ── Cover ────────────────────────────────────────────────────────── */}
      <div className="bg-white">
        <Container width="wide">
          <div className="-mt-10 lg:-mt-14">
            <ImagePlaceholder
              label={post.cover.label}
              width={post.cover.width}
              height={post.cover.height}
              context="Post cover"
              priority
              sizes="(max-width: 1360px) 100vw, 1360px"
              className="rounded-lg"
            />
          </div>
        </Container>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <Section tone="light">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_16rem] lg:gap-20">
            <PostBody blocks={post.body} />

            {/* Aside rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-paper-300 bg-paper-100 p-6">
                <p className="label-mono text-slate-gray">Written by</p>
                <p className="mt-3 text-[0.9375rem] font-medium text-navy-ink">{post.author.name}</p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-gray">
                  {post.author.role}
                </p>
                <p className="mt-4 border-t border-paper-300 pt-4 text-[0.8125rem] leading-relaxed text-slate-gray">
                  Working on something this touches? We answer questions like this without a sales
                  call attached.
                </p>
                <Link
                  href="/contact"
                  className="group mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-blue-deep"
                >
                  <span className="relative">
                    Get in touch
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  </span>
                  <IconArrowRight
                    width={15}
                    height={15}
                    className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <p className="mt-4 font-mono text-[0.625rem] leading-relaxed text-slate-gray/70">
                [PLACEHOLDER] Author name, role, and headshot to be filled in from the team page.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <Section tone="paper" size="sm">
          <Container width="wide">
            <Reveal>
              <SectionLabel>Keep reading</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                Related writing
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                // h3 — these sit under the "Related writing" h2 above.
                <PostCard key={p.slug} post={p} headingLevel={3} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaSection
        title="This kind of problem is what we get hired for."
        lede="If the post described your situation more precisely than you'd like, the assessment is the cheapest way to find out how bad it actually is."
        secondary={{ href: "/blog", label: "Read more insights" }}
      />
    </>
  );
}
