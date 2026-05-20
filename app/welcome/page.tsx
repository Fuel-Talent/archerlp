import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = { title: "Welcome — Archer.sre" };

export default function WelcomePage() {
  return (
    <main className="min-h-screen grid place-items-center px-6 py-24">
      <div className="max-w-xl text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400 ring-1 ring-emerald-400/30">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          You&apos;re in. Check your inbox.
        </h1>
        <p className="mt-4 text-steel-300">
          We just sent a magic link to the email you provided. Click it to drop
          straight into the Archer sandbox — Archer is already triaging a live
          incident inside it.
        </p>
        <p className="mt-2 text-sm text-steel-400">
          Don&apos;t see the email? It can take a minute, and sometimes lands in
          Promotions or Spam.
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
