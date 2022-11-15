import { NextApiRequest, NextApiResponse } from "next"
import { IProduct } from "../../Contexts/CartContext"
import { stripe } from "../../lib/stripe"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { products } = request.body as { products: IProduct[] }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  if (!products) {
    return response.status(400).json({ error: 'PRoducts not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1,
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return response.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}  