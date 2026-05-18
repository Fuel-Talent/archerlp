"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "archer-exit-intent-shown";

export default function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem(STORAGE_KEY)) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setOpen(true);
        track("exit_intent_shown");
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  const close = () => {
    setOpen(false);
    track("exit_intent_dismissed");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 12, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-ink-900 p-7 shadow-ring"
          >
            <button
              onClick={close}
              aria-label="Dismiss"
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-steel-400 hover:text-white hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="eyebrow">Before you go</div>
            <h3 id="exit-intent-title" className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Free account → instant demo in under a minute.
            </h3>
            <p className="mt-2 text-sm text-steel-300">
              Skip the sales call. Create a free account and drop straight into a
              sandbox where Archer is triaging a real incident.
            </p>
            <div className="mt-5 aspect-video rounded-lg border border-white/10 bg-ink-800/60 grid place-items-center text-steel-500 text-xs font-mono">
              [ video placeholder · 1:54 ]
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#demo"
                onClick={() => {
                  track("cta_click", { location: "exit_intent" });
                  close();
                }}
                className="btn-primary"
              >
                Get instant access
                <ArrowRight className="h-4 w-4" />
              </a>
              <button onClick={close} className="btn-secondary">
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
