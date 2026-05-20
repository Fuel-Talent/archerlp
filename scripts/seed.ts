/**
 * Seed Sanity with the current landing-page content from content/defaults.ts.
 *
 * Usage:
 *   npm run sanity:seed
 *
 * Requires the following env vars in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN        (created at sanity.io/manage → API → Tokens, Editor role)
 *
 * Safe to re-run: createOrReplace overwrites the single landingPage document.
 */

import { createClient } from "@sanity/client";
import { defaults } from "../content/defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_WRITE_TOKEN in .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

async function main() {
  const doc = {
    _id: "landingPage",
    _type: "landingPage",
    ...defaults,
  };
  const result = await client.createOrReplace(doc);
  console.log("Seeded landing page:", result._id);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
