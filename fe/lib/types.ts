export interface SanityImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

export interface SanityFile {
  asset: {
    _ref: string
    _type: string
    url?: string
  }
}

export interface Hero {
  video?: SanityFile
  image?: SanityImage
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

export interface FeaturedCollection {
  title: string
  linkUrl: string
  heroImage: SanityImage
  featuredProducts: Product[]
}

export interface HomePage {
  title: string
  hero?: Hero
  featuredCollection?: FeaturedCollection
  contentBlocks?: ContentBlock[]
  seo?: SEO
}

export interface Collection {
  title: string
  slug: {
    current: string
  }
  count?: number
}

export interface ProductProperty {
  title: string
  content: string
}

export interface Product {
  _id: string
  title: string
  handle: {
    current: string
  }
  price: number
  images: SanityImage[]
  collection: {
    title: string
    slug: {
      current: string
    }
  }
  properties?: ProductProperty[]
  description?: string
  careInstructions?: string
}
