'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Zap } from 'lucide-react'

type PaymentButtonProps = {
  children: React.ReactNode
  recurrence_type: 'monthly' | 'quarterly' | 'yearly'
  page_id: string
  user_id: string
}

export function PaymentButton(props: PaymentButtonProps) {
  const { children, page_id, user_id, recurrence_type } = props

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
  )

  const fetchClientSecret = useCallback(() => {
    return fetch('/api/checkout/', {
      method: 'POST',
      body: JSON.stringify({
        recurrence_type,
        page_id,
        user_id,
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
        <button className='flex items-center justify-center gap-2 text-md font-bold px-8 py-3 rounded-lg w-full bg-white text-[#171E2C] shadow-xl hover:bg-black/90 animate__animated focus:bg-white hover:bg-white'>
          {children}
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
