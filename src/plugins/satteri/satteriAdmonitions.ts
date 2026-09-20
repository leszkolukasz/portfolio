import { defineMdastPlugin } from "satteri";
import type { AdmonitionType } from "@/types";

const ADMONITIONS = new Set<AdmonitionType>(["tip", "note", "important", "caution", "warning"]);

function isAdmonition(value: string): value is AdmonitionType {
  return ADMONITIONS.has(value as AdmonitionType);
}

export const satteriAdmonitions = defineMdastPlugin({
  name: "admonitions",
  containerDirective(node, ctx) {
    const type = node.name;
    if (!isAdmonition(type)) return;

    let title: string = type;
    let titleChildren: unknown[] = [{ type: "text", value: type }];
    let content = [...node.children];

    const first = content[0];
    if (
      first?.type === "paragraph" &&
      first.data &&
      "directiveLabel" in first.data &&
      first.children.length > 0
    ) {
      titleChildren = [...first.children];
      title = ctx.textContent(first);
      content = content.slice(1);
    }

    return {
      type: "admonition",
      data: {
        hName: "aside",
        hProperties: {
          "aria-label": title,
          className: ["aside", `aside-${type}`],
        },
      },
      children: [
        {
          type: "admonition-title",
          data: {
            hName: "p",
            hProperties: { className: ["aside-title"], "aria-hidden": "true" },
          },
          children: titleChildren,
        },
        {
          type: "admonition-content",
          data: {
            hName: "div",
            hProperties: { className: ["aside-content"] },
          },
          children: content,
        },
      ],
    } as never;
  },
});
