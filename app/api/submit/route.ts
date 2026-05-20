import { NextResponse } from "next/server";
import {
  addContactToAudience,
  notifyTeam,
  type SubmissionFlow,
  type SubmissionPayload,
} from "@/lib/autoresponder";

export const runtime = "nodejs";

const isEmail = (s: unknown): s is string =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const isFlow = (s: unknown): s is SubmissionFlow =>
  s === "instant_access" || s === "book_call";

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON");
  }

  if (!body || typeof body !== "object") return bad("Invalid body");
  const b = body as Record<string, unknown>;

  if (!isFlow(b.flow)) return bad("Invalid flow");
  if (typeof b.audienceId !== "string" || !b.audienceId)
    return bad("Missing audienceId");
  if (typeof b.name !== "string" || !b.name.trim()) return bad("Missing name");
  if (!isEmail(b.email)) return bad("Invalid email");
  if (typeof b.company !== "string" || !b.company.trim())
    return bad("Missing company");

  if (b.flow === "book_call") {
    if (typeof b.role !== "string" || !b.role) return bad("Missing role");
    if (typeof b.pain !== "string" || b.pain.trim().length < 10)
      return bad("Pain point too short");
  }

  const payload: SubmissionPayload = {
    flow: b.flow,
    audienceId: b.audienceId,
    name: b.name.trim(),
    email: b.email.trim().toLowerCase(),
    company: b.company.trim(),
    role: typeof b.role === "string" ? b.role : undefined,
    pain: typeof b.pain === "string" ? b.pain.trim() : undefined,
  };

  try {
    await addContactToAudience(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[submit] addContactToAudience failed:", message);
    return bad(
      "We couldn't save your submission right now — please try again in a moment.",
      502
    );
  }

  // Best-effort. Failure here does not fail the request.
  notifyTeam(payload).catch(() => {});

  return NextResponse.json({ ok: true });
}
