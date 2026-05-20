// Project ID and dataset are public information (they appear in the studio
// URL and are inlined into any client bundle). Hard-coded as fallbacks so the
// hosted `sanity build` pipeline — which doesn't read Next's .env.local — can
// still resolve them. The Next.js side uses the env vars from .env.local /
// Vercel env so it stays configurable.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w1ikco9g";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
