import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const priceId = 'price_1Li1tdKyeNPa4Sxp6uueHAa7'

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return response.status(201).json({
    checkoutSessionUrl: checkoutSession.url
  })
}  