import { CartItem } from '../app/context/CartContext'
import { ShopifyCartCreateResponse } from './types'

export async function createShopifyCart(items: CartItem[]): Promise<string> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

  if (!domain || !token) {
    throw new Error('Shopify store domain or storefront token is not configured.')
  }

  const lines = items
    .filter(item => item.shopifyVariantId)
    .map(item => ({
      quantity: item.quantity,
      merchandiseId: item.shopifyVariantId,
    }))

  if (lines.length === 0) {
    throw new Error('None of the cart items have a Shopify variant ID configured.')
  }

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const response = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables: { input: { lines } } }),
    }
  )

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
  }

  const data: ShopifyCartCreateResponse = await response.json()

  if (data.errors && data.errors.length > 0) {
    throw new Error(data.errors[0].message)
  }

  const { cart, userErrors } = data.data.cartCreate

  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors[0].message)
  }

  return cart.checkoutUrl
}
