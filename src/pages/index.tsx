import Image from "next/future/image"
import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'

import shirt01 from '../assets/shirts/shirt01.png'
import shirt02 from '../assets/shirts/shirt02.png'
import shirt03 from '../assets/shirts/shirt03.png'
import shirt04 from '../assets/shirts/shirt04.png'

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    mode: 'free-snap',
    slides: {
      perView: 3,
      spacing: 48,
      
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className="keen-slider__slide">
        <Image src={shirt01} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta 01</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt02} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta 02</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt03} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta 02</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt04} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta 02</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

    </HomeContainer>
  )
}
