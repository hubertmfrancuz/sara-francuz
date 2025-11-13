import {client} from '@/lib/sanity'
import {
  productsQuery,
  productsByCollectionQuery,
  collectionProductCountsQuery,
} from '@/lib/queries'
import {Product} from '@/lib/types'
import ShopClient from './ShopClient'

interface SearchParams {
  collection?: string
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const {collection: collectionSlug} = await searchParams

  // Fetch products (all or filtered by collection)
  const products: Product[] = collectionSlug
    ? await client.fetch(productsByCollectionQuery, {collectionSlug})
    : await client.fetch(productsQuery)

  // Fetch collections with product counts
  const {collections} = await client.fetch(collectionProductCountsQuery)

  return (
    <ShopClient
      products={products}
      collections={collections}
      selectedCollection={collectionSlug}
    />
  )
}
