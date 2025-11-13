import {client} from '@/lib/sanity'
import {productQuery, relatedProductsQuery} from '@/lib/queries'
import {Product} from '@/lib/types'
import ProductClient from './ProductClient'
import {notFound} from 'next/navigation'

export default async function ProductPage({
  params,
}: {
  params: Promise<{handle: string}>
}) {
  const {handle} = await params
  const product: Product | null = await client.fetch(productQuery, {
    handle,
  })

  if (!product) {
    notFound()
  }

  // Fetch related products from the same collection
  const relatedProducts: Product[] = await client.fetch(relatedProductsQuery, {
    collectionSlug: product.collection?.slug.current,
    handle,
  })

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}
