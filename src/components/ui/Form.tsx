import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

/** Shared field styling for every form on the site. */
export const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-[0.9375rem] text-navy-ink transition-[border-color,box-shadow] duration-200 " +
  "placeholder:text-slate-gray/60 focus:outline-none focus-visible:outline-none";

export const inputOk =
  "border-paper-300 focus:border-blue-primary focus:shadow-[0_0_0_3px_rgba(46,109,246,0.14)]";

export const inputBad =
  "border-status-error focus:border-status-error focus:shadow-[0_0_0_3px_rgba(220,38,38,0.14)]";

/** Chevron for native selects, inlined as a data URI so no request is made. */
export const selectChevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9.5 6 5.5 6-5.5'/%3E%3C/svg%3E\")",
} as const;

export const selectClasses =
  "cursor-pointer appearance-none bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-10";

export function fieldDescribedBy(id: string, hasHint: boolean, hasError: boolean) {
  return (
    [hasHint ? `${id}-hint` : null, hasError ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined
  );
}

/**
 * Field wrapper.
 *
 * Labels are always visible — a placeholder disappears the moment someone types
 * and takes the only description of the field with it. Errors render directly
 * beneath their own input rather than being collected at the top of the form.
 */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3">
        <span className="text-[0.875rem] font-medium text-navy-ink">{label}</span>
        {optional && <span className="label-mono text-slate-gray/70">Optional</span>}
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate-gray">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] leading-relaxed text-status-error"
        >
          <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-status-error" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Honeypot input. Positioned off-screen rather than display:none — some bots
 * skip hidden inputs — and removed from the accessibility tree so no real user
 * ever encounters it.
 */
export function Honeypot({ id, register }: { id: string; register: UseFormRegisterReturn }) {
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} type="text" tabIndex={-1} autoComplete="off" {...register} />
    </div>
  );
}
