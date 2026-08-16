import { z } from "zod";
import { services } from "@/lib/site";

export const SERVICE_INTEREST = [
  ...services.map((s) => ({ value: s.slug as string, label: s.navLabel })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

const serviceValues = SERVICE_INTEREST.map((s) => s.value) as [string, ...string[]];

/**
 * One schema, imported by both the client form and the API route, so the rules
 * cannot drift apart. Client-side validation is a convenience; the server
 * validates the same shape because the client can be bypassed.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is longer than we can store."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email address to reply to.")
    .email("That doesn't look like a valid email address."),
  company: z
    .string()
    .trim()
    .min(2, "Please tell us which company you're with.")
    .max(160, "That company name is longer than we can store."),
  phone: z
    .string()
    .trim()
    .max(40, "That phone number is longer than we can store.")
    .optional()
    .or(z.literal("")),
  serviceInterest: z.enum(serviceValues, {
    message: "Pick the closest match — 'Not sure yet' is a valid answer.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about the problem helps us route this to the right person.")
    .max(4000, "Please keep this under 4,000 characters."),
  /**
   * Honeypot. Hidden from users and from assistive technology; bots that fill
   * every field will populate it.
   *
   * Deliberately NOT constrained here. If the schema rejected a filled
   * honeypot, the caller would get a 422 telling them exactly which field gave
   * them away. Instead it validates as an ordinary optional string and the API
   * route drops the submission while returning a normal success response.
   */
  website: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
