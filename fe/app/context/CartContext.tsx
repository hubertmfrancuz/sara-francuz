"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

export interface CartItem {
  _id: string
  title: string
  price: number
  quantity: number
  handle: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems(current => {
      const existingItem = current.find(i => i._id === item._id)
      if (existingItem) {
        return current.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...current, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item._id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems(current =>
      current.map(item => (item._id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
