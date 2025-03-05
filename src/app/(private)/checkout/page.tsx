'use client'

import 'animate.css'
import { useEffect, useState } from 'react'
import { Check, Copy, MoveRight, Zap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import QRCode from 'qrcode'

import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/db/supabase/client'

import { Progress } from '@/components/ui/progress'

import { createChargeByPix } from '@/actions/createChargeByPix'
import { unsecuredCopyToClipboard } from '@/utils/copy-to-clipboard'
import { PaymentButton } from '@/components/payment-button'
import { PriceTable } from './components/price-table'

const pagePrice = process.env.NEXT_PUBLIC_PAGE_PRICE

export default function Checkout() {
  const searchParams = useSearchParams()

  const pageSlug = searchParams.get('slug')
  const pageId = searchParams.get('pageId')
  const userId = searchParams.get('userId')

  const { toast } = useToast()

  const [processingPayment, setProcessingPayment] = useState(false)

  async function handleCreateCharge() {
    setProcessingPayment(true)

    const createdBilling = await supabase
      .from('billings')
      .insert({
        amount: pagePrice || '67.00',
        plan: 'launch',
        method: 'pix',
        status: 'pending',
        txid: '',
        page_id: pageId,
        user_id: userId,
      })
      .select('id')
      .single()

    console.log('createdBilling', createdBilling)

    setProcessingPayment(false)
  }

  return (
    <div className='flex flex-col items-center w-full min-h-screen sunrise py-12'>
      <div className='flex flex-col md:flex-row gap-8 max-w-4xl text-center items-center md:justify-between'>
        <div className='flex flex-1 flex-col gap-4'>
          <h1 className='text-5xl sm:text-6xl text-center md:text-left font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
            Tenha acesso à todos os recursos
          </h1>
          <p className='text-lg font-normal leading-5 text-center md:text-left text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
            Você pode ir muito mais longe com o plano profissional
          </p>
        </div>

        <div className='w-full md:max-w-sm'>
          <PriceTable />
        </div>
      </div>
    </div>
  )
}
