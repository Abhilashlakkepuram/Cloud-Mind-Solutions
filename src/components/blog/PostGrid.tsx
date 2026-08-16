"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PostCard } from "@/components/blog/PostCard";
import { CATEGORIES, type Category, type Post } from "@/lib/blog";
import { EASE_EXPO } from "@/lib/motion";

type Filter = Category | "All";

export function PostGrid({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  // Only offer categories that actually have posts — a filter that returns
  // nothing is a dead end the reader has to back out of.
  const available = useMemo<Filter[]>(
    () => ["All", ...CATEGORIES.filter((c) => posts.some((p) => p.category === c))],
    [posts],
  );

  const visible = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.category === filter)),
    [posts, filter],
  );

  const [featured, ...rest] = visible;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter posts by category">
        {available.map((c) => {
          const on = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={on}
              className={[
                "relative flex h-9 cursor-pointer items-center gap-2 rounded-md border px-3.5 text-[0.8125rem] font-medium transition-[border-color,background-color,color] duration-200",
                on
                  ? "border-blue-primary/45 bg-blue-primary/[0.08] text-blue-deep"
                  : "border-paper-300 bg-white text-slate-gray hover:border-blue-primary/30 hover:text-navy-ink",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                  on ? "bg-blue-primary" : "bg-paper-300",
                ].join(" ")}
              />
              {c}
              <span className="font-mono text-[0.6875rem] opacity-60">
                {c === "All" ? posts.length : posts.filter((p) => p.category === c).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* aria-live so a filter change is announced rather than silently swapping. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "post" : "posts"}
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: EASE_EXPO }}
          className="mt-10"
        >
          {featured && (
            <div className="mb-5">
              <PostCard post={featured} featured />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
