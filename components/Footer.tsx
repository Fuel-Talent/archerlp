"use client";

import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950/80">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-ink-950 font-black">
                A
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Archer<span className="text-steel-400">.sre</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-steel-400 max-w-md">
              Archer.sre is a product of{" "}
              <span className="text-steel-200 font-medium">FuelWorks AI</span>.
              Trusted in production by a Major Airline and a growing roster of
              regulated enterprises.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-steel-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              20+ years combined SRE experience · SOC 2 Type II (in progress)
            </div>
          </div>

          <FooterCol
            title="Product"
            links={[
              { href: "#solution", label: "How Archer works" },
              { href: "#proof", label: "Case studies" },
              { href: "#demo", label: "Instant demo access" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { href: "#", label: "Documentation" },
              { href: "#", label: "Security overview" },
              { href: "#", label: "Architecture diagrams" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "#", label: "Contact" },
              { href: "#", label: "Privacy policy" },
              { href: "#", label: "Terms" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-steel-500">
          <span>© {new Date().getFullYear()} Archer.sre · A product of FuelWorks AI</span>
          <span className="font-mono">deploy region: your-vpc · model weights: yours</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
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
