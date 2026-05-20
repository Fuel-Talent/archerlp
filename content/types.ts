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

// Portable Text — rich text with italic and bold marks.
// Each block has _type, _key, style "normal", and a children array of spans.
// Spans carry the text and an optional marks[] of "em"/"strong".
export type RichTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks?: ("em" | "strong")[];
};

export type RichTextBlock = {
  _type: "block";
  _key: string;
  style: "normal";
  children: RichTextSpan[];
  markDefs?: never[];
};

export type RichText = RichTextBlock[];

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
    headlinePre: RichText;
    headlineAccent: RichText;
    sub: RichText;
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
    headline: RichText;
    sub: RichText;
    pains: { icon: IconKey; title: RichText; body: RichText }[];
  };
  agitate: {
    headline: RichText;
    sub: RichText;
    quotes: { body: RichText; who: string; org: string }[];
    stats: { icon: IconKey; value: string; label: RichText }[];
  };
  solution: {
    headline: RichText;
    sub: RichText;
    blocks: {
      icon: IconKey;
      title: RichText;
      // Each block (paragraph) in this rich text becomes one bullet.
      bullets: RichText;
      demoType: DemoType;
    }[];
  };
  proof: {
    headline: RichText;
    headlineAccent: RichText;
    sub: RichText;
    // Each block (paragraph) in this rich text becomes one bullet item.
    bullets: RichText;
    ctaLabel: string;
    metrics: { value: string; label: RichText }[];
    source: string;
  };
  howItWorks: {
    eyebrow: string;
    headline: RichText;
    steps: { icon: IconKey; title: RichText; body: RichText }[];
  };
  differentiation: {
    eyebrow: string;
    headline: RichText;
    leftCard: { eyebrow: string; title: RichText; body: RichText };
    rightCard: { eyebrow: string; title: RichText; body: RichText };
    rows: { label: RichText; saas: CellValue; archer: CellValue }[];
  };
  demo: {
    eyebrow: string;
    headline: RichText;
    sub: RichText;
    instantCard: {
      pillLabel: string;
      title: RichText;
      body: RichText;
      ctaLabel: string;
      ctaLoadingLabel: string;
      fineprint: string;
      successTitle: RichText;
      successBody: RichText;
      // Resend audience UUID — submissions append a contact to this list.
      audienceId: string;
      // Where to send the user after a successful submit (internal path
      // like "/welcome" or external URL like a Calendly link).
      redirectUrl: string;
    };
    bookCallCard: {
      pillLabel: string;
      title: RichText;
      body: RichText;
      ctaLabel: string;
      ctaLoadingLabel: string;
      fineprint: string;
      successTitle: RichText;
      successBody: RichText;
      roles: string[];
      audienceId: string;
      redirectUrl: string;
    };
  };
  stickyCta: {
    headline: RichText;
    sub: RichText;
    ctaLabel: string;
  };
  exitIntent: {
    eyebrow: string;
    headline: RichText;
    sub: RichText;
    videoPlaceholder: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    blurb: RichText;
    trustLine: string;
    columns: { title: string; links: NavLink[] }[];
    copyright: string;
    deployTag: string;
  };
};
