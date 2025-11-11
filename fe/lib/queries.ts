import {groq} from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    hero {
      image {
        asset->,
        alt
      },
      linkUrl,
      linkText
    },
    contentBlocks[] {
      title,
      description,
      image {
        asset->,
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
