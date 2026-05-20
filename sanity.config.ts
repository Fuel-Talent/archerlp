import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";

export default defineConfig({
  name: "archer-lp",
  title: "Archer Landing Page",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Site content")
          .items([
            S.listItem()
              .title("Landing page")
              .id("singleton-landingPage")
              .child(
                S.editor()
                  .id("landingPageEditor")
                  .schemaType("landingPage")
                  .documentId("landingPage")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
