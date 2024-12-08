import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppProvider } from '@/providers/app-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
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
    <html lang='pt-BR' className={inter.className}>
      <AppProvider>
        <body className='antialiased sunrise'>{children}</body>
      </AppProvider>
      <Toaster />
    </html>
  )
}
