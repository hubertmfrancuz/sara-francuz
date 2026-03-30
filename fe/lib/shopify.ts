import { ShopifyCart, ShopifyCartResponse } from './types'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!domain || !token) {
    throw new Error('Shopify store domain or storefront token is not configured.')
  }

  const response = await fetch(
    `https://${domain}/api/2026-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors && data.errors.length > 0) {
    throw new Error(data.errors[0].message)
  }

  return data
}

function extractCart(data: ShopifyCartResponse): ShopifyCart {
  const operation = Object.keys(data.data)[0]
  const result = data.data[operation as keyof typeof data.data] as { cart: ShopifyCart; userErrors: { field: string[]; message: string }[] }

  if (result.userErrors && result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message)
  }

  return result.cart
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyCartResponse>(`
    mutation cartCreate {
      cartCreate(input: {}) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `)

  return extractCart(data)
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ data: { cart: ShopifyCart | null } }>(`
    query getCart($id: ID!) {
      cart(id: $id) { ...CartFragment }
    }
    ${CART_FRAGMENT}
  `, { id: cartId })

  return data.data.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyCartResponse>(`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  })

  return extractCart(data)
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyCartResponse>(`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  return extractCart(data)
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<ShopifyCartResponse>(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `, {
    cartId,
    lineIds,
  })

  return extractCart(data)
}
