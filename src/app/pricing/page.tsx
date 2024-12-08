'use client'

import 'animate.css'
import { MoveRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LandingPage() {
  const searchParams = useSearchParams()

  const pageSlug = searchParams.get('slug')

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <main className='pt-20 pb-16 text-center lg:text-left'>
          <div className='flex flex-col gap-3 max-w-4xl text-left'>
            <h1 className='text-5xl sm:text-6xl font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
              Tenha acesso à todos os recursos
            </h1>
            <p className='text-lg font-normal text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
              Você pode ir muito mais longe com o plano profissional
            </p>
            <div className='mt-10 flex flex-col sm:flex-row items-start gap-3'>
              <Link
                href={`/${pageSlug}`}
                className='w-full animate__animated animate__bounceInUp'
                target='_blank'
              >
                <button className='flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-full w-full bg-black text-white shadow-xl hover:bg-black/90 animate__animated animate__pulse animate__infinite'>
                  Criar minha página agora
                  <MoveRight />
                </button>
              </Link>
              <p className='text-sm text-gray-600'>
                +500 pessoas amaram este produto
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
