import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { tribute, candleCount } from "./schemaTypes/tribute";

// The family's editing room, served from the memorial site at /studio.
export default defineConfig({
  name: "memorial",
  title: "Forever in our Heart",
  projectId: "9cuduk9w",
  dataset: "production",
  basePath: "/studio",
  schema: { types: [tribute, candleCount] },
  plugins: [
    structureTool({
      structure: S =>
        S.list().title("Tributes").items([
          S.listItem().title("Waiting for approval").id("waiting").child(
            S.documentList().title("Waiting for approval").apiVersion("2024-01-01")
              .filter('_type == "tribute" && _id in path("drafts.**")')
              .defaultOrdering([{ field: "createdAt", direction: "desc" }])
          ),
          S.listItem().title("All tributes").id("all").child(
            S.documentTypeList("tribute").title("All tributes").defaultOrdering([{ field: "createdAt", direction: "desc" }])
          ),
          S.divider(),
          S.documentTypeListItem("candleCount").title("Candles lit")
        ])
    })
  ]
});
