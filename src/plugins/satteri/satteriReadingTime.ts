import getReadingTime from "reading-time";
import { defineMdastPlugin } from "satteri";

export const satteriReadingTime = defineMdastPlugin({
  name: "reading-time",
  after(root, ctx) {
    const text = ctx.textContent(root);
    const readingTime = getReadingTime(text);
    const astro = ctx.data.astro;
    if (astro !== undefined) {
      astro.frontmatter.minutesRead = readingTime.text;
    }
  },
});
