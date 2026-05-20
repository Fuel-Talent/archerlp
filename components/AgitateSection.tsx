"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Icon } from "./icons";
import RichText from "./RichText";
import type { LandingContent } from "@/content/types";

export default function AgitateSection({
  content,
}: {
  content: LandingContent["agitate"];
}) {
  return (
    <AnimatedSection className="section-pad border-t border-white/5 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
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
          {content.quotes.map((q, i) => (
            <motion.figure
              key={q.who + q.org}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card flex flex-col"
            >
              <Icon name="Quote" className="h-5 w-5 text-accent" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-steel-100">
                &ldquo;<RichText value={q.body} />&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-white/5 text-xs text-steel-400">
                <div className="font-semibold text-steel-200">{q.who}</div>
                <div>{q.org}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2">
          <div className="grid gap-px md:grid-cols-3 rounded-xl overflow-hidden bg-white/5">
            {content.stats.map((s, i) => (
              <motion.div
                key={s.value + i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-ink-900/80 p-7"
              >
                <Icon name={s.icon} className="h-5 w-5 text-accent" />
                <div className="mt-3 text-4xl font-semibold tracking-tight text-white">
                  {s.value}
                </div>
                <p className="mt-2 text-sm text-steel-300 leading-relaxed">
                  <RichText value={s.label} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
