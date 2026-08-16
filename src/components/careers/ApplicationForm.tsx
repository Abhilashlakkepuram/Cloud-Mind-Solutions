"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import {
  Field,
  Honeypot,
  fieldDescribedBy,
  inputBad,
  inputBase,
  inputOk,
  selectChevron,
  selectClasses,
} from "@/components/ui/Form";
import { IconCheck } from "@/components/icons";
import { applicationSchema, ROLE_OPTIONS, type ApplicationValues } from "@/lib/careers-schema";
import { company } from "@/lib/site";
import { EASE_EXPO } from "@/lib/motion";

export function ApplicationForm({ defaultRole }: { defaultRole?: string }) {
  const uid = useId().replace(/:/g, "");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      role: defaultRole ?? "general-interest",
      links: "",
      message: "",
      website: "",
    },
  });

  const id = (n: string) => `${uid}-${n}`;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 422) {
        const body = (await res.json()) as { fieldErrors?: Record<string, string[]> };
        Object.entries(body.fieldErrors ?? {}).forEach(([field, messages]) => {
          if (messages?.[0]) setError(field as keyof ApplicationValues, { message: messages[0] });
        });
        setSubmitError("Some fields need attention.");
        return;
      }

      if (!res.ok) throw new Error(String(res.status));

      setSent(true);
      reset();
    } catch {
      setSubmitError(`That didn't send. Email us directly at ${company.email} instead.`);
    }
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_EXPO }}
        className="rounded-lg border border-cyan-bright/30 bg-cyan-bright/[0.07] p-8 text-center"
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan-bright/40 bg-ink-900 text-cyan-bright">
          <IconCheck width={22} height={22} />
        </span>
        <h3 className="mt-6 text-(length:--text-xl) text-white">Got it — thank you.</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/60">
          A founder reads every application. You&rsquo;ll hear back within a week either way, and if
          it&rsquo;s a no you&rsquo;ll get a reason rather than a template.
        </p>
        <Button variant="onDark" size="sm" className="mt-6" onClick={() => setSent(false)}>
          Submit another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6">
      <Honeypot id={id("website")} register={register("website")} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor={id("name")} error={errors.name?.message}>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={fieldDescribedBy(id("name"), false, !!errors.name)}
            className={`${inputBase} ${errors.name ? inputBad : inputOk}`}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor={id("email")} error={errors.email?.message}>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={fieldDescribedBy(id("email"), false, !!errors.email)}
            className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
            {...register("email")}
          />
        </Field>
      </div>

      <Field label="What are you applying for?" htmlFor={id("role")} error={errors.role?.message}>
        <select
          id={id("role")}
          aria-invalid={!!errors.role}
          aria-describedby={fieldDescribedBy(id("role"), false, !!errors.role)}
          className={`${inputBase} ${errors.role ? inputBad : inputOk} ${selectClasses}`}
          style={selectChevron}
          {...register("role")}
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Links"
        htmlFor={id("links")}
        optional
        hint="GitHub, writing, LinkedIn, anything you'd rather we read than a CV. One per line."
        error={errors.links?.message}
      >
        <textarea
          id={id("links")}
          rows={3}
          aria-invalid={!!errors.links}
          aria-describedby={fieldDescribedBy(id("links"), true, !!errors.links)}
          className={`${inputBase} ${errors.links ? inputBad : inputOk} resize-y font-mono text-[0.875rem]`}
          {...register("links")}
        />
      </Field>

      <Field
        label="Tell us about something you built"
        htmlFor={id("message")}
        hint="Ideally something that went wrong, and what you did about it. We're far more interested in that than in a list of technologies."
        error={errors.message?.message}
      >
        <textarea
          id={id("message")}
          rows={7}
          aria-invalid={!!errors.message}
          aria-describedby={fieldDescribedBy(id("message"), true, !!errors.message)}
          className={`${inputBase} ${errors.message ? inputBad : inputOk} resize-y`}
          {...register("message")}
        />
      </Field>

      {submitError && (
        <p
          role="alert"
          className="rounded-md border border-status-error/30 bg-status-error/[0.08] px-4 py-3 text-[0.875rem] leading-relaxed text-status-error"
        >
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-paper-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-slate-gray">
          No CV upload required. We read what you write here first.
        </p>
        <Button type="submit" variant="gradient" size="lg" disabled={isSubmitting} withArrow={!isSubmitting}>
          {isSubmitting ? "Sending…" : "Send application"}
        </Button>
      </div>
    </form>
  );
}
