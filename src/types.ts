export type SiteConfig = {
  author: string
  title: string
  description: string
  lang: string
  ogLocale: string
  date: {
    locale: string | string[] | undefined
    options: Intl.DateTimeFormatOptions
  }
}

export type PaginationLink = {
  url: string
  text?: string
  srLabel?: string
}

export type SiteMeta = {
  title: string
  description?: string
  ogImage?: string | undefined
  articleDate?: string | undefined
}

export type Skill = {
  title: string
  icon: string
  color?: string
}

export type Project = {
  title: string
  description: string
  href: string
  skills: Skill[]
  image?: ImageMetadata | string
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning"
