import { Suspense } from 'react'
import Script from 'next/script'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense>
        <div className='min-h-screen sunrise'>{children}</div>
      </Suspense>
      <Script src='https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js' />
    </>
  )
}
