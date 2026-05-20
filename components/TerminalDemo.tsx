"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LandingContent, TerminalLine } from "@/content/types";

const toneClass: Record<NonNullable<Extract<TerminalLine, { kind: "out" }>["tone"]>, string> = {
  info: "text-steel-200",
  warn: "text-amber-300",
  err: "text-rose-400",
  ok: "text-emerald-300",
  muted: "text-steel-400",
};

export default function TerminalDemo({
  content,
}: {
  content: LandingContent["terminal"];
}) {
  const script = content.script;
  const [visible, setVisible] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const timer = useRef<number | null>(null);

  const promptText = useMemo(() => {
    const first = script[0];
    return first && first.kind === "prompt" ? first.text : "";
  }, [script]);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i <= promptText.length) {
        setTyped(promptText.slice(0, i));
        i++;
        timer.current = window.setTimeout(tick, 28);
      } else {
        setVisible(1);
        revealRest();
      }
    };
    const revealRest = () => {
      let n = 1;
      const next = () => {
        if (n >= script.length) return;
        n++;
        setVisible(n);
        timer.current = window.setTimeout(next, 380);
      };
      timer.current = window.setTimeout(next, 350);
    };
    tick();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [promptText, script.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="relative rounded-xl border border-white/10 bg-ink-900/80 shadow-ring overflow-hidden"
      aria-label="Archer triaging an incident in real time"
    >
      <div className="flex items-center justify-between border-b border-white/5 bg-ink-800/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="text-xs font-mono text-steel-400 select-none">
          {content.user} · {content.path}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-steel-500 font-medium">
          {content.status}
        </div>
      </div>
      <div className="p-5 font-mono text-[13px] leading-6 min-h-[360px]">
        <div>
          <span className="text-accent">$</span>{" "}
          <span className="text-white">{typed}</span>
          {visible < 1 && (
            <span className="ml-0.5 inline-block h-4 w-[7px] -mb-0.5 bg-accent animate-caret-blink align-middle" />
          )}
        </div>
        {script.slice(1, visible).map((line, idx) => {
          if (line.kind === "spacer") {
            return <div key={idx} className="h-3" />;
          }
          if (line.kind === "section") {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 mb-1 text-accent-300 text-xs uppercase tracking-wider"
              >
                {line.text}
              </motion.div>
            );
          }
          if (line.kind === "out") {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={toneClass[line.tone ?? "info"]}
              >
                {line.text}
              </motion.div>
            );
          }
          return null;
        })}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,26,0.08),transparent_60%)]" />
    </motion.div>
  );
}
