import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import fs from "fs";
import {
  satteriAdmonitions,
  satteriExternalLinks,
  satteriFootnoteLabel,
  satteriReadingTime,
  satteriUnwrapImages,
} from "./src/plugins";
import { expressiveCodeOptions } from "./src/site.config";

// https://astro.build/config
export default defineConfig({
  site: "https://lukasz.leszko.dev",
  integrations: [expressiveCode(expressiveCodeOptions), mdx(), icon(), sitemap()],
  markdown: {
    processor: satteri({
      features: { directive: true },
      mdastPlugins: [satteriReadingTime, satteriAdmonitions],
      hastPlugins: [satteriExternalLinks, satteriUnwrapImages, satteriFootnoteLabel],
    }),
  },
  compressHTML: "jsx",
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com", pathname: "leszkolukasz/**" },
      { protocol: "https", hostname: "lorempokemon.fakerapi.it", pathname: "pokemon/**" },
    ],
  },
  prefetch: true,
  output: "static",
  vite: {
    plugins: [tailwindcss(), rawFonts([".ttf"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

function rawFonts(ext: Array<string>) {
  return {
    name: "vite-plugin-raw-fonts",
    // @ts-expect-error:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
