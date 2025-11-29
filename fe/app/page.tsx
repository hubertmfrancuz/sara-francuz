import ImageWithFade from "@/app/components/ImageWithFade"
import { Metadata } from "next"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import { client, urlFor } from "@/lib/sanity"
import { homePageQuery } from "@/lib/queries"
import { HomePage } from "@/lib/types"

// Revalidate every hour, or instantly via webhook
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data: HomePage = await client.fetch(
    homePageQuery,
    {},
    {
      next: { revalidate: 3600, tags: ["home-page"] },
    }
  )

  return {
    title: data?.seo?.metaTitle || "Sara Francuz",
    description: data?.seo?.metaDescription || "Designer Portfolio",
  }
}

export default async function Home() {
  const data: HomePage = await client.fetch(
    homePageQuery,
    {},
    {
      next: { revalidate: 3600, tags: ["home-page"] },
    }
  )

  if (!data) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p>No content available. Please add content in Sanity Studio.</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      {data.hero && (data.hero.video || data.hero.image) && (
        <section className='relative h-screen w-full'>
          <ViewTransitionLink href='/shop' className='absolute inset-0'>
            {data.hero.video?.asset?.url ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={
                  data.hero.image ? urlFor(data.hero.image).url() : undefined
                }
                className='h-full w-full object-cover'
              >
                <source src={data.hero.video.asset.url} type='video/mp4' />
              </video>
            ) : data.hero.image ? (
              <ImageWithFade
                src={urlFor(data.hero.image).url()}
                alt={data.hero.alt || data.hero.image.alt || "Hero image"}
                fill
                className='object-cover'
                priority
              />
            ) : null}
          </ViewTransitionLink>
          {data.hero.linkUrl && data.hero.linkText && (
            <div className='absolute bottom-400 left-0 right-0 mx-auto max-w-2xl md:max-w-[1400px] px-400 pointer-events-none'>
              <div className='border-l border-graphite-100 flex items-center'>
                <ViewTransitionLink
                  href='/shop'
                  className='pl-200 text-xl italic text-white transition-all hover:text-graphite-300 pointer-events-auto'
                >
                  {data.hero.linkText}
                </ViewTransitionLink>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Featured Collection Section */}
      {data.featuredCollection && (
        <section className='mx-auto max-w-2xl md:max-w-[1400px] px-400 py-24'>
          {/* Section Title/Link */}
          <div className='mb-400 flex items-center gap-200'>
            <div className='h-200 w-px bg-graphite-900' />
            <ViewTransitionLink
              href={data.featuredCollection.linkUrl}
              className='text-cutive font-cutive uppercase hover:text-graphite-500 transition-colors'
            >
              {data.featuredCollection.title}
            </ViewTransitionLink>
          </div>

          {/* Hero Image */}
          {data.featuredCollection.heroImage && (
            <div className='relative mb-400 aspect-[16/9] w-full overflow-hidden'>
              <ImageWithFade
                src={urlFor(data.featuredCollection.heroImage).url()}
                alt={
                  data.featuredCollection.heroImage.alt ||
                  data.featuredCollection.title
                }
                fill
                className='object-cover'
              />
            </div>
          )}

          {/* Product Grid */}
          {data.featuredCollection.featuredProducts &&
            data.featuredCollection.featuredProducts.length > 0 && (
              <div className='grid grid-cols-4 gap-200 md:gap-400 md:grid-cols-8'>
                {data.featuredCollection.featuredProducts.map(product => (
                  <ViewTransitionLink
                    key={product._id}
                    href={`/shop/${product.handle.current}`}
                    className='group'
                  >
                    {/* Product Image */}
                    <div className='relative mb-200 aspect-3/4 w-full overflow-hidden bg-gray-200'>
                      {product.images && product.images[0] && (
                        <ImageWithFade
                          src={urlFor(product.images[0]).url()}
                          alt={product.images[0].alt || product.title}
                          fill
                          className='object-cover transition-transform duration-300'
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <h3 className='text-cutive font-cutive uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      {product.title}
                    </h3>
                    <p className='text-cutive font-cutive opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      {product.price.toFixed(2)} PLN
                    </p>
                  </ViewTransitionLink>
                ))}
              </div>
            )}
        </section>
      )}

      {/* Content Blocks */}
      {data.contentBlocks && data.contentBlocks.length > 0 && (
        <section className='mx-auto max-w-2xl md:max-w-[1400px] px-400 py-24'>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
            {data.contentBlocks.map((block, index) => (
              <div key={index} className='group'>
                {block.image && (
                  <div className='relative mb-4 aspect-square w-full overflow-hidden'>
                    <ImageWithFade
                      src={urlFor(block.image).url()}
                      alt={block.title}
                      fill
                      className='object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                )}
                <h3 className='mb-2 text-xl'>{block.title}</h3>
                {block.description && (
                  <p className='mb-4'>{block.description}</p>
                )}
                {block.linkUrl && block.linkText && (
                  <a
                    href={block.linkUrl}
                    className='inline-block border border-black px-400 py-2 text-sm transition-all hover:bg-black hover:text-white'
                  >
                    {block.linkText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
