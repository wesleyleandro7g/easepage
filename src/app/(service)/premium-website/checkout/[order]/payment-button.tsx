'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Zap } from 'lucide-react'

type PaymentButtonProps = {
  children: React.ReactNode
  service_order_id?: string
  user_email?: string | null
}

export function PaymentButton({
  children,
  service_order_id,
  user_email,
}: PaymentButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
  )

  const fetchClientSecret = useCallback(() => {
    return fetch('/api/checkout/premium', {
      method: 'POST',
      body: JSON.stringify({
        service_order_id,
        email: `${user_email}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={!user_email}
          className='flex items-center justify-center gap-2 text-md font-bold px-8 py-3 rounded-lg w-full bg-white text-[#171E2C] shadow-xl hover:bg-black/90 animate__animated focus:bg-white hover:bg-white disabled:opacity-50'
        >
          {!user_email ? 'Há um erro no link! Reinicie o processo!' : children}
          <Zap className='w-6 h-6 hidden data-[issubmitting=true]:flex data-[issubmitting=true]:animate-spin text-[#171E2C]' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden.Root>
          <DialogTitle>Assinar Ease Page</DialogTitle>
        </VisuallyHidden.Root>
        <div id='checkout'>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}
