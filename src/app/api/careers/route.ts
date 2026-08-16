import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/careers-schema";

/**
 * Careers endpoint. Same contract as /api/contact — real server-side validation,
 * delivery not yet wired. See the TODO below before launch.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention.",
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
  // TODO(delivery): route applications to a real inbox or ATS.
  // Applications contain personal data — pick a destination with an agreed
  // retention period, and document it in the privacy policy before launch.
  // ---------------------------------------------------------------------
  console.warn(
    "[careers] Application received but NOT delivered — no inbox/ATS integration is configured.",
    {
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      messageLength: parsed.data.message.length,
    },
  );

  return NextResponse.json({ ok: true });
}
