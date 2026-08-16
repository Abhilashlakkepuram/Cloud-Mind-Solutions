"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { IconChevronDown, IconClose, IconMenu } from "@/components/icons";
import { serviceIcons } from "@/components/icons";
import { primaryNav, services } from "@/lib/site";
import { EASE_EXPO } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation. Adjusted during render rather than in an
  // effect — an effect here would paint the old open menu for one frame on the
  // new route, and cascades an extra render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  // "/" needs an exact match — every pathname starts with it, so the prefix
  // test would mark Home active on every page.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-ink-900/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[85rem] items-center justify-between px-(--spacing-gutter)">
        <Link href="/" className="shrink-0" aria-label="CloudMind Solutions — home">
          <Logo tone="light" priority />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative flex h-10 items-center px-3.5 text-[0.9375rem] text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                      <span
                        className={[
                          "absolute inset-x-3.5 -bottom-px h-px origin-left bg-cyan-bright transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href} onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
                  <Link
                    href={item.href}
                    // Matches the items without children — the underline already
                    // shows this as active on /services/*, so assistive tech
                    // should be told the same thing.
                    aria-current={active ? "page" : undefined}
                    aria-expanded={megaOpen}
                    onFocus={openMega}
                    className="group relative flex h-10 items-center gap-1.5 px-3.5 text-[0.9375rem] text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <IconChevronDown
                      width={14}
                      height={14}
                      className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                    />
                    <span
                      className={[
                        "absolute inset-x-3.5 -bottom-px h-px origin-left bg-cyan-bright transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact now lives in `primaryNav`, so the right cluster is the CTA only. */}
        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/contact#consultation" variant="gradient" size="sm" withArrow>
            Book a Consultation
          </ButtonLink>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Services mega-menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_EXPO }}
            className="absolute inset-x-0 top-full hidden border-b border-white/10 bg-ink-900/95 backdrop-blur-xl lg:block"
          >
            <div className="mx-auto grid w-full max-w-[85rem] gap-8 px-(--spacing-gutter) py-9 lg:grid-cols-[1fr_20rem]">
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {services.map((s) => {
                  const Icon = serviceIcons[s.slug];
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-3.5 rounded-lg p-3.5 transition-colors duration-200 hover:bg-white/[0.06]"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-cyan-bright transition-[border-color,background-color] duration-200 group-hover:border-cyan-bright/50 group-hover:bg-cyan-bright/10">
                          <Icon width={18} height={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.9375rem] font-medium text-white">
                            {s.navLabel}
                          </span>
                          <span className="mt-1 block font-mono text-[0.6875rem] leading-relaxed text-white/45">
                            {s.capabilities.slice(0, 3).join(" · ")}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <span className="label-mono text-cyan-bright">Not sure where to start</span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">
                  Every engagement begins with a two-week assessment: we map what you run today and
                  hand back a costed plan you own — whether or not you hire us for the build.
                </p>
                <ButtonLink href="/services" variant="onDark" size="sm" withArrow className="mt-5">
                  All services
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE_EXPO }}
            className="overflow-hidden border-t border-white/10 bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto px-(--spacing-gutter) py-6">
              <span className="label-mono text-cyan-bright">Services</span>
              <ul className="mt-3 grid gap-0.5">
                {services.map((s) => {
                  const Icon = serviceIcons[s.slug];
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex min-h-11 items-center gap-3 rounded-md px-2 py-2.5 text-[0.9375rem] text-white/80 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                      >
                        <Icon width={17} height={17} className="shrink-0 text-cyan-bright" />
                        {s.navLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-6 grid gap-0.5 border-t border-white/10 pt-5">
                {primaryNav
                  .filter((i) => !i.children)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex min-h-11 items-center rounded-md px-2 text-base text-white/80 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>

              <ButtonLink
                href="/contact#consultation"
                variant="gradient"
                size="lg"
                withArrow
                className="mt-6 w-full"
              >
                Book a Consultation
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
