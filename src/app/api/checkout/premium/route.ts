import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')

  const { service_order_id, email } = (await request.json()) as {
    service_order_id: string
    email: string
  }

  console.log({ email })

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: process.env.STRIPE_PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      return_url: `${request.headers.get(
        'origin'
      )}/premium-website/welcome?session_id={CHECKOUT_SESSION_ID}&service_order_id=${service_order_id}`,
    })

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    })
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 400 })
  }
}
