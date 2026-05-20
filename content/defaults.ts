import type { LandingContent } from "./types";

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
    headlinePre:
      "Your team is spending hours on incidents that should take 20 minutes.",
    headlineAccent: "Archer fixes that — inside your VPC.",
    sub: "Autonomous AI SRE that triages, isolates root causes, and resolves incidents — without your production telemetry ever leaving your boundary. Free sandbox access in 60 seconds.",
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
    headline: "The hidden cost of 'always-on' engineering culture",
    sub: "The tools to observe production have multiplied. The humans paid to interpret them haven't. Here's where the money is going.",
    pains: [
      {
        icon: "Terminal",
        title: "Your best engineers are glorified log parsers",
        body: "2–4 hours per incident spent gathering data across Grafana, Sumo Logic, AppDynamics, and Datadog — before anyone even starts solving the problem.",
      },
      {
        icon: "AlertOctagon",
        title: "Every P1 escalates to the same 3 people",
        body: "Senior engineers pulled from strategic work for routine triage. Burnout climbs, roadmaps slip, and the bus factor stays at three.",
      },
      {
        icon: "Lock",
        title: "Your SaaS AI tools can't touch production data",
        body: "Compliance, data sovereignty, and security teams block multi-tenant AI platforms. Your telemetry can't leave the VPC — and shouldn't.",
      },
    ],
  },
  agitate: {
    headline: "And it's getting worse.",
    sub: "We hear the same story from CTOs across regulated industries and high-growth startups alike.",
    quotes: [
      {
        body: "We tried Datadog Bits AI, but our security team shut it down. We can't send production telemetry to a third-party SaaS.",
        who: "VP Engineering",
        org: "Fortune 500 Healthcare",
      },
      {
        body: "Our offshore team falls apart when incidents deviate from the runbook. Every Sev1 still escalates to the US team at 2 AM.",
        who: "SRE Director",
        org: "Enterprise Tech",
      },
      {
        body: "MTTR is dominated by data gathering, not problem-solving. We're drowning in observability tools but still flying blind.",
        who: "CTO",
        org: "Series C Startup",
      },
    ],
    stats: [
      { icon: "Clock", value: "67%", label: "of MTTR is spent gathering and correlating data — not fixing the problem." },
      { icon: "TrendingUp", value: "3–5×", label: "escalation rate for incidents that occur outside business hours." },
      { icon: "DollarSign", value: "$300K+", label: "average annual cost per senior SRE engineer spent on routine triage." },
    ],
  },
  solution: {
    headline: "Archer: the autonomous SRE that lives in your infrastructure.",
    sub: "Not another SaaS dashboard. A deployable AI agent that operates entirely within your cloud boundary — with full data sovereignty, zero vendor lock-in, and true autonomy.",
    blocks: [
      {
        icon: "Workflow",
        title: "Compresses 4 hours of data gathering to 15 minutes",
        bullets: [
          "Auto-correlates logs, metrics, and traces across your observability stack",
          "Identifies causality — not just timestamps",
          "Hands engineers a finished investigation, not a haystack",
        ],
        demoType: "correlation",
      },
      {
        icon: "Bot",
        title: "Handles incidents autonomously — no hand-holding",
        bullets: [
          "Maintains interaction memory of your team's risk tolerances",
          "Takes action without waiting for approval on routine fixes",
          "Escalates with 90% of the investigation already complete",
        ],
        demoType: "autoaction",
      },
      {
        icon: "ShieldCheck",
        title: "Deploy in your VPC. Own your data. Control your stack.",
        bullets: [
          "Runs entirely in your AWS / Azure / GCP environment",
          "GDPR, HIPAA, and FedRAMP ready out of the box",
          "Air-gappable for highest-security environments",
        ],
        demoType: "vpc",
      },
    ],
  },
  proof: {
    headline: "A Major Airline reduced MTTR by",
    headlineAccent: "60% in production.",
    sub: "When the on-call rotation became the bottleneck for one of the world's most operationally complex airlines, Archer was deployed inside the existing observability stack — no telemetry ever left the boundary.",
    bullets: [
      "Full integration with Grafana, Sumo Logic, AppDynamics — no rip-and-replace",
      "Routine triage handled autonomously, with human-in-the-loop on Sev1 hand-offs",
      "Senior engineers returned to roadmap work within the first quarter",
    ],
    ctaLabel: "Read the full case study",
    metrics: [
      { value: "60%", label: "Reduction in Mean Time To Repair" },
      { value: "0", label: "Production incidents escalated to senior engineers in first 90 days" },
      { value: "100%", label: "Integration with existing Grafana, Sumo Logic, and AppDynamics stack" },
    ],
    source: "Source: Major Airline pilot · Q1 2026",
  },
  howItWorks: {
    eyebrow: "How it works",
    headline: "From container to autonomous SRE in days, not quarters.",
    steps: [
      { icon: "Boxes", title: "Deploy Archer in your environment", body: "Container deployment to your AWS/Azure/GCP account. Connects to your existing observability tools via read-only credentials." },
      { icon: "BookOpen", title: "Archer learns your runbooks & wikis", body: "Custom RAG brain trained only on your documentation. No model training on your data, no external knowledge bleed." },
      { icon: "Activity", title: "Incidents trigger autonomous triage", body: "Real-time log analysis, causality mapping, and root cause isolation — within seconds of the first alert firing." },
      { icon: "Handshake", title: "Archer resolves or escalates with full context", body: "Takes action within your stated risk tolerances. Or hands off to humans with 90% of the investigation complete." },
    ],
  },
  differentiation: {
    eyebrow: "Why not SaaS?",
    headline:
      "Can your team use a multi-tenant SaaS AI tool that processes production telemetry outside your VPC?",
    leftCard: {
      eyebrow: "If yes →",
      title: "SaaS platforms are faster and cheaper.",
      body: "Datadog Bits AI or Cleric.ai are great options. We'll cheerfully tell you so — Archer is built for teams where SaaS isn't a viable path.",
    },
    rightCard: {
      eyebrow: "If no →",
      title:
        "Archer is the only path to autonomous SRE that meets your compliance and security requirements.",
      body: "Production telemetry never leaves your boundary. Your security team can audit the agent, the model weights, and every action it takes.",
    },
    rows: [
      { label: "Data stays inside your VPC", saas: "false", archer: "true" },
      { label: "Air-gappable / FedRAMP-ready deployment", saas: "false", archer: "true" },
      { label: "Trained only on your runbooks (no cross-tenant model)", saas: "false", archer: "true" },
      { label: "Acts autonomously within your risk tolerances", saas: "limited", archer: "true" },
      { label: "Integrates with Grafana, Sumo, AppDynamics, Datadog", saas: "true", archer: "true" },
      { label: "Can be deployed in any cloud environment (AWS / Azure / GCP / on-prem)", saas: "false", archer: "true" },
      { label: "No per-seat subscription required", saas: "false", archer: "true" },
    ],
  },
  demo: {
    eyebrow: "Try Archer",
    headline: "Two ways to get hands-on with Archer.",
    sub: "Most teams want to poke at it themselves. Some want a guided tour with our SRE engineers. Both take 30 minutes or less.",
    instantCard: {
      pillLabel: "Recommended",
      title: "Instant sandbox access",
      body: "Create a free account. Drop straight into a live sandbox where Archer is triaging a real incident. No sales call required.",
      ctaLabel: "Create free account & launch demo",
      ctaLoadingLabel: "Creating account…",
      fineprint:
        "Free forever for sandbox access. No credit card. Single sign-on supported.",
      successTitle: "Account created — launching your sandbox.",
      successBody:
        "Check your inbox for a magic link. The demo will be live for 7 days.",
    },
    bookCallCard: {
      pillLabel: "Skip the demo",
      title: "Book a call with our SRE team",
      body: "Prefer a guided tour? 30 minutes with the engineers who built Archer. They'll walk through your stack and answer your toughest observability questions.",
      ctaLabel: "Book a call",
      ctaLoadingLabel: "Booking…",
      fineprint: "No spam — one email and one calendar invite.",
      successTitle: "You're on the calendar.",
      successBody:
        "We'll send a calendar link within one business day with a short prep guide.",
      roles: [
        "CTO",
        "VP Engineering",
        "Director of SRE / Platform",
        "Engineering Manager",
        "Principal / Staff SRE",
        "Other",
      ],
    },
  },
  stickyCta: {
    headline: "Create a free account — instant sandbox access.",
    sub: "No calendar required · or book a call with our SRE team",
    ctaLabel: "Get instant access",
  },
  exitIntent: {
    eyebrow: "Before you go",
    headline: "Free account → instant demo in under a minute.",
    sub: "Skip the sales call. Create a free account and drop straight into a sandbox where Archer is triaging a real incident.",
    videoPlaceholder: "[ video placeholder · 1:54 ]",
    primaryCta: "Get instant access",
    secondaryCta: "Maybe later",
  },
  footer: {
    blurb:
      "Archer.sre is a product of FuelWorks AI. Trusted in production by a Major Airline and a growing roster of regulated enterprises.",
    trustLine:
      "20+ years combined SRE experience · SOC 2 Type II (in progress)",
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
