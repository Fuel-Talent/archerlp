import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "archer-lp",
  deployment: {
    appId: "lyjqogg7w268epr6sp02lhma",
    autoUpdates: true,
  },
});
