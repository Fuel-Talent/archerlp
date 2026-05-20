"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import type { CellValue, LandingContent } from "@/content/types";

function Cell({ value }: { value: CellValue }) {
  if (value === "true") {
    return <Check className="h-5 w-5 text-emerald-400" />;
  }
  if (value === "false") {
    return <X className="h-5 w-5 text-rose-400" />;
  }
  return <span className="text-xs font-medium text-amber-300">Limited</span>;
}

export default function Differentiation({
  content,
}: {
  content: LandingContent["differentiation"];
}) {
  return (
    <AnimatedSection className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-3xl">
          {content.eyebrow ? (
            <span className="eyebrow">{content.eyebrow}</span>
          ) : null}
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            {content.headline}
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
              {content.leftCard.eyebrow}
            </div>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {content.leftCard.title}
            </h3>
            <p className="mt-2 text-sm text-steel-300">{content.leftCard.body}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="card border-accent/30 bg-accent/[0.04]"
          >
            <div className="text-xs uppercase tracking-wider text-accent-300">
              {content.rightCard.eyebrow}
            </div>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {content.rightCard.title}
            </h3>
            <p className="mt-2 text-sm text-steel-300">{content.rightCard.body}</p>
          </motion.div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <div className="grid grid-cols-[1.4fr,0.6fr,0.6fr] text-xs uppercase tracking-wider text-steel-400 border-b border-white/5">
            <div className="px-6 py-3">Capability</div>
            <div className="px-6 py-3 text-center">SaaS AI</div>
            <div className="px-6 py-3 text-center text-accent-300">Archer</div>
          </div>
          {content.rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.4fr,0.6fr,0.6fr] items-center text-sm ${
                i % 2 ? "bg-white/[0.015]" : ""
              }`}
            >
              <div className="px-6 py-4 text-steel-200">{r.label}</div>
              <div className="px-6 py-4 flex justify-center">
                <Cell value={r.saas} />
              </div>
              <div className="px-6 py-4 flex justify-center">
                <Cell value={r.archer} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
