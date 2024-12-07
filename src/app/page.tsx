'use client'

import 'animate.css'
import { useState } from 'react'
import { Type, Palette, MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { setTheme, themes } from '@/config/theme'

export default function LandingPage() {
  const [currentTheme, setCurrentTheme] = useState(0)

  function handleNextTheme() {
    if (currentTheme === themes.length - 1) {
      setCurrentTheme(0)
      setTheme(themes[0])
      return
    }

    setTheme(themes[currentTheme + 1])
    setCurrentTheme(currentTheme + 1)
  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='py-6 flex justify-between items-center animate__animated animate__bounceInDown'>
          <div className='flex items-center space-x-2 text-black'>
            <Image
              src='/easepage-logo.svg'
              alt='Ease Page Logo'
              width={150}
              height={40}
            />
          </div>
          <div className='flex items-center space-x-2 text-black'>
            <button className='p-2 hover:bg-black/5 rounded-lg'>
              <Type className='w-5 h-5' />
            </button>
            <button
              className='p-2 hover:bg-black/5 rounded-lg'
              onClick={handleNextTheme}
            >
              <Palette className='w-5 h-5 text-headline' />
            </button>
          </div>
        </header>

        <main className='pt-20 pb-16 text-center lg:text-left'>
          <div className='flex flex-col gap-3 max-w-4xl text-left'>
            <h1 className='text-5xl sm:text-6xl font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
              Crie uma página de alta conversão para o seu negócio em segundos.
            </h1>
            <p className='text-lg font-normal text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
              Uma breve explicação dos resultados que você irá gerar para os
              seus clientes, lembre-se, use uma linguagem que converse com o seu
              público alvo.
            </p>
            <div className='mt-10 flex flex-col sm:flex-row items-start gap-3'>
              <Link
                href='/editor'
                className='w-full animate__animated animate__bounceInUp'
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
