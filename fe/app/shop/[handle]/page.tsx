import {client} from '@/lib/sanity'
import {productQuery, relatedProductsQuery, productsQuery} from '@/lib/queries'
import {Product} from '@/lib/types'
import ProductClient from './ProductClient'
import {notFound} from 'next/navigation'
import { Metadata } from 'next'

// Revalidate every hour, or instantly via webhook
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{handle: string}>
}): Promise<Metadata> {
  const {handle} = await params
  const product: Product | null = await client.fetch(
    productQuery,
    { handle },
    {
      next: { revalidate: 3600, tags: ['product', `product-${handle}`] }
    }
  )

  if (!product) {
    return {
      title: "Product Not Found - Sara Francuz",
    }
  }

  return {
    title: `${product.title} - Sara Francuz`,
    description: product.description || `${product.title} by Sara Francuz. ${product.price.toFixed(2)} PLN`,
  }
}

// Generate static paths for all products at build time
export async function generateStaticParams() {
  const products: Product[] = await client.fetch(productsQuery)

  return products.map((product) => ({
    handle: product.handle.current,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{handle: string}>
}) {
  const {handle} = await params
  const product: Product | null = await client.fetch(
    productQuery,
    { handle },
    {
      next: { revalidate: 3600, tags: ['product', `product-${handle}`] }
    }
  )

  if (!product) {
    notFound()
  }

  // Fetch related products from the same collection
  const relatedProducts: Product[] = await client.fetch(
    relatedProductsQuery,
    {
      collectionSlug: product.collection?.slug.current,
      handle,
    },
    {
      next: { revalidate: 3600, tags: ['products'] }
    }
  )

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}
