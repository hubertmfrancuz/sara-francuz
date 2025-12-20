import {groq} from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    hero {
      video {
        asset-> {
          _id,
          url
        }
      },
      image {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
        hotspot,
        crop,
        alt
      },
      linkUrl,
      linkText,
      alt
    },
    contentBlocks[] {
      _type,
      _key,
      title,
      content,
      buttonText,
      linkType,
      url,
      image {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
        hotspot,
        crop,
        alt
      },
      productReference-> {
        handle
      },
      collectionReference-> {
        slug
      },
      size,
      alignment,
      orientation,
      mobileAlignment
    },
    featuredProducts[]-> {
      _id,
      title,
      handle,
      price,
      images[] {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
        alt
      }
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`

export const collectionsQuery = groq`
  *[_type == "collection"] | order(order asc) {
    title,
    slug
  }
`

export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    title,
    handle,
    price,
    images[] {
      asset-> {
        ...
      },
      alt
    },
    collection-> {
      title,
      slug
    }
  }
`

export const productsByCollectionQuery = groq`
  *[_type == "product" && collection->slug.current == $collectionSlug] | order(order asc) {
    _id,
    title,
    handle,
    price,
    images[] {
      asset-> {
        ...
      },
      alt
    },
    collection-> {
      title,
      slug
    }
  }
`

export const productQuery = groq`
  *[_type == "product" && handle.current == $handle][0] {
    _id,
    title,
    handle,
    price,
    images[] {
      asset-> {
        ...
      },
      alt
    },
    collection-> {
      title,
      slug
    },
    properties[] {
      title,
      content
    },
    description,
    careInstructions
  }
`

export const relatedProductsQuery = groq`
  *[_type == "product" && collection->slug.current == $collectionSlug && handle.current != $handle] | order(order asc) [0...4] {
    _id,
    title,
    handle,
    price,
    images[] {
      asset-> {
        ...
      },
      alt
    }
  }
`

export const collectionProductCountsQuery = groq`
  {
    "collections": *[_type == "collection"] | order(order asc) {
      title,
      slug,
      "count": count(*[_type == "product" && references(^._id)])
    }
  }
`

export const contactInfoQuery = groq`
  *[_type == "aboutPage"][0] {
    contactEmail,
    instagramHandle
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    handle,
    mainImage {
      asset-> {
        ...,
        metadata {
          lqip
        }
      },
      hotspot,
      crop,
      alt
    },
    category-> {
      title,
      slug
    },
    date
  }
`

export const projectCategoriesQuery = groq`
  {
    "categories": *[_type == "projectCategory"] | order(order asc) {
      title,
      slug,
      "count": count(*[_type == "project" && references(^._id)])
    }
  }
`

export const projectQuery = groq`
  *[_type == "project" && handle.current == $handle][0] {
    _id,
    title,
    handle,
    description,
    mainImage {
      asset-> {
        ...,
        metadata {
          lqip
        }
      },
      hotspot,
      crop,
      alt
    },
    category-> {
      title,
      slug
    },
    date,
    images[] {
      image {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
        hotspot,
        crop,
        alt
      },
      caption,
      orientation
    },
    credits
  }
`

export const relatedProjectsQuery = groq`
  *[_type == "project" && category->slug.current == $categorySlug && handle.current != $handle] | order(order asc) [0...4] {
    _id,
    title,
    handle,
    mainImage {
      asset-> {
        ...,
        metadata {
          lqip
        }
      },
      hotspot,
      crop,
      alt
    },
    category-> {
      title,
      slug
    },
    date
  }
`

export const collectionDetailQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    title,
    description,
    slug,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      title,
      handle,
      price,
      images[] {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
        alt
      }
    },
    contentBlocks[] {
      _type,
      _key,
      _type == 'collectionTextBlock' => {
        text
      },
      _type == 'collectionImageBlock' => {
        image {
          asset-> {
            ...
          },
          hotspot,
          crop,
          alt
        },
        caption,
        linkedProduct-> {
          handle
        },
        size,
        alignment,
        orientation,
        mobileAlignment
      }
    },
    featuredProducts[]-> {
      _id,
      title,
      handle,
      price,
      images[] {
        asset-> {
          ...,
          metadata {
            lqip
          }
        },
        alt
      }
    }
  }
`
