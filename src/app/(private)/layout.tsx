'use client'

import { Header } from '@/components/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col w-full min-h-screen overflow-hidden bg-white sunrise'>
      <Header />
      <main className='flex w-full h-full overflow-auto'>{children}</main>
    </div>
  )
}
