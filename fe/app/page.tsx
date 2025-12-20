import ImageWithFade from "@/app/components/ImageWithFade"
import { Metadata } from "next"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import { client, urlFor } from "@/lib/sanity"
import { homePageQuery } from "@/lib/queries"
import { HomePage } from "@/lib/types"
import ImageBlock from "@/app/components/ImageBlock"
import TextBlock from "@/app/components/TextBlock"
import HeroVideo from "@/app/components/HeroVideo"
import "@/app/components/EditorialGrid.css"

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
        <section className='relative h-screen w-full' style={{ zIndex: 0, isolation: 'isolate' }}>
          <ViewTransitionLink href='/shop' className='absolute inset-0' style={{ zIndex: 0 }}>
            {data.hero.video?.asset?.url ? (
              <HeroVideo
                videoUrl={data.hero.video.asset.url}
                posterUrl={data.hero.image ? urlFor(data.hero.image).url() : undefined}
              />
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
            <div className='absolute bottom-400 left-0 right-0 mx-auto px-400 md:px-500 pointer-events-none'>
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

      {/* Content Blocks */}
      {data.contentBlocks && data.contentBlocks.length > 0 && (
        <section className='pb-1000 pt-[80px] md:pt-[136px]'>
          <div className='editorial-grid'>
            {data.contentBlocks.map((block, index) => {
              switch (block._type) {
                case 'imageBlock':
                  return <ImageBlock key={index} block={block} />
                case 'textBlock':
                  return <TextBlock key={index} block={block} />
                default:
                  return null
              }
            })}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {data.featuredProducts && data.featuredProducts.length > 0 && (
        <section className='px-400 md:px-0 pb-1000'>
          <div className='max-w-[850px] mx-auto pt-1000'>
            <h2 className='mb-600 text-cutive font-cutive uppercase'>
              Featured Products
            </h2>

            {/* Mobile: Slider */}
            <div className='md:hidden -mx-400'>
              <div
                className='scrollbar-hide w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll whitespace-nowrap px-400'
                style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
              >
                {data.featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    className='mr-200 inline-block w-[80%] snap-start whitespace-normal last:mr-0'
                  >
                    <ViewTransitionLink
                      href={`/shop/${product.handle.current}`}
                      className='group block'
                    >
                      {/* Product Image */}
                      <div className='relative mb-200 aspect-[2/2.85] w-full overflow-hidden'>
                        {product.images && product.images[0] && (
                          <ImageWithFade
                            src={urlFor(product.images[0]).url()}
                            alt={product.images[0].alt || product.title}
                            fill
                            className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <h3 className='text-cutive font-cutive uppercase leading-none truncate'>
                        {product.title}
                      </h3>
                      <p className='text-cutive font-cutive'>
                        {product.price.toFixed(2)} PLN
                      </p>
                    </ViewTransitionLink>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Flex */}
            <div className='hidden md:flex gap-400'>
              {data.featuredProducts.map((product) => (
                <ViewTransitionLink
                  key={product._id}
                  href={`/shop/${product.handle.current}`}
                  className='group w-[140px]'
                >
                  {/* Product Image */}
                  <div className='relative aspect-[3/4] w-full overflow-hidden mb-200'>
                    {product.images && product.images[0] && (
                      <ImageWithFade
                        src={urlFor(product.images[0]).url()}
                        alt={product.images[0].alt || product.title}
                        fill
                        className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className='text-cutive font-cutive uppercase text-[10px] leading-tight truncate'>
                      {product.title}
                    </h3>
                    <p className='text-cutive font-cutive text-[10px]'>
                      {product.price.toFixed(2)} PLN
                    </p>
                  </div>
                </ViewTransitionLink>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
