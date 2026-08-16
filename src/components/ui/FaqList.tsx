import { IconPlus } from "@/components/icons";

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Deliberately not a JS accordion: <details> is keyboard-operable, screen-reader
 * announced, expandable-on-find-in-page, and printable, all without shipping a
 * component. The only JS-free cost is that we cannot animate height — so the
 * marker rotates instead, which is the honest trade.
 */
export function FaqList({
  items,
  tone = "light",
}: {
  items: { q: string; a: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className={["divide-y border-y", dark ? "divide-white/10 border-white/10" : "divide-paper-200 border-paper-200"].join(" ")}>
      {items.map((item) => (
        <details key={item.q} className="group/faq">
          <summary
            className={[
              "flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden",
              dark ? "text-white hover:text-cyan-bright" : "text-navy-ink hover:text-blue-deep",
            ].join(" ")}
          >
            <h3 className="text-(length:--text-lg) font-medium leading-snug [font-family:var(--font-display)] [letter-spacing:-0.015em]">
              {item.q}
            </h3>
            <span
              className={[
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open/faq:rotate-45",
                dark
                  ? "border-white/15 text-cyan-bright group-open/faq:border-cyan-bright/50 group-open/faq:bg-cyan-bright/10"
                  : "border-paper-300 text-blue-deep group-open/faq:border-blue-primary/40 group-open/faq:bg-blue-primary/[0.07]",
              ].join(" ")}
            >
              <IconPlus width={15} height={15} />
            </span>
          </summary>
          <p
            className={[
              "max-w-3xl pb-7 pr-12 text-[1.0625rem] leading-relaxed",
              dark ? "text-white/60" : "text-slate-gray",
            ].join(" ")}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
