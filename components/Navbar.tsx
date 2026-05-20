"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";
import type { LandingContent } from "@/content/types";

export default function Navbar({ content }: { content: LandingContent["nav"] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-white/5 bg-ink-950/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-ink-950 font-black">
            {content.logoText.charAt(0)}
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {content.logoText}
            <span className="text-steel-400">{content.logoSubText}</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {content.links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className="text-sm text-steel-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#demo"
          onClick={() => track("cta_click", { location: "navbar" })}
          className="btn-primary text-xs px-4 py-2"
        >
          {content.ctaLabel}
        </a>
      </div>
    </motion.header>
  );
}
