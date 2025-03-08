'use client'

import { usePathname } from 'next/navigation'

import { Header } from '@/components/header'

const pagesWithoutHeader = ['/checkout', '/editor']

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  if (pagesWithoutHeader.includes(pathName)) {
    return children
  }

  return (
    <div className='flex flex-col w-full min-h-screen overflow-hidden bg-easebg-800 bg-circle-pattern'>
      <Header />
      <main className='flex w-full h-full overflow-auto'>{children}</main>
    </div>
  )
}
