import { Suspense } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <div className='w-full min-h-screen sunrise'>{children}</div>
    </Suspense>
  )
}
