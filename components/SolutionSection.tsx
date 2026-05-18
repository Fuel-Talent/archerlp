"use client";

import { motion } from "framer-motion";
import { Workflow, Bot, ShieldCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm text-steel-200">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

function CorrelationDemo() {
  return (
    <div className="rounded-lg border border-white/10 bg-ink-900/70 p-4 font-mono text-xs">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-steel-400 text-[10px] uppercase tracking-wider">Manual · 4h 12m</div>
          <div className="mt-2 space-y-1">
            <div className="text-steel-500">› grep datadog…</div>
            <div className="text-steel-500">› cross-ref grafana…</div>
            <div className="text-steel-500">› pull traces…</div>
            <div className="text-steel-500">› ask oncall…</div>
            <div className="text-steel-500">› still gathering</div>
          </div>
        </div>
        <div>
          <div className="text-accent text-[10px] uppercase tracking-wider">Archer · 14m</div>
          <div className="mt-2 space-y-1">
            <div className="text-emerald-300">✓ logs correlated</div>
            <div className="text-emerald-300">✓ traces aligned</div>
            <div className="text-emerald-300">✓ causality mapped</div>
            <div className="text-emerald-300">✓ candidate found</div>
            <div className="text-white">→ root cause: a91f2d4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutoActionDemo() {
  return (
    <div className="rounded-lg border border-white/10 bg-ink-900/70 p-4 font-mono text-xs space-y-1">
      <div className="text-amber-300">⚠ db write latency +480%</div>
      <div className="text-steel-400">⟶ correlating with deploys (last 30m)</div>
      <div className="text-steel-200">⟶ match: svc-payments · rev 22c01f</div>
      <div className="text-emerald-300">policy: within blast radius (0.3%)</div>
      <div className="text-white">action: rollback (auto-approved)</div>
      <div className="text-emerald-300">✓ stable · 00:00:42</div>
    </div>
  );
}

function VpcDemo() {
  return (
    <div className="rounded-lg border border-white/10 bg-ink-900/70 p-4 text-xs">
      <div className="text-steel-400 text-[10px] uppercase tracking-wider">Your VPC</div>
      <div className="mt-3 rounded-md border border-dashed border-white/15 p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-steel-200">archer-agent</span>
          <span className="text-emerald-300 text-[10px]">in-boundary</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px] text-center">
          <div className="rounded bg-white/5 py-1.5 text-steel-300">logs</div>
          <div className="rounded bg-white/5 py-1.5 text-steel-300">metrics</div>
          <div className="rounded bg-white/5 py-1.5 text-steel-300">traces</div>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-steel-500 flex items-center justify-between">
        <span>⛔ no egress to vendor SaaS</span>
        <span>AWS · Azure · GCP</span>
      </div>
    </div>
  );
}

const blocks = [
  {
    icon: Workflow,
    title: "Compresses 4 hours of data gathering to 15 minutes",
    bullets: [
      "Auto-correlates logs, metrics, and traces across your observability stack",
      "Identifies causality — not just timestamps",
      "Hands engineers a finished investigation, not a haystack",
    ],
    demo: <CorrelationDemo />,
  },
  {
    icon: Bot,
    title: "Handles incidents autonomously — no hand-holding",
    bullets: [
      "Maintains interaction memory of your team's risk tolerances",
      "Takes action without waiting for approval on routine fixes",
      "Escalates with 90% of the investigation already complete",
    ],
    demo: <AutoActionDemo />,
  },
  {
    icon: ShieldCheck,
    title: "Deploy in your VPC. Own your data. Control your stack.",
    bullets: [
      "Runs entirely in your AWS / Azure / GCP environment",
      "GDPR, HIPAA, and FedRAMP ready out of the box",
      "Air-gappable for highest-security environments",
    ],
    demo: <VpcDemo />,
  },
];

export default function SolutionSection() {
  return (
    <AnimatedSection id="solution" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Archer: the autonomous SRE that lives in your infrastructure.
          </h2>
          <p className="mt-4 text-steel-300">
            Not another SaaS dashboard. A deployable AI agent that operates
            entirely within your cloud boundary — with full data sovereignty,
            zero vendor lock-in, and true autonomy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card flex flex-col"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent ring-1 ring-accent/20">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white leading-snug">
                {b.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {b.bullets.map((t) => (
                  <Bullet key={t}>{t}</Bullet>
                ))}
              </ul>
              <div className="mt-6">{b.demo}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
