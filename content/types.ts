// Shared content types. Sanity schemas mirror this shape; React components consume it.
// Source of truth for both the studio editor and the rendered page.

export type IconKey =
  | "Terminal"
  | "AlertOctagon"
  | "Lock"
  | "Quote"
  | "TrendingUp"
  | "Clock"
  | "DollarSign"
  | "Workflow"
  | "Bot"
  | "ShieldCheck"
  | "Boxes"
  | "BookOpen"
  | "Activity"
  | "Handshake"
  | "Server"
  | "CheckCircle2"
  | "Sparkles"
  | "CalendarClock";

export type CtaLink = { label: string; href: string };

export type NavLink = { href: string; label: string };

export type TrustBadge = { icon: IconKey; label: string };

export type TerminalLine =
  | { kind: "prompt"; text: string }
  | { kind: "out"; text: string; tone?: "info" | "warn" | "err" | "ok" | "muted" }
  | { kind: "section"; text: string }
  | { kind: "spacer" };

export type DemoType = "correlation" | "autoaction" | "vpc";

export type CellValue = "true" | "false" | "limited";

export type LandingContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    logoText: string;
    logoSubText: string;
    links: NavLink[];
    ctaLabel: string;
  };
  hero: {
    eyebrow: string;
    headlinePre: string;
    headlineAccent: string;
    sub: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    trustBadges: TrustBadge[];
    terminalCaption: string;
    terminalStatus: string;
  };
  terminal: {
    user: string;
    path: string;
    status: string;
    script: TerminalLine[];
  };
  problem: {
    headline: string;
    sub: string;
    pains: { icon: IconKey; title: string; body: string }[];
  };
  agitate: {
    headline: string;
    sub: string;
    quotes: { body: string; who: string; org: string }[];
    stats: { icon: IconKey; value: string; label: string }[];
  };
  solution: {
    headline: string;
    sub: string;
    blocks: {
      icon: IconKey;
      title: string;
      bullets: string[];
      demoType: DemoType;
    }[];
  };
  proof: {
    headline: string;
    headlineAccent: string;
    sub: string;
    bullets: string[];
    ctaLabel: string;
    metrics: { value: string; label: string }[];
    source: string;
  };
  howItWorks: {
    eyebrow: string;
    headline: string;
    steps: { icon: IconKey; title: string; body: string }[];
  };
  differentiation: {
    eyebrow: string;
    headline: string;
    leftCard: { eyebrow: string; title: string; body: string };
    rightCard: { eyebrow: string; title: string; body: string };
    rows: { label: string; saas: CellValue; archer: CellValue }[];
  };
  demo: {
    eyebrow: string;
    headline: string;
    sub: string;
    instantCard: {
      pillLabel: string;
      title: string;
      body: string;
      ctaLabel: string;
      ctaLoadingLabel: string;
      fineprint: string;
      successTitle: string;
      successBody: string;
    };
    bookCallCard: {
      pillLabel: string;
      title: string;
      body: string;
      ctaLabel: string;
      ctaLoadingLabel: string;
      fineprint: string;
      successTitle: string;
      successBody: string;
      roles: string[];
    };
  };
  stickyCta: {
    headline: string;
    sub: string;
    ctaLabel: string;
  };
  exitIntent: {
    eyebrow: string;
    headline: string;
    sub: string;
    videoPlaceholder: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    blurb: string;
    trustLine: string;
    columns: { title: string; links: NavLink[] }[];
    copyright: string;
    deployTag: string;
  };
};
