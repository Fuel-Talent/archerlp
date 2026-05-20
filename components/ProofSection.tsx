"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Icon } from "./icons";
import RichText from "./RichText";
import { track } from "@/lib/analytics";
import type { LandingContent } from "@/content/types";

export default function ProofSection({
  content,
}: {
  content: LandingContent["proof"];
}) {
  return (
    <AnimatedSection id="proof" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              <RichText value={content.headline} />{" "}
              <span className="text-accent">
                <RichText value={content.headlineAccent} />
              </span>
            </h2>
            <p className="mt-4 text-steel-300 max-w-xl">
              <RichText value={content.sub} />
            </p>

            <div className="mt-8 space-y-3">
              {content.bullets.map((block, i) => (
                <div key={block._key ?? i} className="flex gap-2.5 text-sm text-steel-200">
                  <Icon name="CheckCircle2" className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <RichText value={[block]} />
                  </span>
                </div>
              ))}
            </div>

            {content.ctaLabel ? (
              <a
                href="#demo"
                onClick={() => track("secondary_cta_click", { location: "proof_case_study" })}
                className="btn-secondary mt-8"
              >
                {content.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>

          <div className="grid gap-4">
            {content.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card flex items-baseline gap-6"
              >
                <div className="text-5xl font-semibold tracking-tight text-white tabular-nums">
                  {m.value}
                </div>
                <div className="text-sm text-steel-300">
                  <RichText value={m.label} />
                </div>
              </motion.div>
            ))}
            {content.source ? (
              <div className="text-[11px] uppercase tracking-wider text-steel-500 text-right">
                {content.source}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
