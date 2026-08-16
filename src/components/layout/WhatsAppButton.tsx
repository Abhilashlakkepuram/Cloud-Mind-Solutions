import { company } from "@/lib/site";

/**
 * Floating WhatsApp action.
 *
 * Zero JS: an anchor with CSS-only hover/focus states, so it costs nothing on
 * first load and works before hydration.
 *
 * Colour note — this is the one deliberate exception to the palette rule in
 * DESIGN-SYSTEM.md §1. WhatsApp green (#25D366) is a third-party brand mark,
 * and recognition is the entire function of the control: a navy button with an
 * unfamiliar glyph is materially worse at its job. Pass `tone="brand"` to get
 * the CloudMind gradient instead if the green is unwanted.
 *
 * Sits at z-40, below the header (z-50), so the mobile drawer always covers it.
 */

const WHATSAPP_GREEN = "#25D366";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24a8.19 8.19 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.23 8.24Z" />
    </svg>
  );
}

export function WhatsAppButton({ tone = "whatsapp" }: { tone?: "whatsapp" | "brand" }) {
  const href = `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(
    company.whatsapp.message,
  )}`;
  const brand = tone === "brand";

  return (
    <a
      href={href}
      target="_blank"
      // noreferrer as well as noopener — this leaves the site, and there is no
      // reason to leak the referring URL to a third party.
      rel="noopener noreferrer"
      aria-label="Chat with CloudMind Solutions on WhatsApp (opens in a new tab)"
      className={[
        "group/wa fixed z-40 flex items-center gap-0 overflow-hidden rounded-full text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)]",
        // Respects the iOS home indicator; sits clear of the viewport edge.
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]",
        // 56px target — comfortably above the 44px minimum.
        "h-14 min-w-14 px-4",
        "transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.6)] active:scale-95",
        brand ? "brand-gradient" : "",
      ].join(" ")}
      style={brand ? undefined : { backgroundColor: WHATSAPP_GREEN }}
    >
      <WhatsAppGlyph className="shrink-0" />

      {/* Label expands on hover/focus. max-width is animated rather than width
          so the collapsed state costs no layout space. Hidden from screen
          readers because aria-label already names the control. */}
      <span
        aria-hidden
        className="max-w-0 whitespace-nowrap text-[0.9375rem] font-medium opacity-0 transition-[max-width,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/wa:ml-3 group-hover/wa:max-w-[10rem] group-hover/wa:opacity-100 group-focus-visible/wa:ml-3 group-focus-visible/wa:max-w-[10rem] group-focus-visible/wa:opacity-100"
      >
        Chat on WhatsApp
      </span>

      {/* Idle pulse — motion-safe only, and purely a presence cue. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25 motion-safe:animate-ping"
        style={{ animationDuration: "3.5s" }}
      />
    </a>
  );
}
