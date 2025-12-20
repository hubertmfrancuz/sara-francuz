import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { CollectionDetail } from '@/lib/types'
import { collectionDetailQuery } from '@/lib/queries'
import CollectionClient from './CollectionClient'
import { Metadata } from 'next'

interface CollectionPageProps {
  params: Promise<{
    handle: string
  }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params

  const collectionDetail: CollectionDetail | null = await client.fetch(
    collectionDetailQuery,
    { slug: handle },
    {
      next: { revalidate: 3600, tags: ['collection-detail'] }
    }
  )

  if (!collectionDetail) {
    return {
      title: "Collection Not Found - Sara Francuz",
    }
  }

  const productCount = collectionDetail.products?.length || 0

  return {
    title: `${collectionDetail.title} Collection - Sara Francuz`,
    description: `Browse the ${collectionDetail.title} collection featuring ${productCount} unique ${productCount === 1 ? 'product' : 'products'}`,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params

  const collectionDetail: CollectionDetail | null = await client.fetch(
    collectionDetailQuery,
    { slug: handle },
    {
      next: { revalidate: 3600, tags: ['collection-detail'] }
    }
  )

  if (!collectionDetail) {
    notFound()
  }

  return <CollectionClient collectionDetail={collectionDetail} />
}
