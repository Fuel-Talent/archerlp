"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

const DEPTHS = [25, 50, 75, 100];

export default function StickyCTA() {
  const [show, setShow] = useState(false);
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const winH = window.innerHeight;
      const docH = doc.scrollHeight - winH;
      const pct = docH > 0 ? Math.min(100, Math.round((scrollTop / docH) * 100)) : 0;

      setShow(scrollTop > winH * 0.7 && pct < 95);

      for (const d of DEPTHS) {
        if (pct >= d && !fired.current.has(d)) {
          fired.current.add(d);
          track("scroll_depth", { depth: d });
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
        >
          <div className="container-x pb-4 pointer-events-auto">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-ink-900/95 backdrop-blur-md px-5 py-3 shadow-ring">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  Create a free account — instant sandbox access.
                </div>
                <div className="text-xs text-steel-400 truncate">
                  No calendar required · or book a call with our SRE team
                </div>
              </div>
              <a
                href="#demo"
                onClick={() => track("cta_click", { location: "sticky_bar" })}
                className="btn-primary text-xs px-4 py-2 whitespace-nowrap"
              >
                Get instant access
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
