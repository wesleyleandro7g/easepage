'use client'

import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import Link from 'next/link'

export default function PaymentConfirmation() {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen sunrise py-12 px-8 gap-2'>
      <h1 className='text-7xl text-center font-bold tracking-tight animate__animated animate__bounceInUp text-headline'>
        🚀
      </h1>
      <h1 className='text-5xl sm:text-6xl text-center font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
        Sua página está ativa e ONLINE!
      </h1>
      <p className='text-lg font-normal leading-5 text-center text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
        Clique no botão abaixo para acessar o painel de controle da sua página.
      </p>
      <div className='flex flex-col md:flex-row justify-between w-full md:w-fit gap-2 mt-8 animate__animated animate__bounceInUp'>
        <Link href='/panel' className='w-full md:w-fit'>
          <Button className='w-full md:w-fit'>
            Acessar painel
            <Zap className='size-4' />
          </Button>
        </Link>
      </div>
    </div>
  )
}
