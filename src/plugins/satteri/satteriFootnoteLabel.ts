import { defineHastPlugin } from "satteri";

export const satteriFootnoteLabel = defineHastPlugin({
  name: "footnote-label",
  element: {
    filter: ["h2"],
    visit(node, ctx) {
      if (node.properties?.id !== "footnote-label") return;
      ctx.setProperty(node, "className", [""]);
    },
  },
});
