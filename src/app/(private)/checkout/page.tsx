'use client'

import 'animate.css'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExternalLink, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'

import { useQueryPageStatus } from '@/db/queries/query-page-status'
import { Button } from '@/components/ui/button'

import { PriceTable } from './components/price-table'
import { Bennefits } from './components/bennefits'

export default function Checkout() {
  const searchParams = useSearchParams()
  const [baseURL, setBaseURL] = useState('')

  const page_id = searchParams.get('page_id')

  const { data, isLoading, error } = useQueryPageStatus({ page_id })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseURL(window.location.origin)
    }
  }, [])

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center w-full min-h-screen py-12'>
        <h1 className='text-3xl text-center md:text-left font-bold leading-[3rem] gradient-text-white'>
          <span className='no-gradient-text'>⏳</span> Carregando...
        </h1>
      </div>
    )
  }

  if (data?.is_active) {
    return (
      <div className='flex flex-col items-center justify-center w-full min-h-screen py-12 px-8 gap-2'>
        <h1 className='text-7xl text-center font-bold tracking-tight animate__animated animate__bounceInUp'>
          🚀
        </h1>
        <h1 className='text-5xl sm:text-6xl text-center font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp gradient-text-white'>
          Sua página está ativa e ONLINE!
        </h1>
        <p className='text-lg font-normal leading-5 text-center text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
          Clique em um dos links abaixo para acessar sua página ou as
          configurações dela!
        </p>
        <div className='flex flex-col md:flex-row justify-between w-full md:w-fit gap-2 mt-8 animate__animated animate__bounceInUp'>
          <Link
            target='_blank'
            href={data.domain ? data.domain : `${baseURL}/${data.slug}`}
            className='w-full md:w-fit'
          >
            <Button className='bg-emerald-500 w-full md:w-fit'>
              Acessar minha página <ExternalLink className='size-4' />
            </Button>
          </Link>

          <Link href='/panel' className='w-full md:w-fit'>
            <Button className='w-full md:w-fit'>
              Acessar painel Adm
              <LayoutDashboard className='size-4' />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center w-full min-h-screen py-12 px-8 gap-2'>
        <h1 className='text-7xl text-center font-bold tracking-tight animate__animated animate__bounceInUp'>
          🥲
        </h1>
        <h1 className='text-4xl sm:text-4xl text-center font-bold leading-[2.6rem] tracking-tight animate__animated animate__bounceInUp gradient-text-white'>
          Houve um erro ao ativar sua página, mas NÃO SE PREOCUPE!
        </h1>
        <p className='text-lg font-normal leading-5 text-center text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
          Estamos aqui para resolver o seu problema! Clique em um dos links
          abaixo para falar com o suporte ou verificar as configurações da sua
          página.
        </p>
        <div className='flex flex-col md:flex-row justify-between w-full md:w-fit gap-2 mt-8 animate__animated animate__bounceInUp'>
          <Link
            target='_blank'
            href='https://wa.me/5538999932655?text=Ol%C3%A1!%20Tive%20um%20erro%20no%20checkout%20da%20minha%20p%C3%A1gina.'
            className='w-full md:w-fit'
          >
            <Button className='bg-emerald-500 w-full md:w-fit'>
              Fale com o suporte no WhatsApp <ExternalLink className='size-4' />
            </Button>
          </Link>

          <Link href='/panel' className='w-full md:w-fit'>
            <Button className='w-full md:w-fit'>
              Verificar configurações
              <Settings className='size-4' />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center w-full min-h-screen py-12 px-8 bg-easebg-800 bg-circle-pattern'>
      <div className='flex flex-col md:flex-row gap-8 max-w-4xl text-center items-center md:justify-between'>
        <div className='flex flex-1 flex-col gap-4'>
          <h1 className='text-5xl sm:text-6xl text-left font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp gradient-text-white'>
            Pronto Para Lançar a Sua Máquina de Vendas?{' '}
            <span className='no-gradient-text'>🚀</span>
          </h1>
          <p className='text-lg font-light text-left text-white max-w-2xl animate__animated animate__bounceInUp'>
            🚨 OFERTA DE LANÇAMENTO!!! 🚨 Garanta seu site com até 80% de
            desconto por tempo limitado!
          </p>
          {/* <p className='text-lg font-light text-left text-white max-w-2xl animate__animated animate__bounceInUp'>
            Seu site está pronto para impulsionar suas vendas e fortalecer sua
            autoridade. Dê o último passo e coloque sua presença online no ar!
          </p> */}

          <div className='hidden md:flex'>
            <Bennefits />
          </div>
        </div>

        <div className='w-full md:max-w-sm'>
          <PriceTable pageId={page_id} />
        </div>

        <div className='flex md:hidden'>
          <Bennefits />
        </div>
      </div>
    </div>
  )
}
