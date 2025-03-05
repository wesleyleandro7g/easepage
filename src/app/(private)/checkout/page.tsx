'use client'

import 'animate.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { PriceTable } from './components/price-table'
import { supabase } from '@/db/supabase/client'
import { usePageContent } from '@/context/page-context'
import { useToast } from '@/hooks/use-toast'

export default function Checkout() {
  const searchParams = useSearchParams()

  const [hasError, setHasError] = useState(false)

  const { toast } = useToast()

  const { setUserData, userData } = usePageContent()

  const page_id = searchParams.get('page_id')

  async function getUserData() {
    if (!page_id) {
      setHasError(true)
      return toast({
        title: 'Erro',
        description: 'Página não encontrada',
        variant: 'destructive',
      })
    }

    const pagesResponse = await supabase
      .from('pages')
      .select('user_id')
      .eq('id', page_id)
      .single()

    if (!pagesResponse.data) {
      setHasError(true)
      return toast({
        title: 'Erro',
        description: 'Página não encontrada',
        variant: 'destructive',
      })
    }

    const userResponse = await supabase
      .from('users')
      .select()
      .eq('id', pagesResponse.data.user_id)
      .single()

    if (!userResponse.data) {
      setHasError(true)
      return toast({
        title: 'Erro',
        description: 'Usuário não encontrado',
        variant: 'destructive',
      })
    }

    setUserData({
      id: userResponse.data.id,
      name: userResponse.data.name,
      email: userResponse.data.email,
      phone: userResponse.data.phone,
    })
  }

  useEffect(() => {
    if (!userData.id || !userData.name || !userData.email || !userData.phone) {
      getUserData()
    }
  }, [])

  if (hasError) {
    return (
      <div className='flex flex-col items-center w-full min-h-screen sunrise py-12'>
        <div className='flex flex-col md:flex-row gap-8 max-w-4xl text-center items-center md:justify-between'>
          <div className='flex flex-1 flex-col gap-4'>
            <h1 className='text-5xl sm:text-6xl text-center md:text-left font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
              Houve um erro com a sua página
            </h1>
            <p className='text-lg font-normal leading-5 text-center md:text-left text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
              Entre em contato com nosso suporte
            </p>
          </div>

          <div className='w-full md:max-w-sm'>
            <span>Error</span>
          </div>
        </div>
      </div>
    )
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
