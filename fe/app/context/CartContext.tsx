"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import {
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeFromCart,
} from "@/lib/shopify"
import { ShopifyCart, ShopifyCartLine } from "@/lib/types"

export interface CartItem {
  lineId: string
  variantId: string
  title: string
  price: number
  quantity: number
  handle: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (variantId: string) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  totalItems: number
  checkoutUrl: string | null
  isCartOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
}

const CART_ID_KEY = "shopify-cart-id"

function mapLines(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }: { node: ShopifyCartLine }) => ({
    lineId: node.id,
    variantId: node.merchandise.id,
    title: node.merchandise.product.title,
    price: parseFloat(node.merchandise.price.amount),
    quantity: node.quantity,
    handle: node.merchandise.product.handle,
  }))
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const syncCart = useCallback((cart: ShopifyCart) => {
    setCartId(cart.id)
    setCheckoutUrl(cart.checkoutUrl)
    setItems(mapLines(cart))
    localStorage.setItem(CART_ID_KEY, cart.id)
  }, [])

  useEffect(() => {
    async function initCart() {
      const storedId = localStorage.getItem(CART_ID_KEY)
      if (!storedId) return

      try {
        const cart = await getCart(storedId)
        if (cart && cart.lines.edges.length > 0) {
          syncCart(cart)
          return
        }
      } catch {}

      localStorage.removeItem(CART_ID_KEY)
    }

    initCart()
  }, [syncCart])

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cartId) return cartId
    const cart = await createCart()
    syncCart(cart)
    return cart.id
  }, [cartId, syncCart])

  const addItem = useCallback(async (variantId: string) => {
    setIsLoading(true)
    try {
      const id = await ensureCart()
      const cart = await addToCart(id, variantId)
      syncCart(cart)
    } finally {
      setIsLoading(false)
    }
  }, [ensureCart, syncCart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartId) return
    setIsLoading(true)
    try {
      const cart = await removeFromCart(cartId, [lineId])
      syncCart(cart)
    } finally {
      setIsLoading(false)
    }
  }, [cartId, syncCart])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId) return
    setIsLoading(true)
    try {
      if (quantity < 1) {
        const cart = await removeFromCart(cartId, [lineId])
        syncCart(cart)
      } else {
        const cart = await updateCartLine(cartId, lineId, quantity)
        syncCart(cart)
      }
    } finally {
      setIsLoading(false)
    }
  }, [cartId, syncCart])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        checkoutUrl,
        isCartOpen,
        isLoading,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
