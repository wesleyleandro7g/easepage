'use client'

import { useSearchParams } from 'next/navigation'

import { Header } from '@/components/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const isNewProject = searchParams.get('is_new')

  console.log(isNewProject)

  if (isNewProject === 'true') {
    return children
  }

  return (
    <div className='flex flex-col w-full min-h-screen overflow-hidden bg-white sunrise'>
      <Header />
      <main className='flex w-full h-full overflow-auto'>{children}</main>
    </div>
  )
}
