"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, CalendarClock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { track } from "@/lib/analytics";

type InstantForm = { name: string; email: string; company: string };
type CallForm = { name: string; email: string; company: string; role: string; pain: string };

const initialInstant: InstantForm = { name: "", email: "", company: "" };
const initialCall: CallForm = { name: "", email: "", company: "", role: "", pain: "" };

const roles = [
  "CTO",
  "VP Engineering",
  "Director of SRE / Platform",
  "Engineering Manager",
  "Principal / Staff SRE",
  "Other",
];

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function validateInstant(f: InstantForm) {
  const errs: Partial<Record<keyof InstantForm, string>> = {};
  if (!f.name.trim()) errs.name = "Required";
  if (!isEmail(f.email)) errs.email = "Enter a valid work email";
  if (!f.company.trim()) errs.company = "Required";
  return errs;
}

function validateCall(f: CallForm) {
  const errs: Partial<Record<keyof CallForm, string>> = {};
  if (!f.name.trim()) errs.name = "Required";
  if (!isEmail(f.email)) errs.email = "Enter a valid work email";
  if (!f.company.trim()) errs.company = "Required";
  if (!f.role) errs.role = "Please pick a role";
  if (f.pain.trim().length < 10) errs.pain = "Tell us a little more (10+ chars)";
  return errs;
}

export default function DemoCTA() {
  return (
    <AnimatedSection id="demo" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Try Archer</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Two ways to get hands-on with Archer.
          </h2>
          <p className="mt-4 text-steel-300">
            Most teams want to poke at it themselves. Some want a guided tour
            with our SRE engineers. Both take 30 minutes or less.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <InstantAccessCard />
          <BookCallCard />
        </div>
      </div>
    </AnimatedSection>
  );
}

function InstantAccessCard() {
  const [form, setForm] = useState<InstantForm>(initialInstant);
  const [errors, setErrors] = useState<Partial<Record<keyof InstantForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof InstantForm>(k: K, v: InstantForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateInstant(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      track("form_error", { flow: "instant_access", fields: Object.keys(errs).join(",") });
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      track("form_submit", { flow: "instant_access", company: form.company });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/[0.07] to-white/[0.01] p-8 shadow-ring overflow-hidden"
    >
      <div aria-hidden className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent text-ink-950 ring-1 ring-accent/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-accent-300 bg-accent/10 border border-accent/30 rounded-full px-2.5 py-1">
            Recommended
          </span>
        </div>
        <h3 className="mt-5 text-xl font-semibold text-white">
          Instant sandbox access
        </h3>
        <p className="mt-2 text-sm text-steel-300">
          Create a free account. Drop straight into a live sandbox where
          Archer is triaging a real incident. No sales call required.
        </p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6 text-center"
          >
            <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-400" />
            <h4 className="mt-3 text-base font-semibold text-white">
              Account created — launching your sandbox.
            </h4>
            <p className="mt-1.5 text-xs text-steel-200">
              Check your inbox for a magic link. The demo will be live for 7 days.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <Field
              label="Name"
              error={errors.name}
              input={
                <input
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                  placeholder="Jane Engineer"
                />
              }
            />
            <Field
              label="Work email"
              error={errors.email}
              input={
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="jane@company.com"
                />
              }
            />
            <Field
              label="Company"
              error={errors.company}
              input={
                <input
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputClass}
                  placeholder="Acme, Inc."
                />
              }
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create free account &amp; launch demo
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-steel-500">
              Free forever for sandbox access. No credit card. Single sign-on
              supported.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}

function BookCallCard() {
  const [form, setForm] = useState<CallForm>(initialCall);
  const [errors, setErrors] = useState<Partial<Record<keyof CallForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof CallForm>(k: K, v: CallForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateCall(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      track("form_error", { flow: "book_call", fields: Object.keys(errs).join(",") });
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      track("form_submit", { flow: "book_call", role: form.role, company: form.company });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-ring"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/5 text-steel-100 ring-1 ring-white/10">
          <CalendarClock className="h-5 w-5" />
        </div>
        <span className="text-[10px] uppercase tracking-wider font-medium text-steel-400">
          Skip the demo
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">
        Book a call with our SRE team
      </h3>
      <p className="mt-2 text-sm text-steel-300">
        Prefer a guided tour? 30 minutes with the engineers who built Archer.
        They&apos;ll walk through your stack and answer your toughest
        observability questions.
      </p>

      {done ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6 text-center"
        >
          <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-400" />
          <h4 className="mt-3 text-base font-semibold text-white">
            You&apos;re on the calendar.
          </h4>
          <p className="mt-1.5 text-xs text-steel-200">
            We&apos;ll send a calendar link within one business day with a short
            prep guide.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Name"
              error={errors.name}
              input={
                <input
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                  placeholder="Jane Engineer"
                />
              }
            />
            <Field
              label="Work email"
              error={errors.email}
              input={
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="jane@company.com"
                />
              }
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Company"
              error={errors.company}
              input={
                <input
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputClass}
                  placeholder="Acme, Inc."
                />
              }
            />
            <Field
              label="Role"
              error={errors.role}
              input={
                <select
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select…</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              }
            />
          </div>
          <Field
            label="What's your #1 incident response pain point?"
            error={errors.pain}
            input={
              <textarea
                rows={3}
                value={form.pain}
                onChange={(e) => update("pain", e.target.value)}
                className={inputClass}
                placeholder="e.g. Sev1s always escalate to the same 3 senior engineers at 2 AM…"
              />
            }
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-secondary w-full disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Booking…
              </>
            ) : (
              <>
                Book a call
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          <p className="text-[11px] text-steel-500 text-center">
            No spam — one email and one calendar invite.
          </p>
        </form>
      )}
    </motion.div>
  );
}

const inputClass =
  "w-full rounded-md border border-white/10 bg-ink-800/60 px-3 py-2 text-sm text-white placeholder:text-steel-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40";

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-steel-300">{label}</span>
      <div className="mt-1.5">{input}</div>
      {error ? (
        <span className="mt-1 inline-block text-[11px] text-rose-400">
          {error}
        </span>
      ) : null}
    </label>
  );
}
