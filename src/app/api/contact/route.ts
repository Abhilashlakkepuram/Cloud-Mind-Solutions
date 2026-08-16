import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact endpoint.
 *
 * Validation is real and runs server-side against the same schema the form
 * uses. Delivery is NOT yet wired — see the TODO below. The route deliberately
 * returns 200 so the form flow can be demonstrated end to end, and logs a loud
 * warning so nobody ships it in this state by accident.
 *
 * To go live, replace the marked block with one of:
 *   - a transactional email provider (Resend, Postmark, SES)
 *   - a CRM webhook (HubSpot, Pipedrive)
 *   - a Slack/Teams incoming webhook for a small team
 * Provision it through the Vercel Marketplace rather than hardcoding an SDK.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention.",
        // Field-keyed messages so the client can attach them to inputs.
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // ---------------------------------------------------------------------
  // TODO(delivery): send this somewhere a human reads.
  // Nothing below persists or forwards the enquiry yet.
  // ---------------------------------------------------------------------
  console.warn(
    "[contact] Enquiry received but NOT delivered — no email/CRM integration is configured.",
    {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      serviceInterest: parsed.data.serviceInterest,
      messageLength: parsed.data.message.length,
    },
  );

  return NextResponse.json({ ok: true });
}
