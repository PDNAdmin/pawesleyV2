// Add to your Sanity Studio: import { tribute, candleCount } from "./tribute" and put both in schema.types.
export const tribute = {
  name: "tribute",
  title: "Tribute",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: r => r.required().min(2).max(80) },
    { name: "relation", title: "How they knew him", type: "string" },
    { name: "message", title: "Tribute", type: "text", rows: 8, validation: r => r.required().min(3).max(3000) },
    { name: "createdAt", title: "Written on", type: "datetime", readOnly: true },
    { name: "memorial", title: "Memorial", type: "string", readOnly: true, hidden: true }
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: { select: { title: "name", subtitle: "message" } }
};

export const candleCount = {
  name: "candleCount",
  title: "Candles lit",
  type: "document",
  fields: [
    { name: "count", title: "Candles lit", type: "number", readOnly: true },
    { name: "memorial", title: "Memorial", type: "string", readOnly: true, hidden: true }
  ],
  preview: { select: { count: "count" }, prepare: ({ count }) => ({ title: `${count || 0} candles lit` }) }
};
