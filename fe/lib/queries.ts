import {groq} from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    hero {
      image {
        asset-> {
          ...
        },
        alt
      },
      linkUrl,
      linkText
    },
    contentBlocks[] {
      title,
      description,
      image {
        asset-> {
          ...
        },
      },
      linkUrl,
      linkText
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
    description
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
