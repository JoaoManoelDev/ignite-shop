import { useContext } from "react"
import { CartContext } from "../Contexts/CartContext"

export function useCart() {
  return useContext(CartContext)
}