import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from 'stripe'
import { ImgageContainer, ProductContainer, ProductDatails } from "../../styles/pages/product"
import Image from "next/future/image"
import { useRouter } from "next/router"
import axios from 'axios'
import { useState } from "react"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  async function handleBuyProduct() {
    try {

      setIsCreatingCheckoutSession(true)
      
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout.')
    } 
  }

  return (
    <ProductContainer>
      <ImgageContainer> 
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImgageContainer>

      <ProductDatails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDatails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MQth4wf7cp7JKo' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  const oneHour = 60 * 60 * 1

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: oneHour,
  }
}