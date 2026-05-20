import { defineArrayMember, defineField, defineType } from "sanity";

const ICONS = [
  "Terminal", "AlertOctagon", "Lock", "Quote", "TrendingUp", "Clock", "DollarSign",
  "Workflow", "Bot", "ShieldCheck", "Boxes", "BookOpen", "Activity", "Handshake",
  "Server", "CheckCircle2", "Sparkles", "CalendarClock",
];

const iconField = defineField({
  name: "icon",
  title: "Icon",
  type: "string",
  options: { list: ICONS.map((v) => ({ title: v, value: v })) },
  validation: (r) => r.required(),
});

const ctaLink = defineField({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
});

const navLink = {
  type: "object" as const,
  name: "navLink",
  fields: [
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
};

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  groups: [
    { name: "meta", title: "Meta & nav" },
    { name: "hero", title: "Hero" },
    { name: "terminal", title: "Terminal demo" },
    { name: "problem", title: "Problem" },
    { name: "agitate", title: "Agitate" },
    { name: "solution", title: "Solution" },
    { name: "proof", title: "Proof" },
    { name: "how", title: "How it works" },
    { name: "diff", title: "Differentiation" },
    { name: "demo", title: "Demo CTA" },
    { name: "extra", title: "Sticky / exit intent" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // META
    defineField({
      name: "meta",
      title: "Page metadata",
      type: "object",
      group: "meta",
      fields: [
        defineField({ name: "title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
      ],
    }),

    // NAV
    defineField({
      name: "nav",
      title: "Navigation",
      type: "object",
      group: "meta",
      fields: [
        defineField({ name: "logoText", type: "string", validation: (r) => r.required() }),
        defineField({ name: "logoSubText", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "links",
          type: "array",
          of: [defineArrayMember(navLink)],
        }),
        defineField({ name: "ctaLabel", type: "string", validation: (r) => r.required() }),
      ],
    }),

    // HERO
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headlinePre", title: "Headline (main)", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({ name: "headlineAccent", title: "Headline (orange accent)", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({ name: "sub", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({ ...ctaLink, name: "primaryCta", title: "Primary CTA" }),
        defineField({ ...ctaLink, name: "secondaryCta", title: "Secondary CTA" }),
        defineField({
          name: "trustBadges",
          title: "Trust badges (below CTAs)",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [iconField, defineField({ name: "label", type: "string", validation: (r) => r.required() })],
              preview: { select: { title: "label", subtitle: "icon" } },
            }),
          ],
        }),
        defineField({ name: "terminalCaption", type: "string" }),
        defineField({ name: "terminalStatus", type: "string" }),
      ],
    }),

    // TERMINAL
    defineField({
      name: "terminal",
      title: "Terminal demo",
      type: "object",
      group: "terminal",
      fields: [
        defineField({ name: "user", type: "string", initialValue: "archer@prod-vpc" }),
        defineField({ name: "path", type: "string", initialValue: "~/incidents" }),
        defineField({ name: "status", type: "string", initialValue: "live · in-vpc" }),
        defineField({
          name: "script",
          title: "Script (lines, in order)",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "line",
              fields: [
                defineField({
                  name: "kind",
                  type: "string",
                  options: { list: ["prompt", "out", "section", "spacer"] },
                  initialValue: "out",
                  validation: (r) => r.required(),
                }),
                defineField({ name: "text", type: "string" }),
                defineField({
                  name: "tone",
                  type: "string",
                  options: { list: ["info", "warn", "err", "ok", "muted"] },
                  hidden: ({ parent }) => parent?.kind !== "out",
                }),
              ],
              preview: {
                select: { title: "text", subtitle: "kind", tone: "tone" },
                prepare: ({ title, subtitle, tone }) => ({
                  title: title || "(empty)",
                  subtitle: tone ? `${subtitle} · ${tone}` : subtitle,
                }),
              },
            }),
          ],
        }),
      ],
    }),

    // PROBLEM
    defineField({
      name: "problem",
      type: "object",
      group: "problem",
      fields: [
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({ name: "sub", type: "text", rows: 2 }),
        defineField({
          name: "pains",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                iconField,
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
              ],
              preview: { select: { title: "title", subtitle: "icon" } },
            }),
          ],
        }),
      ],
    }),

    // AGITATE
    defineField({
      name: "agitate",
      type: "object",
      group: "agitate",
      fields: [
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "sub", type: "text", rows: 2 }),
        defineField({
          name: "quotes",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "body", type: "text", rows: 4, validation: (r) => r.required() }),
                defineField({ name: "who", type: "string", validation: (r) => r.required() }),
                defineField({ name: "org", type: "string", validation: (r) => r.required() }),
              ],
              preview: { select: { title: "who", subtitle: "org" } },
            }),
          ],
        }),
        defineField({
          name: "stats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                iconField,
                defineField({ name: "value", type: "string", validation: (r) => r.required() }),
                defineField({ name: "label", type: "text", rows: 2, validation: (r) => r.required() }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
      ],
    }),

    // SOLUTION
    defineField({
      name: "solution",
      type: "object",
      group: "solution",
      fields: [
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({ name: "sub", type: "text", rows: 3 }),
        defineField({
          name: "blocks",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                iconField,
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "bullets",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (r) => r.min(1),
                }),
                defineField({
                  name: "demoType",
                  title: "Demo to render",
                  type: "string",
                  options: { list: ["correlation", "autoaction", "vpc"] },
                  validation: (r) => r.required(),
                }),
              ],
              preview: { select: { title: "title", subtitle: "demoType" } },
            }),
          ],
        }),
      ],
    }),

    // PROOF
    defineField({
      name: "proof",
      type: "object",
      group: "proof",
      fields: [
        defineField({ name: "headline", title: "Headline (lead-in)", type: "string" }),
        defineField({ name: "headlineAccent", title: "Headline (orange tail)", type: "string" }),
        defineField({ name: "sub", type: "text", rows: 3 }),
        defineField({
          name: "bullets",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "ctaLabel", type: "string" }),
        defineField({
          name: "metrics",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "value", type: "string", validation: (r) => r.required() }),
                defineField({ name: "label", type: "text", rows: 2, validation: (r) => r.required() }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
        defineField({ name: "source", type: "string" }),
      ],
    }),

    // HOW IT WORKS
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "object",
      group: "how",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                iconField,
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
              ],
              preview: { select: { title: "title", subtitle: "body" } },
            }),
          ],
        }),
      ],
    }),

    // DIFFERENTIATION
    defineField({
      name: "differentiation",
      type: "object",
      group: "diff",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({
          name: "leftCard",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
        }),
        defineField({
          name: "rightCard",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
        }),
        defineField({
          name: "rows",
          title: "Comparison rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "saas",
                  type: "string",
                  options: { list: ["true", "false", "limited"] },
                  initialValue: "false",
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "archer",
                  type: "string",
                  options: { list: ["true", "false", "limited"] },
                  initialValue: "true",
                  validation: (r) => r.required(),
                }),
              ],
              preview: {
                select: { title: "label", saas: "saas", archer: "archer" },
                prepare: ({ title, saas, archer }) => ({
                  title,
                  subtitle: `SaaS: ${saas}  ·  Archer: ${archer}`,
                }),
              },
            }),
          ],
        }),
      ],
    }),

    // DEMO
    defineField({
      name: "demo",
      title: "Demo CTA",
      type: "object",
      group: "demo",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({ name: "sub", type: "text", rows: 3 }),
        defineField({
          name: "instantCard",
          title: "Instant sandbox card",
          type: "object",
          fields: [
            defineField({ name: "pillLabel", type: "string", initialValue: "Recommended" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "ctaLabel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "ctaLoadingLabel", type: "string", initialValue: "Creating account…" }),
            defineField({ name: "fineprint", type: "text", rows: 2 }),
            defineField({ name: "successTitle", type: "string" }),
            defineField({ name: "successBody", type: "text", rows: 2 }),
          ],
        }),
        defineField({
          name: "bookCallCard",
          title: "Book-a-call card",
          type: "object",
          fields: [
            defineField({ name: "pillLabel", type: "string", initialValue: "Skip the demo" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "ctaLabel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "ctaLoadingLabel", type: "string", initialValue: "Booking…" }),
            defineField({ name: "fineprint", type: "text", rows: 2 }),
            defineField({ name: "successTitle", type: "string" }),
            defineField({ name: "successBody", type: "text", rows: 2 }),
            defineField({
              name: "roles",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (r) => r.min(1),
            }),
          ],
        }),
      ],
    }),

    // STICKY CTA + EXIT INTENT
    defineField({
      name: "stickyCta",
      title: "Sticky CTA bar",
      type: "object",
      group: "extra",
      fields: [
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({ name: "sub", type: "string" }),
        defineField({ name: "ctaLabel", type: "string", validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "exitIntent",
      title: "Exit-intent modal",
      type: "object",
      group: "extra",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({ name: "sub", type: "text", rows: 3 }),
        defineField({ name: "videoPlaceholder", type: "string", initialValue: "[ video placeholder · 1:54 ]" }),
        defineField({ name: "primaryCta", type: "string", validation: (r) => r.required() }),
        defineField({ name: "secondaryCta", type: "string", validation: (r) => r.required() }),
      ],
    }),

    // FOOTER
    defineField({
      name: "footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "blurb", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({ name: "trustLine", type: "string" }),
        defineField({
          name: "columns",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "links",
                  type: "array",
                  of: [defineArrayMember(navLink)],
                }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
        defineField({ name: "copyright", type: "string" }),
        defineField({ name: "deployTag", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Landing page" }),
  },
});
