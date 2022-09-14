import { AppProps } from "next/app"
import Imgage from 'next/future/image'
import { globalStyles } from "../styles/global"

import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Imgage src={logoImg} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

