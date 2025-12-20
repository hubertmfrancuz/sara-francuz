import ImageWithFade from "@/app/components/ImageWithFade"
import PageLayout from "@/app/components/PageLayout"
import { client } from "@/lib/sanity"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { Metadata } from "next"

interface AboutPage {
  title: string
  sectionTitle: string
  content: any[]
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  contactEmail: string
  instagramHandle: string
}

const aboutPageQuery = `*[_type == "aboutPage"][0] {
  title,
  sectionTitle,
  content,
  image {
    asset-> {
      ...
    },
    alt
  },
  contactEmail,
  instagramHandle
}`

// Revalidate every hour, or instantly via webhook
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const aboutData: AboutPage | null = await client.fetch(
    aboutPageQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['about-page'] }
    }
  )

  return {
    title: aboutData?.title ? `${aboutData.title} - Sara Francuz` : "About - Sara Francuz",
    description: "Object and spatial designer",
  }
}

export default async function AboutPage() {
  const aboutData: AboutPage | null = await client.fetch(
    aboutPageQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['about-page'] }
    }
  )

  if (!aboutData) {
    return (
      <div className='min-h-screen pt-[80px] md:pt-[104px] pb-1000 px-400 md:px-0'>
        <PageLayout pattern="centered-narrow">
          <p className='text-herbik-base'>About page content not found.</p>
        </PageLayout>
      </div>
    )
  }

  return (
    <div className='min-h-screen pt-[80px] md:pt-[104px] pb-1000 px-400 md:px-0'>
      <PageLayout pattern="centered-narrow">
        {/* Content */}
        <div className='mb-1000 text-herbik-base [&>p]:indent-900'>
          <PortableText value={aboutData.content} />
        </div>

        {/* Contact Section */}
        <div className='mb-1000 text-center leading-none'>
          <h3 className='mb-400 text-cutive font-cutive uppercase'>
            CONTACT
          </h3>
          <p className='text-herbik-base'>
            Email:{" "}
            <a
              href={`mailto:${aboutData.contactEmail}`}
              className='cursor-pointer hover:text-graphite-500 transition-colors'
            >
              {aboutData.contactEmail}
            </a>
          </p>
          <p className='text-herbik-base'>
            Instagram:{" "}
            <a
              href={`https://instagram.com/${aboutData.instagramHandle}`}
              target='_blank'
              rel='noopener noreferrer'
              className='cursor-pointer hover:text-graphite-500 transition-colors'
            >
              @{aboutData.instagramHandle}
            </a>
          </p>
        </div>

        {/* Image */}
        {aboutData.image && (
          <div className='flex flex-col place-items-center'>
            <div className='flex justify-start relative aspect-[3/4] w-full mb-200'>
              <ImageWithFade
                src={urlFor(aboutData.image).url()}
                alt={aboutData.image.alt || aboutData.title}
                fill
                className='object-cover'
              />
            </div>
            <p className='w-full text-left text-herbik-sm indent-6'>Photo by Emi</p>
          </div>
        )}
      </PageLayout>
    </div>
  )
}
