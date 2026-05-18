"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const rows = [
  { label: "Data stays inside your VPC", saas: false, archer: true },
  { label: "Air-gappable / FedRAMP-ready deployment", saas: false, archer: true },
  { label: "Trained only on your runbooks (no cross-tenant model)", saas: false, archer: true },
  { label: "Acts autonomously within your risk tolerances", saas: "limited", archer: true },
  { label: "Integrates with Grafana, Sumo, AppDynamics, Datadog", saas: true, archer: true },
  { label: "Can be deployed in any cloud environment (AWS / Azure / GCP / on-prem)", saas: false, archer: true },
  { label: "No per-seat subscription required", saas: false, archer: true },
];

function Cell({ value }: { value: true | false | "limited" }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-emerald-400" />;
  }
  if (value === false) {
    return <X className="h-5 w-5 text-rose-400" />;
  }
  return <span className="text-xs font-medium text-amber-300">Limited</span>;
}

export default function Differentiation() {
  return (
    <AnimatedSection className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Why not SaaS?</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Can your team use a multi-tenant SaaS AI tool that processes
            production telemetry outside your VPC?
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="text-xs uppercase tracking-wider text-steel-400">
              If yes →
            </div>
            <h3 className="mt-2 text-xl font-semibold text-white">
              SaaS platforms are faster and cheaper.
            </h3>
            <p className="mt-2 text-sm text-steel-300">
              Datadog Bits AI or Cleric.ai are great options. We&apos;ll cheerfully tell
              you so — Archer is built for teams where SaaS isn&apos;t a viable path.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="card border-accent/30 bg-accent/[0.04]"
          >
            <div className="text-xs uppercase tracking-wider text-accent-300">
              If no →
            </div>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Archer is the only path to autonomous SRE that meets your
              compliance and security requirements.
            </h3>
            <p className="mt-2 text-sm text-steel-300">
              Production telemetry never leaves your boundary. Your security
              team can audit the agent, the model weights, and every action it
              takes.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <div className="grid grid-cols-[1.4fr,0.6fr,0.6fr] text-xs uppercase tracking-wider text-steel-400 border-b border-white/5">
            <div className="px-6 py-3">Capability</div>
            <div className="px-6 py-3 text-center">SaaS AI</div>
            <div className="px-6 py-3 text-center text-accent-300">Archer</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.4fr,0.6fr,0.6fr] items-center text-sm ${
                i % 2 ? "bg-white/[0.015]" : ""
              }`}
            >
              <div className="px-6 py-4 text-steel-200">{r.label}</div>
              <div className="px-6 py-4 flex justify-center">
                <Cell value={r.saas as true | false | "limited"} />
              </div>
              <div className="px-6 py-4 flex justify-center">
                <Cell value={r.archer as true | false | "limited"} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
