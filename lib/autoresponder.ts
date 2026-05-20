import "server-only";
import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cached) cached = new Resend(key);
  return cached;
}

export type SubmissionFlow = "instant_access" | "book_call";

export type SubmissionPayload = {
  flow: SubmissionFlow;
  audienceId: string;
  name: string;
  email: string;
  company: string;
  // book_call only
  role?: string;
  pain?: string;
};

// Add the contact to the configured Resend audience. Resend's Contacts API
// only stores email + first/last name + unsubscribed flag — anything richer
// (role, pain point, company) belongs in the notification email below.
export async function addContactToAudience(payload: SubmissionPayload) {
  const resend = getResend();
  if (!resend) throw new Error("RESEND_API_KEY not configured");
  if (!payload.audienceId) throw new Error("audienceId missing for this form");

  const [firstName, ...rest] = payload.name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  const { error } = await resend.contacts.create({
    email: payload.email,
    firstName: firstName || payload.name,
    lastName: lastName || undefined,
    unsubscribed: false,
    audienceId: payload.audienceId,
  });

  if (error) throw new Error(`Resend contacts.create failed: ${error.message}`);
}

// Optional: send a notification email to the internal team with the full form
// data so role/pain-point/company aren't lost. No-op if env vars aren't set.
export async function notifyTeam(payload: SubmissionPayload) {
  const resend = getResend();
  if (!resend) return;

  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.LEAD_NOTIFICATION_FROM;
  if (!to || !from) return;

  const flowLabel =
    payload.flow === "instant_access"
      ? "Instant sandbox access"
      : "Book a call";

  const lines = [
    `New ${flowLabel} submission`,
    "",
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Company: ${payload.company}`,
  ];
  if (payload.role) lines.push(`Role:    ${payload.role}`);
  if (payload.pain) lines.push("", "Pain point:", payload.pain);

  const text = lines.join("\n");
  const subject = `[Archer] ${flowLabel} — ${payload.company || payload.email}`;

  const { error } = await resend.emails.send({ from, to, subject, text });
  if (error) {
    // Don't fail the submission if the notification fails — the contact is
    // already in the audience, that's the load-bearing part.
    console.error("[autoresponder] team notification failed:", error.message);
  }
}
