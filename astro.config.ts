import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import { remarkReadingTime } from "./src/utils/remarkReadingTime.ts"
import remarkUnwrapImages from "remark-unwrap-images"
import rehypeExternalLinks from "rehype-external-links"
import expressiveCode from "astro-expressive-code"
import webmanifest from "astro-webmanifest"
import robotsTxt from "astro-robots-txt"
import { expressiveCodeOptions } from "./src/site.config"
import icon from "astro-icon"
import { siteConfig } from "./src/site.config"
import fs from "fs"

// import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
  site: "https://lukaszleszko.dev",
  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    icon(),
    sitemap(),
    robotsTxt(),
    webmanifest({
      // See: https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md
      name: siteConfig.title,
      description: siteConfig.description,
      lang: siteConfig.lang,
      icon: "public/favicon/favicon.svg",
      icons: [
        {
          src: "favicon/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "favicon/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "favicon/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      start_url: "/",
      background_color: "#1d1f21",
      theme_color: "#2bbc8a",
      display: "standalone",
      config: {
        insertFaviconLinks: false,
        insertThemeColorMeta: false,
        insertManifestLink: false,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow, noopener, noreferrer"],
        },
      ],
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
    },
  },
  prefetch: true,
  output: "static",
  vite: {
    plugins: [rawFonts([".ttf"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  // adapter: vercel({
  // 	webAnalytics: { enabled: true }
  // })
})

function rawFonts(ext: Array<string>) {
  return {
    name: "vite-plugin-raw-fonts",
    // @ts-ignore:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id)
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        }
      }
    },
  }
}
