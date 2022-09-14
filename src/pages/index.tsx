import Image from "next/future/image"
import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import shirt01 from '../assets/shirts/shirt01.png'
import shirt02 from '../assets/shirts/shirt02.png'
import shirt03 from '../assets/shirts/shirt03.png'
import shirt04 from '../assets/shirts/shirt04.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetServerSideProps } from "next"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    mode: 'free-snap',
    slides: {
      perView: 3,
      spacing: 48, 
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map(product => {
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageUrl} width={520} height={480} alt='' />
    
            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    }
  })

  return {
    props: {
      products,
    }
  }
}
