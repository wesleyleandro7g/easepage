'use client'

import { ExternalLink, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useQueryMyPages } from '@/db/queries/query-my-pages'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'

export default function Panel() {
  const { user } = useUser()

  const { data } = useQueryMyPages({ user_id: user?.id })

  const baseURL = window.location.origin

  return (
    <div className='flex w-full justify-center py-4 px-12'>
      <div className='flex flex-col w-full max-w-7xl gap-4 justify-between items-start'>
        <div className='flex justify-between items-center w-full'>
          <span className='font-light text-lg'>
            Crie sites em um passe de mágica
          </span>
          <Button>
            Criar novo site <Zap className='text-white size-6' />{' '}
          </Button>
        </div>
        <div className='grid grid-cols-3 gap-4 w-full'>
          {data?.map((page) => (
            <div
              key={page.id}
              className='flex flex-col bg-[#00000010] border border-black/10 p-4 rounded-lg hover:bg-[#00000020] transition-all duration-200'
            >
              <div className='flex flex-row justify-between items-start gap-2'>
                <span className='text-black font-bold text-lg'>
                  {page.title}
                </span>
                <span
                  data-isactive={page.is_active}
                  className='w-fit py-1 px-3 data-[isactive=true]:bg-emerald-500 bg-red-400 rounded-full text-xs mt-2'
                >
                  {page.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <span className='text-black/80 text-sm font-light'>
                {page.slogan}
              </span>
              <Link target='_blank' href={`${baseURL}/${page.slug}`}>
                <span className='flex flex-row gap-2 w-fit py-1 px-3 bg-black text-white rounded-full text-xs mt-2 justify-center items-center'>
                  {page.domain ? page.domain : `/${page.slug}`}
                  <ExternalLink className='size-3' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
