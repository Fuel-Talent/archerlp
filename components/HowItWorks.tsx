"use client";

import { motion } from "framer-motion";
import { Boxes, BookOpen, Activity, Handshake } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    icon: Boxes,
    title: "Deploy Archer in your environment",
    body: "Container deployment to your AWS/Azure/GCP account. Connects to your existing observability tools via read-only credentials.",
  },
  {
    icon: BookOpen,
    title: "Archer learns your runbooks & wikis",
    body: "Custom RAG brain trained only on your documentation. No model training on your data, no external knowledge bleed.",
  },
  {
    icon: Activity,
    title: "Incidents trigger autonomous triage",
    body: "Real-time log analysis, causality mapping, and root cause isolation — within seconds of the first alert firing.",
  },
  {
    icon: Handshake,
    title: "Archer resolves or escalates with full context",
    body: "Takes action within your stated risk tolerances. Or hands off to humans with 90% of the investigation complete.",
  },
];

export default function HowItWorks() {
  return (
    <AnimatedSection id="how" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            From container to autonomous SRE in days, not quarters.
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card relative"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent ring-1 ring-accent/20">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-steel-500">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-white leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-steel-300 leading-relaxed">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
