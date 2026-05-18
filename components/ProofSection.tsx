"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { track } from "@/lib/analytics";

const metrics = [
  { value: "60%", label: "Reduction in Mean Time To Repair" },
  { value: "0", label: "Production incidents escalated to senior engineers in first 90 days" },
  { value: "100%", label: "Integration with existing Grafana, Sumo Logic, and AppDynamics stack" },
];

export default function ProofSection() {
  return (
    <AnimatedSection id="proof" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-12 items-center">
          <div>
            <span className="eyebrow">Proof</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              A Major Airline reduced MTTR by{" "}
              <span className="text-accent">60% in production.</span>
            </h2>
            <p className="mt-4 text-steel-300 max-w-xl">
              When the on-call rotation became the bottleneck for one of the
              world&apos;s most operationally complex airlines, Archer was
              deployed inside the existing observability stack — no telemetry
              ever left the boundary.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Full integration with Grafana, Sumo Logic, AppDynamics — no rip-and-replace",
                "Routine triage handled autonomously, with human-in-the-loop on Sev1 hand-offs",
                "Senior engineers returned to roadmap work within the first quarter",
              ].map((t) => (
                <div key={t} className="flex gap-2.5 text-sm text-steel-200">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <a
              href="#demo"
              onClick={() => track("secondary_cta_click", { location: "proof_case_study" })}
              className="btn-secondary mt-8"
            >
              Read the full case study
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card flex items-baseline gap-6"
              >
                <div className="text-5xl font-semibold tracking-tight text-white tabular-nums">
                  {m.value}
                </div>
                <div className="text-sm text-steel-300">{m.label}</div>
              </motion.div>
            ))}
            <div className="text-[11px] uppercase tracking-wider text-steel-500 text-right">
              Source: Major Airline pilot · Q1 2026
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
