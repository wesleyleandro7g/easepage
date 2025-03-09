'use client'

import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { signOutAction } from '@/actions/sign-out'
import { useUser } from '@/hooks/useUser'
import { LogOut } from 'lucide-react'

export function Header() {
  const { user, isLoading } = useUser()

  function handleSignOut() {
    signOutAction()
  }

  return (
    <header className='flex w-full justify-center border-b border-white/20 bg-[#111111] p-4 md:px-12'>
      <div className='flex w-full max-w-7xl gap-8 justify-between items-center'>
        <div className='flex justify-center gap-8'>
          <Image
            src='/easepage-logo-white.svg'
            alt='Ease Page Logo'
            width={150}
            height={40}
          />
        </div>

        <div className='flex space-x-2 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isLoading ? (
                <Skeleton className='w-[200px] h-8 rounded-full bg-black/20' />
              ) : (
                <DropdownMenuTrigger asChild>
                  <div className='flex justify-center items-center w-8 h-8 bg-white text-black rounded-full text-sm cursor-pointer uppercase'>
                    {user?.user_metadata.first_name?.charAt(0)}
                    {user?.user_metadata.last_name !== undefined
                      ? user?.user_metadata.last_name?.charAt(0)
                      : ''}
                  </div>
                </DropdownMenuTrigger>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-white border-black/10'>
              <div className='flex flex-col px-2'>
                <span className='text-sm font-bold capitalize'>
                  {user?.user_metadata.first_name}
                  {user?.user_metadata.last_name !== undefined
                    ? user?.user_metadata.last_name
                    : ''}
                </span>
                <span className='text-xs font-light lowercase'>
                  {user?.email}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className='cursor-pointer justify-end'
              >
                <button className='flex w-fit items-center gap-2 border border-black/20 bg-[#00000008] px-2 py-1 rounded-md text-black/90'>
                  Sair
                  <LogOut className='size-4' />
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
