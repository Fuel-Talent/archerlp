"use client";

import { ShieldCheck } from "lucide-react";
import RichText from "./RichText";
import type { LandingContent, NavLink } from "@/content/types";

export default function Footer({
  content,
  nav,
}: {
  content: LandingContent["footer"];
  nav: LandingContent["nav"];
}) {
  return (
    <footer className="border-t border-white/5 bg-ink-950/80">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-ink-950 font-black">
                {nav.logoText.charAt(0)}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {nav.logoText}
                <span className="text-steel-400">{nav.logoSubText}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-steel-400 max-w-md">
              <RichText value={content.blurb} />
            </p>
            {content.trustLine ? (
              <div className="mt-5 inline-flex items-center gap-2 text-xs text-steel-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {content.trustLine}
              </div>
            ) : null}
          </div>

          {content.columns.map((c) => (
            <FooterCol key={c.title} title={c.title} links={c.links} />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-steel-500">
          <span>© {new Date().getFullYear()} {content.copyright}</span>
          <span className="font-mono">{content.deployTag}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-wider text-steel-300">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-steel-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
