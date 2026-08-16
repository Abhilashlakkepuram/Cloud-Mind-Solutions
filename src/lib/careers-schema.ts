import { z } from "zod";
import { openings } from "@/lib/careers-content";

/** Role options — real openings when they exist, plus a standing general track. */
export const ROLE_OPTIONS = [
  ...openings.map((o) => ({ value: o.id, label: o.title })),
  { value: "general-interest", label: "General interest — no specific role" },
] as const;

const roleValues = ROLE_OPTIONS.map((r) => r.value) as [string, ...string[]];

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "That's longer than we can store."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email address to reply to.")
    .email("That doesn't look like a valid email address."),
  role: z.enum(roleValues, { message: "Pick a role, or general interest." }),
  links: z
    .string()
    .trim()
    .max(600, "Please keep this under 600 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(40, "Tell us about something you built and what went wrong with it — a few sentences is plenty.")
    .max(6000, "Please keep this under 6,000 characters."),
  /** See contact-schema.ts — intentionally unconstrained; the route drops it silently. */
  website: z.string().optional(),
});

export type ApplicationValues = z.infer<typeof applicationSchema>;
