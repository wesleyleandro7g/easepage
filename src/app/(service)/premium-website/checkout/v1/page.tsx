'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { bennefits } from '../../utils'

const checkoutURL = process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_URL

export default function CheckoutV1() {
  const searchParams = useSearchParams()

  const user_name = searchParams.get('user_name')
  const user_email = searchParams.get('user_email')
  const user_phone = searchParams.get('user_phone')

  return (
    <div className='min-h-screen bg-[#030114] relative py-12'>
      <section className='flex flex-col items-center gap-4 max-w-6xl px-4 md:px-0 mx-auto text-center mt-12 relative'>
        <div className='max-w-5xl flex flex-col gap-4 items-center mx-auto'>
          <div className='flex items-center space-x-2 text-white z-20'>
            <Image
              src='/easepage-logo-white.svg'
              alt='Ease Page Logo'
              width={150}
              height={40}
            />
          </div>
          <h1 className='text-5xl md:text-7xl font-extrabold text-white tracking-tight animate__animated animate__bounceInUp z-20 mt-2'>
            Finalize o seu pedido
          </h1>
          <p className='text-lg font-normal text-white text-center max-w-2xl animate__animated animate__bounceInUp z-20'>
            Ao finalizar você será redirecionado para o nosso WhatsApp.
          </p>
        </div>
        <div className='p-0.5 mt-5 rounded-3xl w-full animate-gradient-3 max-w-[400px] z-20'>
          <div className='w-full max-w-[400px] flex flex-col items-start gap-5 p-6 rounded-3xl bg-[#03011498] shadow-xl animate__animated animate__bounceInUp'>
            <div className='w-full flex flex-col items-start'>
              <h2 className='text-white text-7xl font-extrabold text-center'>
                <span className='text-sm font-light'>12x</span>
                R$49
                <span className='text-sm font-light'>,90</span>
              </h2>
              <p className='text-white/70 text-sm'>Cobrança única</p>
            </div>
            <ul className='text-start flex flex-col gap-2'>
              {bennefits.map((bennefit) => (
                <li
                  key={bennefit.title}
                  className='text-white text-md inline-flex items-center gap-2'
                >
                  <Check className='text-emerald-400 w-5 h-5' />{' '}
                  {bennefit.title}{' '}
                  {!bennefit.active && (
                    <span className='text-white/40'>(em breve)</span>
                  )}
                </li>
              ))}
            </ul>
            <a
              target='_blank'
              href={`${checkoutURL}?name=${user_name}&email=${user_email}&phone=${user_phone}`}
              className='w-full'
            >
              <Button className='w-full flex items-center justify-center gap-2 text-md font-bold px-8 py-3 rounded-lg bg-white text-[#171E2C] shadow-xl hover:bg-black/90 animate__animated focus:bg-white hover:bg-white disabled:opacity-50'>
                Continuar para o checkout
              </Button>
            </a>
          </div>
        </div>

        <div className='absolute inset-0 -top-40 flex items-center justify-center z-10 bg-purple-radial opacity-30 animate__animated animate__zoomIn animate__delay-2s'>
          <Image src='/linear-lines.svg' alt='' fill />
        </div>
      </section>
    </div>
  )
}
