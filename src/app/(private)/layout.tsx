'use client'

import { Header } from '@/components/header'
// import { SideNav } from '@/components/nav/side-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col w-full min-h-screen overflow-hidden bg-white sunrise'>
      <Header />
      <main className='flex w-full h-full p-4 overflow-auto'>{children}</main>
    </div>
  )
}
