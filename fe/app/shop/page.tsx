import {client} from '@/lib/sanity'
import {
  productsQuery,
  collectionProductCountsQuery,
} from '@/lib/queries'
import {Product} from '@/lib/types'
import ShopClient from './ShopClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Shop - Sara Francuz",
  description: "Browse our collection of unique designer products",
}

export default async function ShopPage() {
  // Fetch all products (no server-side filtering)
  const products: Product[] = await client.fetch(
    productsQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['products'] }
    }
  )

  // Fetch collections with product counts
  const {collections} = await client.fetch(
    collectionProductCountsQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['collections'] }
    }
  )

  return (
    <ShopClient
      products={products}
      collections={collections}
    />
  )
}
