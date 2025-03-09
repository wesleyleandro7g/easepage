'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, Edit, ExternalLink, Zap } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useQueryPageById } from '@/db/queries/query-page'

export default function Panel() {
  const { pageId } = useParams()
  const { data, isLoading } = useQueryPageById({ pageId: String(pageId) })

  const [baseURL, setBaseURL] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseURL(window.location.origin)
    }
  }, [])

  if (isLoading) {
    return (
      <div className='w-full min-h-[80vh] flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto'>
        <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
          <Zap className='w-20 h-20 text-white' />
          <span className='text-lg text-white'>
            Carregando dados do site...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-full justify-center py-4 px-4 md:px-12'>
      <div className='flex flex-col w-full max-w-7xl gap-4 justify-between items-start'>
        <div className='flex w-full justify-between items-start'>
          <div className='flex items-start space-x-4'>
            <Link
              href='/panel'
              className='border border-white/20 rounded-lg p-2 mt-1 hover:border-white transition-all duration-200'
            >
              <ChevronLeft className='size-6 text-white' />
            </Link>
            <div>
              <h2 className='text-white text-2xl font-bold'>{data?.title}</h2>
              <div className='flex gap-2'>
                <Link
                  target='_blank'
                  href={
                    data?.domain ? data?.domain : `${baseURL}/${data?.slug}`
                  }
                >
                  <span className='flex flex-row gap-2 w-fit text-white underline text-xs'>
                    {data?.domain ? data?.domain : `${baseURL}/${data?.slug}`}
                    <ExternalLink className='size-3' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <Link
            className='w-fit hidden md:block'
            href={`/editor?page_id=${pageId}&is_edit=true`}
          >
            <Button className='w-fit bg-white text-black border border-white/20 hover:bg-white hover:text-black hover:opacity-80 transition-all duration-200'>
              Editar <Edit className='size-4' />
            </Button>
          </Link>
        </div>
        <Link
          href={`/editor?page_id=${pageId}&is_edit=true`}
          className='w-full flex md:hidden'
        >
          <Button className='w-full bg-white text-black border border-white/20 hover:bg-white hover:text-black hover:opacity-80 transition-all duration-200'>
            Editar <Edit className='size-4' />
          </Button>
        </Link>

        {(data?.slogan || data?.description) && (
          <p className='text-white font-md font-light'>
            {data?.slogan ? data?.slogan : data?.description}
          </p>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-2'>
          {data?.description && (
            <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
              <label className='text-white/60 text-sm'>Descrição:</label>
              <p className='text-white font-md font-light'>
                {data?.description}
              </p>
            </div>
          )}

          <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
            <label className='text-white/60 text-sm'>Status:</label>
            <span
              data-isactive={data?.is_active}
              className='w-fit py-1 px-3 data-[isactive=true]:bg-emerald-500 bg-red-400 rounded-full text-xs mt-2 flex justify-center items-center'
            >
              {data?.is_active ? 'Ativo' : 'Inativo'}
            </span>
          </div>

          <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
            <label className='text-white/60 text-sm'>Tipo:</label>
            <p className='text-white font-md font-light'>{data?.type}</p>
          </div>

          <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
            <label className='text-white/60 text-sm'>Estilo:</label>
            <p className='text-white font-md font-light'>{data?.style}</p>
          </div>

          <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
            <label className='text-white/60 text-sm'>Tema:</label>
            <label
              className={`flex items-center justify-center px-2 w-full h-[62px] rounded-lg border border-black/20 capitalize ${data?.theme}`}
            >
              {data?.theme}
            </label>
          </div>

          <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
            <label className='text-white/60 text-sm'>Fonte:</label>
            <p className='text-white font-md font-light'>{data?.font}</p>
          </div>

          {data?.whatsapp && (
            <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
              <label className='text-white/60 text-sm'>WhastApp:</label>
              <p className='text-white font-md font-light'>{data?.whatsapp}</p>
            </div>
          )}
          {data?.whatsapp && data?.whatsapp_message && (
            <div className='space-y-1 border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
              <label className='text-white/60 text-sm'>
                Mensagem inicial no WhatsApp:
              </label>
              <p className='text-white font-md font-light'>
                {data?.whatsapp_message}
              </p>
            </div>
          )}
        </div>

        {!data?.is_active && (
          <div className='animate-gradient p-4 rounded-lg shadow-xl w-full h-[300px] md:h-fit space-y-2 md:space-y-8 flex flex-col justify-between self-end'>
            <div className='space-y-2'>
              <h1 className='text-3xl text-left font-bold tracking-tight text-white'>
                👋 Ei! Seu site está aguardando para ser publicado!
              </h1>
              <p className='text-md font-light text-left text-white'>
                🚨 OFERTA DE LANÇAMENTO!!! 🚨 Garanta seu site com até 80% de
                desconto por tempo limitado!
              </p>
            </div>
            <Link className='w-full ' href={`/checkout?page_id=${pageId}`}>
              <Button className='w-full bg-white text-black border border-white/20 hover:bg-white hover:text-black hover:opacity-80 transition-all duration-200'>
                Clique aqui para aproveitar a oferta{' '}
                <Zap className='text-black size-6' />{' '}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
