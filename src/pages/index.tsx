import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'

import { GetStaticProps } from "next"
import { stripe } from "../lib/stripe"

import { HomeContainer, Product, SliderContainer } from "../styles/pages/home"

import Image from "next/future/image"

import useEmblaCarousel from 'embla-carousel-react'
import { CartButton } from '../components/CartButton'
import { useCart } from '../hooks/useCart'
import { IProduct } from '../Contexts/CartContext'
import { MouseEvent, useEffect, useState } from 'react'
import { ProductSkeleton } from '../components/ProductSkeleton'

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fake loading to use the skeleton loading from figma
    const timeOut = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeOut);
  }, [])

  const { addItemToCart, checkIfItemAlreadyExistsInCart } = useCart()

  function handleAddItemToCart(event: MouseEvent<HTMLButtonElement>, product: IProduct) {
    event.preventDefault()
    addItemToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>

      <div style={{ overflow: 'hidden', width: '100%' }}>
        <HomeContainer>
          <div className='embla' ref={emblaRef}>
            <SliderContainer className='embla__container container'>

              {isLoading ? (
                <>
                   <ProductSkeleton className='embla__slid' />
                  <ProductSkeleton className='embla__slid' />
                  <ProductSkeleton className='embla__slid' />
                </>                             
              ) : (
                <>
                  {products.map(product => {
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        prefetch={false}
                        passHref
                      >
                        <Product className="embla__slide">
                          <Image src={product.imageUrl} width={520} height={480} alt='' />
                  
                          <footer>
                            <div>
                              <strong>{product.name}</strong>
                              <span>{product.price}</span>
                            </div>

                            <CartButton
                              color="green"
                              size="large"
                              disabled={checkIfItemAlreadyExistsInCart(product.id)}
                              onClick={(event) => handleAddItemToCart(event, product)}
                            />
                          </footer>
                        </Product>
                      </Link>
                    )
                  })}
                </>

              )}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id
    }
  })

  const twoHours = 60 * 60 * 2

  return {
    props: {
      products,
    },
    revalidate: twoHours,
  }
}
