import { NextApiRequest, NextApiResponse } from "next"

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  return response.json({ message: 'Hello World' })
}