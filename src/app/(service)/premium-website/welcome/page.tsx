'use client'

import { useSearchParams } from 'next/navigation'
import { Zap } from 'lucide-react'
import { supabase } from '@/db/supabase/client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

import { handleParticles } from './particles-effect'

export default function Welcome() {
  const searchParams = useSearchParams()

  const serviceOrderId = searchParams.get('service_order_id')
  const sessionId = searchParams.get('session_id')

  async function updateServiceOrder() {
    await supabase
      .from('service_orders')
      .update({
        status: 'paid',
        method: 'stripe',
        session_id: sessionId,
      })
      .eq('id', serviceOrderId)
  }

  useEffect(() => {
    updateServiceOrder()
  }, [serviceOrderId, sessionId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    handleParticles()
  }, [])

  return (
    <div className='min-h-screen bg-[#030114] animate-gradient-3 relative flex items-center justify-center'>
      <section className='flex flex-col flex-1 gap-4 max-w-3xl items-center text-center relative px-4 md:px-0 mx-auto py-16'>
        <Zap className='w-32 h-32 fill-[#D9D9D9]' />
        <h1 className='text-4xl font-bold text-white mt-4'>
          🎉 Pedido confirmado com sucesso!
        </h1>
        <p className='text-white text-lg'>
          Seu site já está em produção! Ainda coletaremos mais algumas
          informações no seu WhatsApp, caso não tenha recebido a nossa mensagem,
          sinta-se a vontade para nos contatar pelo o botão abaixo.
        </p>
        <a
          target='_blank'
          href='https://wa.me/5538999932655?text=Ol%C3%A1!%20Vim%20pela%20EasePage%20e%20quero%20falar%20sobre%20um%20site'
        >
          <Button className='bg-emerald-600 hover:bg-emerald-500 rounded-full animate__delay-5s animate__animated animate__bounceInRight shadow-xl'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path
                d='M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z'
                fillRule='evenodd'
                className='fill-white'
              />
            </svg>
            Fale com a gente!
          </Button>
        </a>
      </section>
    </div>
  )
}
