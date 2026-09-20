import { defineHastPlugin } from "satteri";

export const satteriUnwrapImages = defineHastPlugin({
  name: "unwrap-images",
  element: {
    filter: ["p"],
    visit(node) {
      if (node.children.length !== 1) return;
      const only = node.children[0];
      if (only?.type === "element" && only.tagName === "img") {
        return only;
      }
      return;
    },
  },
});
