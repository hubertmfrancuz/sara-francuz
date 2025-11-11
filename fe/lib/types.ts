export interface SanityImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

export interface Hero {
  image: SanityImage
  linkUrl?: string
  linkText?: string
  alt?: string
}

export interface ContentBlock {
  title: string
  description?: string
  image?: SanityImage
  linkUrl?: string
  linkText?: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
}

export interface HomePage {
  title: string
  hero?: Hero
  contentBlocks?: ContentBlock[]
  seo?: SEO
}

export interface Collection {
  title: string
  slug: {
    current: string
  }
}
