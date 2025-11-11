import Image from "next/image";
import {Metadata} from "next";
import {client, urlFor} from "@/lib/sanity";
import {homePageQuery} from "@/lib/queries";
import {HomePage} from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const data: HomePage = await client.fetch(homePageQuery);

  return {
    title: data?.seo?.metaTitle || "Sara Francuz",
    description: data?.seo?.metaDescription || "Designer Portfolio",
  };
}

export default async function Home() {
  const data: HomePage = await client.fetch(homePageQuery);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No content available. Please add content in Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {data.hero && data.hero.image && (
        <section className="relative h-screen w-full">
          <Image
            src={urlFor(data.hero.image).url()}
            alt={data.hero.alt || data.hero.image.alt || "Hero image"}
            fill
            className="object-cover"
            priority
          />
          {data.hero.linkUrl && data.hero.linkText && (
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={data.hero.linkUrl}
                className="bg-white px-8 py-4 text-lg font-medium text-black transition-all hover:bg-black hover:text-white"
              >
                {data.hero.linkText}
              </a>
            </div>
          )}
        </section>
      )}

      {/* Content Blocks */}
      {data.contentBlocks && data.contentBlocks.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {data.contentBlocks.map((block, index) => (
              <div key={index} className="group">
                {block.image && (
                  <div className="relative mb-4 aspect-square w-full overflow-hidden">
                    <Image
                      src={urlFor(block.image).url()}
                      alt={block.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="mb-2 text-xl font-semibold">{block.title}</h3>
                {block.description && (
                  <p className="mb-4 text-gray-600">{block.description}</p>
                )}
                {block.linkUrl && block.linkText && (
                  <a
                    href={block.linkUrl}
                    className="inline-block border border-black px-6 py-2 text-sm font-medium transition-all hover:bg-black hover:text-white"
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
  );
}
