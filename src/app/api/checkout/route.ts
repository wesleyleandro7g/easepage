import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')

  const { recurrence_type } = (await request.json()) as {
    recurrence_type: 'monthly' | 'quarterly' | 'yearly'
  }

  if (
    !recurrence_type ||
    !['monthly', 'quarterly', 'yearly'].includes(recurrence_type)
  ) {
    return NextResponse.json(
      { error: 'recurrence_type is required' },
      { status: 400 }
    )
  }

  try {
    const priceOptions = {
      monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
      quarterly: process.env.STRIPE_QUARTERLY_PRICE_ID,
      yearly: process.env.STRIPE_YEARLY_PRICE_ID,
    }

    const price = priceOptions[recurrence_type]

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      payment_method_types: ['card'],
      return_url: `${request.headers.get(
        'origin'
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
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
