"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Icon } from "./icons";
import RichText from "./RichText";
import type { LandingContent } from "@/content/types";

export default function ProblemSection({
  content,
}: {
  content: LandingContent["problem"];
}) {
  return (
    <AnimatedSection id="problem" className="section-pad border-t border-white/5">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            <RichText value={content.headline} />
          </h2>
          <p className="mt-4 text-steel-300">
            <RichText value={content.sub} />
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icon name={p.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white leading-snug">
                <RichText value={p.title} />
              </h3>
              <p className="mt-2 text-sm text-steel-300 leading-relaxed">
                <RichText value={p.body} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
