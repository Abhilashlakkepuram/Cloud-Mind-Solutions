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
import { contactSchema, SERVICE_INTEREST, type ContactValues } from "@/lib/contact-schema";
import { company } from "@/lib/site";
import { EASE_EXPO } from "@/lib/motion";

export function ContactForm() {
  const uid = useId().replace(/:/g, "");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    // Validate once the user leaves a field, then stay live while they fix it —
    // errors never appear while someone is still mid-thought.
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      serviceInterest: "not-sure",
      message: "",
      website: "",
    },
  });

  const id = (n: string) => `${uid}-${n}`;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 422) {
        const body = (await res.json()) as { fieldErrors?: Record<string, string[]> };
        Object.entries(body.fieldErrors ?? {}).forEach(([field, messages]) => {
          if (messages?.[0]) setError(field as keyof ContactValues, { message: messages[0] });
        });
        setSubmitError("Some fields need attention.");
        return;
      }

      if (!res.ok) throw new Error(String(res.status));

      setSent(true);
      reset();
    } catch {
      setSubmitError(
        `That didn't send. Email us directly at ${company.email} and we'll pick it up from there.`,
      );
    }
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_EXPO }}
        className="rounded-lg border border-blue-primary/30 bg-blue-primary/[0.05] p-8 text-center"
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-primary/40 bg-white text-blue-deep">
          <IconCheck width={22} height={22} />
        </span>
        <h3 className="mt-6 text-(length:--text-xl) text-navy-ink">That&rsquo;s with us.</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-slate-gray">
          One of the founders will reply within one business day. If it&rsquo;s urgent, call the
          number on this page rather than waiting on the email.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setSent(false)}>
          Send another
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

        <Field label="Work email" htmlFor={id("email")} error={errors.email?.message}>
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

        <Field label="Company" htmlFor={id("company")} error={errors.company?.message}>
          <input
            id={id("company")}
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={fieldDescribedBy(id("company"), false, !!errors.company)}
            className={`${inputBase} ${errors.company ? inputBad : inputOk}`}
            {...register("company")}
          />
        </Field>

        <Field label="Phone" htmlFor={id("phone")} optional error={errors.phone?.message}>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={fieldDescribedBy(id("phone"), false, !!errors.phone)}
            className={`${inputBase} ${errors.phone ? inputBad : inputOk}`}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field
        label="What's this about?"
        htmlFor={id("serviceInterest")}
        hint="Closest match is fine. We'll route it properly on our side."
        error={errors.serviceInterest?.message}
      >
        <select
          id={id("serviceInterest")}
          aria-invalid={!!errors.serviceInterest}
          aria-describedby={fieldDescribedBy(id("serviceInterest"), true, !!errors.serviceInterest)}
          className={`${inputBase} ${errors.serviceInterest ? inputBad : inputOk} ${selectClasses}`}
          style={selectChevron}
          {...register("serviceInterest")}
        >
          {SERVICE_INTEREST.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="What's the problem?"
        htmlFor={id("message")}
        hint="What's happening, what you've already tried, and any date you're working toward. Detail here saves a discovery call later."
        error={errors.message?.message}
      >
        <textarea
          id={id("message")}
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={fieldDescribedBy(id("message"), true, !!errors.message)}
          className={`${inputBase} ${errors.message ? inputBad : inputOk} resize-y`}
          {...register("message")}
        />
      </Field>

      {submitError && (
        <p
          role="alert"
          className="rounded-md border border-status-error/30 bg-status-error/[0.06] px-4 py-3 text-[0.875rem] leading-relaxed text-status-error"
        >
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-paper-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-slate-gray">
          We reply to everything within one business day. No mailing list, no drip sequence.
        </p>
        <Button type="submit" variant="gradient" size="lg" disabled={isSubmitting} withArrow={!isSubmitting}>
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
