'use client'

import { useEffect } from 'react'

import { verifyChargeByPix } from '../pricing/actions'
import { useSearchParams } from 'next/navigation'

export default function Welcome() {
  const searchParams = useSearchParams()

  const pageSlug = searchParams.get('slug')
  const pageId = searchParams.get('pageId')
  const userId = searchParams.get('userId')
  const txid = searchParams.get('txid')
  const billingId = searchParams.get('billingId')

  console.log({
    billingId,
    pageSlug,
    pageId,
    userId,
    txid,
  })

  const handleCheckPayment = async () => {
    if (txid) {
      const result = await verifyChargeByPix({
        txid: txid,
      })

      console.log(result)
    }
  }

  useEffect(() => {
    handleCheckPayment()
  }, [])

  return (
    <div className='min-h-screen sunrise'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <main className='flex flex-col flex-1 pt-12 pb-16 text-center justify-center lg:text-left'>
          welcome
        </main>
      </div>
    </div>
  )
}
