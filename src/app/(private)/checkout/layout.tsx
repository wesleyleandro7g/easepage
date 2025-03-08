import { Suspense } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <div className='bg-easebg-800'>{children}</div>
    </Suspense>
  )
}
