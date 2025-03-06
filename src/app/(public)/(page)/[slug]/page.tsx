'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useFetchPage } from '@/db/queries/query-page'

export default function PageEditor() {
  const { slug } = useParams()

  const { data, isLoading, isError } = useFetchPage({ slug: slug as string })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (data?.theme) {
        document.body.className = `antialiased ${data.theme}`
      }
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div>carregando...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div>Erro ao carregar a página</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <main className='pt-20 pb-16 text-center lg:text-left'>
          <div className='flex flex-col gap-3 max-w-4xl text-left'>
            <h1 className='text-5xl sm:text-6xl font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
              {data?.page_structure?.headline}
            </h1>
            <p className='text-lg font-normal text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
              {data?.page_structure?.subheadline}
            </p>
            <div className='mt-10 flex flex-col sm:flex-row items-start gap-3'>
              <Link
                href={data?.page_structure?.heroButtonLink}
                className='w-full animate__animated animate__bounceInUp'
                target='_blank'
              >
                <button className='flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-full w-full bg-black text-white shadow-xl hover:bg-black/90 animate__animated animate__pulse animate__infinite'>
                  {data?.page_structure?.heroButtonText}
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
