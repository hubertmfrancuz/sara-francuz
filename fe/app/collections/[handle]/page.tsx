import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { CollectionDetail } from '@/lib/types'
import { collectionDetailQuery } from '@/lib/queries'
import CollectionClient from './CollectionClient'

interface CollectionPageProps {
  params: Promise<{
    handle: string
  }>
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
