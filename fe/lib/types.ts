export interface SanityImage {
  asset: {
    _ref: string
    _type: string
    metadata?: {
      lqip?: string
    }
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
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

export interface ImageBlock {
  _type: 'imageBlock'
  title: string
  image: SanityImage
  buttonText: string
  linkType: 'url' | 'product' | 'collection'
  url?: string
  productReference?: {
    _type: 'reference'
    _ref: string
    handle: {
      current: string
    }
  }
  collectionReference?: {
    _type: 'reference'
    _ref: string
    slug: {
      current: string
    }
  }
  size: 'small' | 'medium' | 'large'
  alignment: 'default' | 'centered'
  orientation: 'portrait' | 'landscape'
  mobileAlignment: 'mobile-left' | 'mobile-right' | 'mobile-centered'
}

export interface TextBlock {
  _type: 'textBlock'
  content: string
}

export interface FeaturedCollectionBlock {
  _type: 'featuredCollectionBlock'
  title: string
  buttonText: string
  image: SanityImage
  collection: {
    _type: 'reference'
    _ref: string
    title: string
    slug: {
      current: string
    }
  }
  products: Product[]
}

export type EditorialBlock = ImageBlock | TextBlock

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
  contentBlocks?: EditorialBlock[]
  featuredProducts?: Product[]
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

export interface ContactInfo {
  contactEmail: string
  instagramHandle: string
}

export interface ProjectCategory {
  title: string
  slug: {
    current: string
  }
  count?: number
}

export interface ProjectImage {
  image: SanityImage
  caption?: string
  orientation: 'horizontal' | 'vertical'
}

export interface Project {
  _id: string
  title: string
  handle: {
    current: string
  }
  mainImage: SanityImage
  description?: string
  category: {
    title: string
    slug: {
      current: string
    }
  }
  date: string
  images?: ProjectImage[]
  credits?: string
}

export interface CollectionTextBlock {
  _type: 'collectionTextBlock'
  _key: string
  text: any[]
}

export interface CollectionImageBlock {
  _type: 'collectionImageBlock'
  _key: string
  image: SanityImage
  caption?: string
  linkedProduct?: {
    handle: {
      current: string
    }
  }
  size: 'small' | 'medium' | 'large'
  alignment: 'default' | 'centered'
  orientation: 'portrait' | 'landscape'
  mobileAlignment: 'mobile-left' | 'mobile-right' | 'mobile-centered'
}

export type CollectionContentBlock = CollectionTextBlock | CollectionImageBlock

export interface CollectionDetail {
  _id: string
  title: string
  description?: string
  slug: {
    current: string
  }
  products: Product[]
  contentBlocks?: CollectionContentBlock[]
  featuredProducts?: Product[]
}
