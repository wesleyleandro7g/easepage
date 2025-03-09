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
        <div className='flex flex-row justify-between md:items-center w-full gap-2 md:hidden'>
          <Link href='/panel'>
            <Button className='w-fit bg-white text-black border border-white/20'>
              <ChevronLeft className='size-4' />
              Voltar
            </Button>
          </Link>
          <Link
            className='w-fit'
            href={`/editor?page_id=${pageId}&is_edit=true`}
          >
            <Button className='w-fit bg-white text-black border border-white/20'>
              Editar <Edit className='size-4' />
            </Button>
          </Link>
        </div>
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
                  <span className='flex flex-row gap-2 w-fit py-1 px-3 bg-white text-black rounded-full text-xs mt-2 justify-center items-center'>
                    {data?.domain ? data?.domain : `${baseURL}/${data?.slug}`}
                    <ExternalLink className='size-3' />
                  </span>
                </Link>
                <span
                  data-isactive={data?.is_active}
                  className='w-fit py-1 px-3 data-[isactive=true]:bg-emerald-500 bg-red-400 rounded-full text-xs mt-2 flex justify-center items-center'
                >
                  {data?.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>
          <Link
            className='w-fit'
            href={`/editor?page_id=${pageId}&is_edit=true`}
          >
            <Button className='w-fit bg-white text-black border border-white/20 hover:bg-white hover:text-black hover:opacity-80 transition-all duration-200'>
              Editar <Edit className='size-4' />
            </Button>
          </Link>
        </div>
        <div className='grid grid-1 md:grid-cols-2 gap-4 w-full mt-8'>
          <div className='space-y-1'>
            <label className='text-white/80'>Descrição:</label>
            <div className='flex flex-col bg-transparent border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
              <p className='text-white font-md font-light'>
                {data?.description}
              </p>
            </div>
          </div>
          {data?.slogan && (
            <div className='space-y-1'>
              <label className='text-white/80'>Slogan:</label>
              <div className='flex flex-col bg-transparent border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
                <p className='text-white font-md font-light'>{data?.slogan}</p>
              </div>
            </div>
          )}
          {data?.whatsapp && (
            <div className='space-y-1'>
              <label className='text-white/80'>WhatsApp:</label>
              <div className='flex flex-col bg-transparent border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
                <p className='text-white font-md font-light'>
                  {data?.whatsapp}
                </p>
              </div>
            </div>
          )}
          {data?.whatsapp_message && (
            <div className='space-y-1'>
              <label className='text-white/80'>
                Mensagem inicial no WhatsApp:
              </label>
              <div className='flex flex-col bg-transparent border py-2 px-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'>
                <p className='text-white font-md font-light'>
                  {data?.whatsapp_message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
