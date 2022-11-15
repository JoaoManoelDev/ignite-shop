import { useState } from 'react'
import { CartButton } from '../CartButton'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import Image from 'next/future/image'
import {
  CartClose,
  CartContent,
  CartFinalization,
  CartProduct,
  CartProductDetails,
  CartProductImg,
  CartTitle,
  FinalizationDetails
} from './styles'
import { useCart } from '../../hooks/useCart'
import axios from 'axios'

export function Cart() {
  const { cartItems, removeItemToCart, cartTotalPrice } = useCart()
  const cartItemsQuantity = cartItems.length

  const formattedCartTotalPrice = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotalPrice)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao direcionar ao checkout.')
    } 
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
      <a className="linkHeaderButton">
        <CartButton />
      </a>
 
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>                                                                                                                                                                                                                                                                       
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>
          
          <CartTitle>Sacola de compras</CartTitle>

          <section>
            {cartItemsQuantity <= 0 && (
              <p>Parece que seu carrinho está vazio : (</p>
            )}

            {cartItems.map(cartItem => {
              return (
                <CartProduct key={cartItem.id}>
                  <CartProductImg>
                    <Image
                      width={100}
                      height={93}
                      alt=""
                      src={cartItem.imageUrl}
                    />
                  </CartProductImg>
    
                  <CartProductDetails>
                    <p>{cartItem.name}</p>
                    <strong>{cartItem.price}</strong>
                    <button onClick={() => removeItemToCart(cartItem.id)}>Remover</button>
                  </CartProductDetails>
              </CartProduct>
              )
            })}

          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>{cartItemsQuantity} {cartItemsQuantity === 1 ? 'item' : 'itens'}</p>
              </div>

              <div>
                <span>Valor total</span>
                <p>{formattedCartTotalPrice}</p>
              </div>
            </FinalizationDetails>

            <button 
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartItemsQuantity <= 0}
            >
              Finalizar compra
            </button>
          </CartFinalization>

        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}