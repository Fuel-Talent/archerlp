"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp, Clock, DollarSign } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const quotes = [
  {
    body:
      "We tried Datadog Bits AI, but our security team shut it down. We can't send production telemetry to a third-party SaaS.",
    who: "VP Engineering",
    org: "Fortune 500 Healthcare",
  },
  {
    body:
      "Our offshore team falls apart when incidents deviate from the runbook. Every Sev1 still escalates to the US team at 2 AM.",
    who: "SRE Director",
    org: "Enterprise Tech",
  },
  {
    body:
      "MTTR is dominated by data gathering, not problem-solving. We're drowning in observability tools but still flying blind.",
    who: "CTO",
    org: "Series C Startup",
  },
];

const stats = [
  {
    icon: Clock,
    value: "67%",
    label: "of MTTR is spent gathering and correlating data — not fixing the problem.",
  },
  {
    icon: TrendingUp,
    value: "3–5×",
    label: "escalation rate for incidents that occur outside business hours.",
  },
  {
    icon: DollarSign,
    value: "$300K+",
    label: "average annual cost per senior SRE engineer spent on routine triage.",
  },
];

export default function AgitateSection() {
  return (
    <AnimatedSection className="section-pad border-t border-white/5 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            And it&apos;s getting worse.
          </h2>
          <p className="mt-4 text-steel-300">
            We hear the same story from CTOs across regulated industries and
            high-growth startups alike.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.who + q.org}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card flex flex-col"
            >
              <Quote className="h-5 w-5 text-accent" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-steel-100">
                &ldquo;{q.body}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-white/5 text-xs text-steel-400">
                <div className="font-semibold text-steel-200">{q.who}</div>
                <div>{q.org}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2">
          <div className="grid gap-px md:grid-cols-3 rounded-xl overflow-hidden bg-white/5">
            {stats.map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-ink-900/80 p-7"
              >
                <s.icon className="h-5 w-5 text-accent" />
                <div className="mt-3 text-4xl font-semibold tracking-tight text-white">
                  {s.value}
                </div>
                <p className="mt-2 text-sm text-steel-300 leading-relaxed">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
