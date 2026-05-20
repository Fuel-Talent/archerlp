import "server-only";
import type { LandingContent } from "@/content/types";
import { defaults } from "@/content/defaults";
import { landingPageQuery } from "./queries";

// Server-only fetcher. Returns Sanity content if env vars are set AND a document
// exists; otherwise returns the typed defaults so the site renders end-to-end
// even before Sanity is provisioned.
export async function fetchLandingContent(): Promise<LandingContent> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return defaults;
  }

  try {
    const { client } = await import("./client");
    const doc = await client.fetch<Partial<LandingContent> | null>(landingPageQuery, {}, {
      next: { revalidate: 60 },
    });
    if (!doc) return defaults;
    return mergeWithDefaults(doc);
  } catch (err) {
    console.error("[sanity] fetchLandingContent failed, falling back to defaults", err);
    return defaults;
  }
}

// Shallow per-section merge: if Sanity returns a section, use it whole; if
// missing, fall back to defaults. Lets you ship partial Sanity content without
// breaking the page.
function mergeWithDefaults(doc: Partial<LandingContent>): LandingContent {
  return {
    meta: doc.meta ?? defaults.meta,
    nav: doc.nav ?? defaults.nav,
    hero: doc.hero ?? defaults.hero,
    terminal: doc.terminal ?? defaults.terminal,
    problem: doc.problem ?? defaults.problem,
    agitate: doc.agitate ?? defaults.agitate,
    solution: doc.solution ?? defaults.solution,
    proof: doc.proof ?? defaults.proof,
    howItWorks: doc.howItWorks ?? defaults.howItWorks,
    differentiation: doc.differentiation ?? defaults.differentiation,
    demo: doc.demo ?? defaults.demo,
    stickyCta: doc.stickyCta ?? defaults.stickyCta,
    exitIntent: doc.exitIntent ?? defaults.exitIntent,
    footer: doc.footer ?? defaults.footer,
  };
}
