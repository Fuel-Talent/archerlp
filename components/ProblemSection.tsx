"use client";

import { motion } from "framer-motion";
import { Terminal, AlertOctagon, Lock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const pains = [
  {
    icon: Terminal,
    title: "Your best engineers are glorified log parsers",
    body:
      "2–4 hours per incident spent gathering data across Grafana, Sumo Logic, AppDynamics, and Datadog — before anyone even starts solving the problem.",
  },
  {
    icon: AlertOctagon,
    title: "Every P1 escalates to the same 3 people",
    body:
      "Senior engineers pulled from strategic work for routine triage. Burnout climbs, roadmaps slip, and the bus factor stays at three.",
  },
  {
    icon: Lock,
    title: "Your SaaS AI tools can't touch production data",
    body:
      "Compliance, data sovereignty, and security teams block multi-tenant AI platforms. Your telemetry can't leave the VPC — and shouldn't.",
  },
];

export default function ProblemSection() {
  return (
    <AnimatedSection id="problem" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            The hidden cost of &lsquo;always-on&rsquo; engineering culture
          </h2>
          <p className="mt-4 text-steel-300">
            The tools to observe production have multiplied. The humans paid to
            interpret them haven&apos;t. Here&apos;s where the money is going.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent ring-1 ring-accent/20">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-steel-300 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
