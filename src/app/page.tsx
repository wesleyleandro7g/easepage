'use client'

import 'animate.css'
import { useState } from 'react'
import { Palette, Zap, Sparkles, LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { setTheme, themes } from '@/config/theme'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
      <div className='flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='flex w-full justify-between items-center py-6 animate__animated animate__bounceInDown'>
          <div className='flex items-center space-x-2 text-black'>
            <Image
              src='/easepage-logo.svg'
              alt='Ease Page Logo'
              width={150}
              height={40}
            />
          </div>
          <div className='flex items-center space-x-2 text-black'>
            <Link href='/sign-in' className='w-fit'>
              <Button
                variant='outline'
                size='sm'
                className='animate__animated animate__bounceInDown'
              >
                Login
                <LogIn className='w-4 h-4' />
              </Button>
            </Link>
          </div>
        </header>

        <main className='mt-10 md:mt-20 pb-16 text-center'>
          <section className='flex flex-col gap-4 max-w-6xl items-center text-center'>
            <Badge className='rounded-full px-4 py-2 shadow-none bg-white/60 gap-2 animate__animated animate__bounceInUp'>
              <Sparkles className='w-4 h-4' />
              Crie seu site em minutos com IA
            </Badge>
            <h1 className='text-5xl md:text-8xl font-extrabold tracking-tight animate__animated animate__bounceInUp text-headline'>
              Crie sites incríveis em um passe de mágica!
            </h1>
            <p className='text-lg font-normal text-subheadline text-center max-w-2xl animate__animated animate__bounceInUp'>
              Crie páginas de alta conversão de forma simples e rápida, mesmo
              sem experiência técnica ou um orçamento alto!
            </p>
            <div className='flex flex-col md:flex-row w-full justify-center'>
              <Link href='/onboarding' className='w-full md:w-fit'>
                <Button className='animate__animated animate__bounceInUp w-full md:w-full'>
                  Criar meu site
                  <Zap />
                </Button>
              </Link>
              <Button
                variant='link'
                className='animate__animated animate__bounceInUp animate__delay-0.5s text-headline px-4'
                onClick={handleNextTheme}
              >
                Trocar tema do site
                <Palette className='w-5 h-5 text-headline' />
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

// Use o poder da Inteligência Artificial para criar sites incríveis em minutos!
