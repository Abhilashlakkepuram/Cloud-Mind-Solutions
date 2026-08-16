import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { IconArrowRight, IconClock, IconTag } from "@/components/icons";
import { formatDate, type Post } from "@/lib/blog";

export function PostCard({
  post,
  featured = false,
  /**
   * Cards sit directly under the page h1 on the index (so h2), but under a
   * "Related writing" h2 on a post page (so h3). The correct level depends on
   * the surrounding document, which only the caller knows.
   */
  headingLevel = 2,
}: {
  post: Post;
  featured?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={[
        "group relative isolate flex h-full flex-col overflow-hidden rounded-lg border border-paper-300 bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-0.5 hover:border-blue-primary/40 hover:shadow-[0_18px_44px_-24px_rgba(11,30,61,0.4)] focus-within:border-blue-primary/40",
        featured ? "lg:flex-row" : "",
      ].join(" ")}
    >
      <div className={featured ? "lg:w-[55%]" : ""}>
        <ImagePlaceholder
          label={post.cover.label}
          width={post.cover.width}
          height={post.cover.height}
          context="Blog card"
          className={featured ? "h-full" : ""}
        />
      </div>

      <div className={["flex flex-1 flex-col p-6", featured ? "lg:p-9" : ""].join(" ")}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="label-mono inline-flex items-center gap-1.5 text-blue-deep">
            <IconTag width={13} />
            {post.category}
          </span>
          <span aria-hidden className="h-px w-4 bg-paper-300" />
          <time dateTime={post.publishedAt} className="font-mono text-[0.6875rem] text-slate-gray">
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden className="h-px w-4 bg-paper-300" />
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-slate-gray">
            <IconClock width={13} />
            {post.readMinutes} min
          </span>
        </p>

        <Heading
          className={[
            "mt-4 leading-snug text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.025em]",
            featured ? "text-(length:--text-2xl)" : "text-(length:--text-xl)",
          ].join(" ")}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </Heading>

        <p
          className={[
            "mt-4 leading-relaxed text-slate-gray",
            featured ? "text-[1.0625rem]" : "text-[0.9375rem]",
          ].join(" ")}
        >
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-[0.8125rem] text-slate-gray">{post.author.name}</span>
          <IconArrowRight
            width={17}
            className="shrink-0 text-blue-deep transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          />
        </div>
      </div>
    </article>
  );
}
