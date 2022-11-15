import Link from "next/link"
import { HeaderContainer } from "./styles"
import Image from 'next/future/image'
import logoImg from '../../assets/logo.svg'
import { Cart } from "../Cart"
import { useRouter } from "next/router"

export function Header() {
  const { pathname } = useRouter()

  const showCartButton = pathname !== '/success'

  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <a>
          <Image src={logoImg} alt="" />
        </a>
      </Link>
      {showCartButton && <Cart />}
    </HeaderContainer>
  )
}