import ImageWithFade from "@/app/components/ImageWithFade"
import { client } from "@/lib/sanity"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"

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

export default async function AboutPage() {
  const aboutData: AboutPage | null = await client.fetch(aboutPageQuery)

  if (!aboutData) {
    return (
      <div className='min-h-screen pt-[88px]'>
        <div className='mx-auto max-w-2xl px-400 pb-1000'>
          <p className='text-herbik-base'>About page content not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pt-[88px]'>
      <div className='mx-auto max-w-2xl px-400 pb-1000 md:max-w-[1400px]'>
        {/* Mobile: stacked, Desktop: 5-column grid (2 + 3) */}
        <div className='flex flex-col gap-400 md:grid md:grid-cols-5 md:gap-400'>
          {/* Left Column: Content (2 columns) */}
          <div className='md:col-span-2'>
            {/* Page Title */}
            <h1 className='mb-800 text-herbik-xl italic'>{aboutData.title}</h1>

            {/* Section Title */}
            <h2 className='mb-400 text-cutive font-cutive uppercase'>
              {aboutData.sectionTitle}
            </h2>

            {/* Content */}
            <div className='mb-800 space-y-400 text-herbik-sm'>
              <PortableText value={aboutData.content} />
            </div>

            {/* Contact Section */}
            <div className='mb-800'>
              <h3 className='mb-400 text-cutive font-cutive uppercase'>
                Contact
              </h3>
              <p className='text-herbik-base'>
                Email:{" "}
                <a
                  href={`mailto:${aboutData.contactEmail}`}
                  className='cursor-pointer'
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
                  className='cursor-pointer'
                >
                  @{aboutData.instagramHandle}
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Image (3 columns) */}
          {aboutData.image && (
            <div className='relative aspect-[3/4] w-full md:col-span-3 md:h-auto'>
              <ImageWithFade
                src={urlFor(aboutData.image).url()}
                alt={aboutData.image.alt || aboutData.title}
                fill
                className='object-cover'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
