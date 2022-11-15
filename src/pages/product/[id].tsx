import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from 'stripe'
import { ImgageContainer, ProductContainer, ProductDatails } from "../../styles/pages/product"
import Image from "next/future/image"
import { useRouter } from "next/router"
import Head from "next/head"
import { useCart } from "../../hooks/useCart"
import { IProduct } from "../../Contexts/CartContext"

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addItemToCart, checkIfItemAlreadyExistsInCart } = useCart()

  if (isFallback) {
    return <p>Loading...</p>
  }

  const itemAlreadyInCart = checkIfItemAlreadyExistsInCart(product.id)

  const siteTitle = "Ignite Shop"
  return (
    <>
      <Head>
        <title>{product.name + " - " + siteTitle}</title>
      </Head>

      <ProductContainer>
        <ImgageContainer> 
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImgageContainer>

        <ProductDatails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={itemAlreadyInCart} onClick={() => addItemToCart(product)}>
            { itemAlreadyInCart ? 'Produto já esá na sacola' : 'Adicionar a sacola' } 
          </button>
        </ProductDatails>
      </ProductContainer>
    </>
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
        defaultPriceId: price.id,
        numberPrice: price.unit_amount / 100,
      }
    },
    revalidate: oneHour,
  }
}