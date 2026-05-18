"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Server } from "lucide-react";
import TerminalDemo from "./TerminalDemo";
import { track } from "@/lib/analytics";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 pb-16 sm:pb-24">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[600px] bg-grid-fade" />

      <div className="container-x relative grid lg:grid-cols-[1.05fr,1fr] gap-12 lg:gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Now deploying in private VPCs — Major Airline case study
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]"
          >
            Your team is spending hours on incidents that should take 20 minutes.{" "}
            <span className="text-accent">Archer fixes that — inside your VPC.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-lg text-steel-300 max-w-xl"
          >
            Autonomous AI SRE that triages, isolates root causes, and resolves
            incidents — without your production telemetry ever leaving your
            boundary. Free sandbox access in 60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#demo"
              onClick={() => track("cta_click", { location: "hero_primary" })}
              className="btn-primary"
            >
              Get instant demo access
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              onClick={() => track("secondary_cta_click", { location: "hero_secondary" })}
              className="text-sm font-semibold text-steel-100 hover:text-white inline-flex items-center gap-1.5"
            >
              Or book a call with the SRE team
              <ArrowRight className="h-4 w-4 opacity-70" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-steel-400"
          >
            <div className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> SOC 2 Type II (in progress)</div>
            <div className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-steel-300" /> HIPAA / GDPR / FedRAMP ready</div>
            <div className="inline-flex items-center gap-2"><Server className="h-4 w-4 text-steel-300" /> Air-gappable deploy</div>
          </motion.div>
        </div>

        <div className="relative">
          <TerminalDemo />
          <div className="mt-4 flex items-center justify-between text-xs text-steel-500">
            <span>Simulated incident · INC-4821</span>
            <span className="font-mono text-emerald-300">MTTR ↓ 60% in prod</span>
          </div>
        </div>
      </div>
    </section>
  );
}
