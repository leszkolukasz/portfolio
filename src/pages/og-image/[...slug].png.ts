import RobotoMonoBold from "@/assets/fonts/roboto-mono-700.ttf"
import RobotoMono from "@/assets/fonts/roboto-mono-regular.ttf"
import { getAllPosts, getFormattedDate } from "@/utils"
import { Resvg } from "@resvg/resvg-js"
import type { APIContext, InferGetStaticPropsType } from "astro"
import satori, { type SatoriOptions } from "satori"
import { html } from "satori-html"
import { toBase64 } from "@/utils"

const ogOptions: SatoriOptions = {
  // debug: true,
  fonts: [
    {
      data: Buffer.from(RobotoMono),
      name: "Roboto Mono",
      style: "normal",
      weight: 400,
    },
    {
      data: Buffer.from(RobotoMonoBold),
      name: "Roboto Mono",
      style: "normal",
      weight: 700,
    },
  ],
  height: 630,
  width: 1200,
}

// TODO: fix polish characters
const markup = (title: string, pubDate: string) =>
  html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
    <div tw="flex flex-col flex-1 w-full p-10 justify-center">
      <p tw="text-2xl mb-6">${pubDate}</p>
      <h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
    </div>
    <div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
      <div tw="flex items-center">
        <img
          tw="w-12 h-12 rounded-full"
          src="${"data:image/png;base64," + toBase64("src/assets/profile.png")}"
          alt="Logo"
        />
      </div>
      <p>by Lukasz Leszko</p>
    </div>
  </div>`

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export async function GET(context: APIContext) {
  const { pubDate, title } = context.props as Props

  const postDate = getFormattedDate(pubDate, {
    month: "long",
    weekday: "long",
  })

  const svg = await satori(markup(title, postDate), ogOptions)
  const png = new Resvg(svg).render().asPng()
  return new Response(new Uint8Array(png), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  })
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return posts
    .filter(({ data }) => !data.ogImage)
    .map((post) => ({
      params: { slug: post.id },
      props: {
        // pubDate: post.data.updatedDate ?? post.data.publishDate,
        pubDate: post.data.publishDate,
        title: post.data.title,
      },
    }))
}
