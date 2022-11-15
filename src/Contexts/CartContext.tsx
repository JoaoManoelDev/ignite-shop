import { createContext, ReactNode, useState } from "react"

export interface IProduct {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface CartContextData {
  cartItems: IProduct[]
  cartTotalPrice: number
  addItemToCart: (product: IProduct) => void
  removeItemToCart: (product: string) => void
  checkIfItemAlreadyExistsInCart: (pruduct: string) => boolean
  
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([])

  const cartTotalPrice = cartItems.reduce((total, product) => {
    return total + product.numberPrice
  }, 0)

  function addItemToCart(product: IProduct) {
    setCartItems(state => [...state, product])
  }
  
  function removeItemToCart(productId: string) {
    setCartItems(state => state.filter(item => item.id !== productId))
  }

  function checkIfItemAlreadyExistsInCart(productId: string) {
    return cartItems.some(product => product.id === productId)
  }

  return (
    <CartContext.Provider 
      value={{
        cartItems,
        cartTotalPrice,
        addItemToCart,
        removeItemToCart,
        checkIfItemAlreadyExistsInCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

