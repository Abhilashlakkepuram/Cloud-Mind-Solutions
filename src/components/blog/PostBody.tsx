import { IconNodePath } from "@/components/icons";
import type { Block } from "@/lib/blog";

/**
 * Long-form renderer.
 *
 * Measure is capped at ~68ch — beyond that the eye loses the line return. Body
 * runs at 1.125rem/1.75 rather than the site's 1rem/1.6, because sustained
 * reading wants more of both than interface text does.
 */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;

        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="mt-14 scroll-mt-28 text-(length:--text-2xl) text-navy-ink first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={key}
                className="mt-10 text-(length:--text-lg) font-semibold leading-snug text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]"
              >
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p key={key} className="mt-6 text-[1.125rem] leading-[1.75] text-navy-ink/85 first:mt-0">
                {block.text}
              </p>
            );

          case "ul":
            return (
              <ul key={key} className="mt-7 grid gap-3.5">
                {block.items.map((item) => (
                  <li key={item.slice(0, 40)} className="flex gap-3.5">
                    <IconNodePath width={19} height={19} className="mt-1.5 shrink-0 text-blue-primary" />
                    <span className="text-[1.0625rem] leading-[1.7] text-navy-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} className="mt-7 grid gap-4">
                {block.items.map((item, n) => (
                  <li key={item.slice(0, 40)} className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-primary/30 bg-blue-primary/[0.07] font-mono text-[0.6875rem] text-blue-deep">
                      {n + 1}
                    </span>
                    <span className="text-[1.0625rem] leading-[1.7] text-navy-ink/85">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={key}
                className="mt-10 border-l-2 border-blue-primary py-1 pl-6 text-(length:--text-xl) leading-[1.45] text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]"
              >
                {block.text}
              </blockquote>
            );

          case "callout":
            return (
              <aside
                key={key}
                className="mt-10 rounded-lg border border-blue-primary/25 bg-blue-primary/[0.04] p-6"
              >
                <p className="label-mono text-blue-deep">{block.title}</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-navy-ink/85">{block.text}</p>
              </aside>
            );

          case "code":
            return (
              <figure key={key} className="mt-8 overflow-hidden rounded-lg border border-ink-700 bg-ink-900">
                <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <span className="label-mono text-white/40">{block.lang}</span>
                  <span aria-hidden className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </span>
                </figcaption>
                {/* Wide code scrolls inside its own container; the page never scrolls sideways. */}
                <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed">
                  <code className="font-mono text-white/80">{block.code}</code>
                </pre>
              </figure>
            );
        }
      })}
    </div>
  );
}
