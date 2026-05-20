"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TerminalDemo from "./TerminalDemo";
import { Icon } from "./icons";
import RichText from "./RichText";
import { track } from "@/lib/analytics";
import type { LandingContent } from "@/content/types";

export default function Hero({
  hero,
  terminal,
}: {
  hero: LandingContent["hero"];
  terminal: LandingContent["terminal"];
}) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 pb-16 sm:pb-24">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[600px] bg-grid-fade" />

      <div className="container-x relative grid lg:grid-cols-[1.05fr,1fr] gap-12 lg:gap-14 items-center">
        <div>
          {hero.eyebrow ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {hero.eyebrow}
            </motion.div>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]"
          >
            <RichText value={hero.headlinePre} />{" "}
            <span className="text-accent">
              <RichText value={hero.headlineAccent} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-lg text-steel-300 max-w-xl"
          >
            <RichText value={hero.sub} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={hero.primaryCta.href}
              onClick={() => track("cta_click", { location: "hero_primary" })}
              className="btn-primary"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={hero.secondaryCta.href}
              onClick={() => track("secondary_cta_click", { location: "hero_secondary" })}
              className="text-sm font-semibold text-steel-100 hover:text-white inline-flex items-center gap-1.5"
            >
              {hero.secondaryCta.label}
              <ArrowRight className="h-4 w-4 opacity-70" />
            </a>
          </motion.div>

          {hero.trustBadges?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-steel-400"
            >
              {hero.trustBadges.map((b) => (
                <div key={b.label} className="inline-flex items-center gap-2">
                  <Icon name={b.icon} className="h-4 w-4 text-steel-300" />
                  {b.label}
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>

        <div className="relative">
          <TerminalDemo content={terminal} />
          <div className="mt-4 flex items-center justify-between text-xs text-steel-500">
            <span>{hero.terminalCaption}</span>
            <span className="font-mono text-emerald-300">{hero.terminalStatus}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
