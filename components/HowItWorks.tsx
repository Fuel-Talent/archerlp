"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Icon } from "./icons";
import RichText from "./RichText";
import type { LandingContent } from "@/content/types";

export default function HowItWorks({
  content,
}: {
  content: LandingContent["howItWorks"];
}) {
  return (
    <AnimatedSection id="how" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-2xl">
          {content.eyebrow ? (
            <span className="eyebrow">{content.eyebrow}</span>
          ) : null}
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            <RichText value={content.headline} />
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card relative"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-steel-500">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-white leading-snug">
                <RichText value={s.title} />
              </h3>
              <p className="mt-2 text-sm text-steel-300 leading-relaxed">
                <RichText value={s.body} />
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
