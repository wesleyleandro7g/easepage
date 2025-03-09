'use client'

import { createElement, useEffect } from 'react'
import { useParams } from 'next/navigation'

import { useQueryPageBySlug } from '@/db/queries/query-page'
import { fonts } from '@/config/fonts'

export default function PageEditor() {
  const { slug } = useParams()

  const { data, isLoading, isError, error } = useQueryPageBySlug({
    slug: slug as string,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (data?.title) {
        document.title = `${data.title} ${
          data?.slogan ? `| ${data.slogan}` : ''
        }`
      }

      if (data?.theme) {
        document.body.className = `antialiased ${data.theme}`
      }

      if (data?.font) {
        const font = fonts.find((font) => font.name === data.font)?.font
          .className

        if (font) {
          document.body.className = `${document.body.className} ${font}`
        }
      }
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto'>
        <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
          <span className='text-lg text-white'>Carregando...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto'>
        <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
          <span className='text-lg text-white'>
            Ooops! Houve um erro ao carregar a página.
          </span>
          <span className='text-md text-white'>{error.name}</span>
          <span className='text-sm text-white'>{error.message}</span>
        </div>
      </div>
    )
  }

  return (
    <main className='min-h-screen pt-20 pb-16 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
      {data?.sections.map((section) => {
        const { component, id, variant, content, link } = section

        return createElement(component[variant], {
          id,
          variant,
          content,
          link,
        })
      })}
    </main>
  )
}
