import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { AppProvider } from '@/providers/app-provider'
import { Toaster } from '@/components/ui/toaster'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ease Page',
  description:
    'Crie uma página de alta conversão para o seu negócio em segundos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' className={montserrat.className}>
      <AppProvider>
        <body className='antialiased sunrise'>{children}</body>
      </AppProvider>
      <Toaster />
    </html>
  )
}
