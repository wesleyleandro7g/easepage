'use client'

import { Zap } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useQueryMyPages } from '@/db/queries/query-my-pages'
import { useUser } from '@/hooks/useUser'

export default function Panel() {
  const { user } = useUser()
  const { data, isLoading } = useQueryMyPages({ user_id: user?.id })

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
        <div className='flex flex-col md:flex-row justify-between md:items-center w-full gap-2'>
          <span className='font-light text-lg text-white'>
            Crie sites em um passe de mágica
          </span>
          <Link className='w-full md:w-fit' href='/new-project/briefing'>
            <Button className='w-full md:w-fit bg-white text-black border border-white/20 hover:bg-white hover:text-black hover:opacity-80 transition-all duration-200'>
              Criar novo site <Zap className='text-black size-6' />{' '}
            </Button>
          </Link>
        </div>
        <div className='grid grid-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
          {data?.map((page) => (
            <Link key={page.id} href={`/project/${page.id}`}>
              <div
                key={page.id}
                className='flex flex-col bg-transparent border p-4 rounded-lg transition-all duration-200 border-white/20 hover:border-white'
              >
                <div className='flex flex-row justify-between items-start gap-2'>
                  <span className='text-white font-bold text-lg'>
                    {page.title}
                  </span>
                  <span
                    data-isactive={page.is_active}
                    className='w-fit py-1 px-3 data-[isactive=true]:bg-emerald-500 bg-red-400 rounded-full text-xs mt-2'
                  >
                    {page.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <span className='text-white/80 text-sm font-light'>
                  {page.slogan}
                </span>
                <span className='flex flex-row gap-2 w-fit py-1 px-3 bg-white text-black rounded-full text-xs mt-2 justify-center items-center'>
                  {page.domain ? page.domain : `/${page.slug}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
