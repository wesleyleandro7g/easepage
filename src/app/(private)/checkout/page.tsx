'use client'

import 'animate.css'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { PriceTable } from './components/price-table'
import { supabase } from '@/db/supabase/client'

export default function Checkout() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [userId, setUserId] = useState<string | null>(null)

  const page_id = searchParams.get('page_id')
  const user_id = searchParams.get('user_id')

  function getUserId() {
    supabase
      .from('pages')
      .select('user_id')
      .eq('id', page_id)
      .single()
      .then((data) => {
        router.replace(
          `/checkout?page_id=${page_id}&user_id=${data.data?.user_id}`
        )
        setUserId(data.data?.user_id)
      })
  }

  useEffect(() => {
    if (!user_id) {
      getUserId()
    }
  }, [])

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
          <PriceTable page_id={page_id!} user_id={user_id || userId!} />
        </div>
      </div>
    </div>
  )
}
