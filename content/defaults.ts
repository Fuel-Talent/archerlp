import type { LandingContent, RichText } from "./types";

// Monotonic counter for stable, unique _key values across all blocks in this
// file. Sanity requires _key on every array item; using a counter keeps the
// seed output deterministic.
let counter = 0;
const k = () => `k${(++counter).toString(36)}`;

// Helper: convert plain string to Portable Text (single block, single span,
// no marks). Use this for any field that started as a plain string and is
// being upgraded to rich text. Editors can later add italic/bold via the
// studio toolbar.
function pt(text: string): RichText {
  return [
    {
      _type: "block",
      _key: k(),
      style: "normal",
      children: [{ _type: "span", _key: k(), text }],
    },
  ];
}

// Helper for bullet lists: produces a single RichText (flat array of blocks),
// one block per bullet. Each block becomes one bullet at render time.
function ptList(...texts: string[]): RichText {
  return texts.map((text) => ({
    _type: "block" as const,
    _key: k(),
    style: "normal" as const,
    children: [{ _type: "span" as const, _key: k(), text }],
  }));
}

export const defaults: LandingContent = {
  meta: {
    title: "Archer — Autonomous SRE that lives in your infrastructure",
    description:
      "Archer.sre is an autonomous AI-powered SRE that triages incidents, isolates root causes, and resolves issues — entirely within your private cloud. Create a free account for instant sandbox access. A product of FuelWorks AI.",
  },
  nav: {
    logoText: "Archer",
    logoSubText: ".sre",
    links: [
      { href: "#problem", label: "Problem" },
      { href: "#solution", label: "Solution" },
      { href: "#proof", label: "Proof" },
      { href: "#how", label: "How it works" },
      { href: "#demo", label: "Demo" },
    ],
    ctaLabel: "Get instant access",
  },
  hero: {
    eyebrow: "Now deploying in private VPCs — Major Airline case study",
    headlinePre: pt(
      "Your team is spending hours on incidents that should take 20 minutes."
    ),
    headlineAccent: pt("Archer fixes that — inside your VPC."),
    sub: pt(
      "Autonomous AI SRE that triages, isolates root causes, and resolves incidents — without your production telemetry ever leaving your boundary. Free sandbox access in 60 seconds."
    ),
    primaryCta: { label: "Get instant demo access", href: "#demo" },
    secondaryCta: { label: "Or book a call with the SRE team", href: "#demo" },
    trustBadges: [
      { icon: "ShieldCheck", label: "SOC 2 Type II (in progress)" },
      { icon: "Lock", label: "HIPAA / GDPR / FedRAMP ready" },
      { icon: "Server", label: "Air-gappable deploy" },
    ],
    terminalCaption: "Simulated incident · INC-4821",
    terminalStatus: "MTTR ↓ 60% in prod",
  },
  terminal: {
    user: "archer@prod-vpc",
    path: "~/incidents",
    status: "live · in-vpc",
    script: [
      { kind: "prompt", text: "archer triage --incident INC-4821 --autonomous" },
      { kind: "out", tone: "muted", text: "[10:42:01] connected: grafana, sumologic, appdynamics, datadog" },
      { kind: "out", tone: "warn", text: "[10:42:03] detected: p95 latency on /checkout +312% over 5m baseline" },
      { kind: "out", tone: "info", text: "[10:42:04] correlating logs across 14 services… 1,247,932 lines" },
      { kind: "section", text: "▌ root cause analysis" },
      { kind: "out", tone: "info", text: "[10:42:07] tracing causality (not just timestamps)…" },
      { kind: "out", tone: "ok", text: "[10:42:11] candidate: deploy svc-orders rev a91f2d4 (12m ago)" },
      { kind: "out", tone: "info", text: "[10:42:11] db conn-pool exhaustion → new ORM query w/o index" },
      { kind: "out", tone: "info", text: "[10:42:12] confidence: 0.94 — runbook RB-318 matches risk tolerance" },
      { kind: "section", text: "▌ action" },
      { kind: "out", tone: "warn", text: "[10:42:13] proposing: rollback svc-orders → rev 4ef02c1" },
      { kind: "out", tone: "ok", text: "[10:42:14] policy: auto-approved (within blast radius < 0.5%)" },
      { kind: "out", tone: "ok", text: "[10:42:22] rollback complete — p95 returning to baseline" },
      { kind: "spacer" },
      { kind: "out", tone: "ok", text: "MTTR: 00:00:21  ·  data gathered autonomously  ·  0 humans paged" },
    ],
  },
  problem: {
    headline: pt("The hidden cost of 'always-on' engineering culture"),
    sub: pt(
      "The tools to observe production have multiplied. The humans paid to interpret them haven't. Here's where the money is going."
    ),
    pains: [
      {
        icon: "Terminal",
        title: pt("Your best engineers are glorified log parsers"),
        body: pt(
          "2–4 hours per incident spent gathering data across Grafana, Sumo Logic, AppDynamics, and Datadog — before anyone even starts solving the problem."
        ),
      },
      {
        icon: "AlertOctagon",
        title: pt("Every P1 escalates to the same 3 people"),
        body: pt(
          "Senior engineers pulled from strategic work for routine triage. Burnout climbs, roadmaps slip, and the bus factor stays at three."
        ),
      },
      {
        icon: "Lock",
        title: pt("Your SaaS AI tools can't touch production data"),
        body: pt(
          "Compliance, data sovereignty, and security teams block multi-tenant AI platforms. Your telemetry can't leave the VPC — and shouldn't."
        ),
      },
    ],
  },
  agitate: {
    headline: pt("And it's getting worse."),
    sub: pt(
      "We hear the same story from CTOs across regulated industries and high-growth startups alike."
    ),
    quotes: [
      {
        body: pt(
          "We tried Datadog Bits AI, but our security team shut it down. We can't send production telemetry to a third-party SaaS."
        ),
        who: "VP Engineering",
        org: "Fortune 500 Healthcare",
      },
      {
        body: pt(
          "Our offshore team falls apart when incidents deviate from the runbook. Every Sev1 still escalates to the US team at 2 AM."
        ),
        who: "SRE Director",
        org: "Enterprise Tech",
      },
      {
        body: pt(
          "MTTR is dominated by data gathering, not problem-solving. We're drowning in observability tools but still flying blind."
        ),
        who: "CTO",
        org: "Series C Startup",
      },
    ],
    stats: [
      {
        icon: "Clock",
        value: "67%",
        label: pt(
          "of MTTR is spent gathering and correlating data — not fixing the problem."
        ),
      },
      {
        icon: "TrendingUp",
        value: "3–5×",
        label: pt("escalation rate for incidents that occur outside business hours."),
      },
      {
        icon: "DollarSign",
        value: "$300K+",
        label: pt(
          "average annual cost per senior SRE engineer spent on routine triage."
        ),
      },
    ],
  },
  solution: {
    headline: pt("Archer: the autonomous SRE that lives in your infrastructure."),
    sub: pt(
      "Not another SaaS dashboard. A deployable AI agent that operates entirely within your cloud boundary — with full data sovereignty, zero vendor lock-in, and true autonomy."
    ),
    blocks: [
      {
        icon: "Workflow",
        title: pt("Compresses 4 hours of data gathering to 15 minutes"),
        bullets: ptList(
          "Auto-correlates logs, metrics, and traces across your observability stack",
          "Identifies causality — not just timestamps",
          "Hands engineers a finished investigation, not a haystack"
        ),
        demoType: "correlation",
      },
      {
        icon: "Bot",
        title: pt("Handles incidents autonomously — no hand-holding"),
        bullets: ptList(
          "Maintains interaction memory of your team's risk tolerances",
          "Takes action without waiting for approval on routine fixes",
          "Escalates with 90% of the investigation already complete"
        ),
        demoType: "autoaction",
      },
      {
        icon: "ShieldCheck",
        title: pt("Deploy in your VPC. Own your data. Control your stack."),
        bullets: ptList(
          "Runs entirely in your AWS / Azure / GCP environment",
          "GDPR, HIPAA, and FedRAMP ready out of the box",
          "Air-gappable for highest-security environments"
        ),
        demoType: "vpc",
      },
    ],
  },
  proof: {
    headline: pt("A Major Airline reduced MTTR by"),
    headlineAccent: pt("60% in production."),
    sub: pt(
      "When the on-call rotation became the bottleneck for one of the world's most operationally complex airlines, Archer was deployed inside the existing observability stack — no telemetry ever left the boundary."
    ),
    bullets: ptList(
      "Full integration with Grafana, Sumo Logic, AppDynamics — no rip-and-replace",
      "Routine triage handled autonomously, with human-in-the-loop on Sev1 hand-offs",
      "Senior engineers returned to roadmap work within the first quarter"
    ),
    ctaLabel: "Read the full case study",
    metrics: [
      { value: "60%", label: pt("Reduction in Mean Time To Repair") },
      { value: "0", label: pt("Production incidents escalated to senior engineers in first 90 days") },
      { value: "100%", label: pt("Integration with existing Grafana, Sumo Logic, and AppDynamics stack") },
    ],
    source: "Source: Major Airline pilot · Q1 2026",
  },
  howItWorks: {
    eyebrow: "How it works",
    headline: pt("From container to autonomous SRE in days, not quarters."),
    steps: [
      {
        icon: "Boxes",
        title: pt("Deploy Archer in your environment"),
        body: pt(
          "Container deployment to your AWS/Azure/GCP account. Connects to your existing observability tools via read-only credentials."
        ),
      },
      {
        icon: "BookOpen",
        title: pt("Archer learns your runbooks & wikis"),
        body: pt(
          "Custom RAG brain trained only on your documentation. No model training on your data, no external knowledge bleed."
        ),
      },
      {
        icon: "Activity",
        title: pt("Incidents trigger autonomous triage"),
        body: pt(
          "Real-time log analysis, causality mapping, and root cause isolation — within seconds of the first alert firing."
        ),
      },
      {
        icon: "Handshake",
        title: pt("Archer resolves or escalates with full context"),
        body: pt(
          "Takes action within your stated risk tolerances. Or hands off to humans with 90% of the investigation complete."
        ),
      },
    ],
  },
  differentiation: {
    eyebrow: "Why not SaaS?",
    headline: pt(
      "Can your team use a multi-tenant SaaS AI tool that processes production telemetry outside your VPC?"
    ),
    leftCard: {
      eyebrow: "If yes →",
      title: pt("SaaS platforms are faster and cheaper."),
      body: pt(
        "Datadog Bits AI or Cleric.ai are great options. We'll cheerfully tell you so — Archer is built for teams where SaaS isn't a viable path."
      ),
    },
    rightCard: {
      eyebrow: "If no →",
      title: pt(
        "Archer is the only path to autonomous SRE that meets your compliance and security requirements."
      ),
      body: pt(
        "Production telemetry never leaves your boundary. Your security team can audit the agent, the model weights, and every action it takes."
      ),
    },
    rows: [
      { label: pt("Data stays inside your VPC"), saas: "false", archer: "true" },
      { label: pt("Air-gappable / FedRAMP-ready deployment"), saas: "false", archer: "true" },
      { label: pt("Trained only on your runbooks (no cross-tenant model)"), saas: "false", archer: "true" },
      { label: pt("Acts autonomously within your risk tolerances"), saas: "limited", archer: "true" },
      { label: pt("Integrates with Grafana, Sumo, AppDynamics, Datadog"), saas: "true", archer: "true" },
      { label: pt("Can be deployed in any cloud environment (AWS / Azure / GCP / on-prem)"), saas: "false", archer: "true" },
      { label: pt("No per-seat subscription required"), saas: "false", archer: "true" },
    ],
  },
  demo: {
    eyebrow: "Try Archer",
    headline: pt("Two ways to get hands-on with Archer."),
    sub: pt(
      "Most teams want to poke at it themselves. Some want a guided tour with our SRE engineers. Both take 30 minutes or less."
    ),
    instantCard: {
      pillLabel: "Recommended",
      title: pt("Instant sandbox access"),
      body: pt(
        "Create a free account. Drop straight into a live sandbox where Archer is triaging a real incident. No sales call required."
      ),
      ctaLabel: "Create free account & launch demo",
      ctaLoadingLabel: "Creating account…",
      fineprint:
        "Free forever for sandbox access. No credit card. Single sign-on supported.",
      successTitle: pt("Account created — launching your sandbox."),
      successBody: pt(
        "Check your inbox for a magic link. The demo will be live for 7 days."
      ),
      audienceId: "",
      redirectUrl: "/welcome",
    },
    bookCallCard: {
      pillLabel: "Skip the demo",
      title: pt("Book a call with our SRE team"),
      body: pt(
        "Prefer a guided tour? 30 minutes with the engineers who built Archer. They'll walk through your stack and answer your toughest observability questions."
      ),
      ctaLabel: "Book a call",
      ctaLoadingLabel: "Booking…",
      fineprint: "No spam — one email and one calendar invite.",
      successTitle: pt("You're on the calendar."),
      successBody: pt(
        "We'll send a calendar link within one business day with a short prep guide."
      ),
      roles: [
        "CTO",
        "VP Engineering",
        "Director of SRE / Platform",
        "Engineering Manager",
        "Principal / Staff SRE",
        "Other",
      ],
      audienceId: "",
      redirectUrl: "/thank-you",
    },
  },
  stickyCta: {
    headline: pt("Create a free account — instant sandbox access."),
    sub: pt("No calendar required · or book a call with our SRE team"),
    ctaLabel: "Get instant access",
  },
  exitIntent: {
    eyebrow: "Before you go",
    headline: pt("Free account → instant demo in under a minute."),
    sub: pt(
      "Skip the sales call. Create a free account and drop straight into a sandbox where Archer is triaging a real incident."
    ),
    videoPlaceholder: "[ video placeholder · 1:54 ]",
    primaryCta: "Get instant access",
    secondaryCta: "Maybe later",
  },
  footer: {
    blurb: pt(
      "Archer.sre is a product of FuelWorks AI. Trusted in production by a Major Airline and a growing roster of regulated enterprises."
    ),
    trustLine: "20+ years combined SRE experience · SOC 2 Type II (in progress)",
    columns: [
      {
        title: "Product",
        links: [
          { href: "#solution", label: "How Archer works" },
          { href: "#proof", label: "Case studies" },
          { href: "#demo", label: "Instant demo access" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "#", label: "Documentation" },
          { href: "#", label: "Security overview" },
          { href: "#", label: "Architecture diagrams" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "#", label: "Contact" },
          { href: "#", label: "Privacy policy" },
          { href: "#", label: "Terms" },
        ],
      },
    ],
    copyright: "Archer.sre · A product of FuelWorks AI",
    deployTag: "deploy region: your-vpc · model weights: yours",
  },
};
