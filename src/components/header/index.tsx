'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { signOutAction } from '@/actions/sign-out'
import { useUser } from '@/hooks/useUser'

export function Header() {
  const { user, isLoading } = useUser()

  function handleSignOut() {
    signOutAction()
  }

  return (
    <header className='flex w-full justify-center bg-[#00000020] py-4 px-12'>
      <div className='flex w-full max-w-7xl gap-8 justify-between items-center'>
        <div className='flex justify-center gap-8'>
          <Image
            src='/easepage-logo.svg'
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
                <button className='flex justify-center items-center gap-1 h-8 px-4 capitalize text-sm text-primary bg-black rounded-full'>
                  {user &&
                    `${user?.user_metadata.first_name} ${
                      user?.user_metadata.last_name !== undefined
                        ? user?.user_metadata.last_name
                        : ''
                    }`}
                  <ChevronDown className='size-4' />
                </button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <span>{user?.email}</span>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className='cursor-pointer'
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
