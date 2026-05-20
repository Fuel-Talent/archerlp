import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";

export const metadata = { title: "Thanks — Archer.sre" };

export default function ThankYouPage() {
  return (
    <main className="min-h-screen grid place-items-center px-6 py-24">
      <div className="max-w-xl text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
          <CalendarClock className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          You&apos;re on the calendar.
        </h1>
        <p className="mt-4 text-steel-300">
          Our SRE team will reach out within one business day with a calendar
          link and a short prep guide. In the meantime, feel free to send any
          observability or compliance questions you&apos;d like us to come
          prepared for.
        </p>

        <div className="mt-10 inline-flex items-center gap-4">
          <Link href="/" className="btn-secondary">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
