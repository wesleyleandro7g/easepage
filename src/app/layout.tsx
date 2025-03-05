import './globals.css'
import '../styles/index.css'
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'

import { AppProvider } from '@/providers/app-provider'
import { Toaster } from '@/components/ui/toaster'

const prompt = Prompt({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
    <html lang='pt-BR' className={prompt.className}>
      <AppProvider>
        <body className='antialiased sunrise'>{children}</body>
      </AppProvider>
      <Toaster />
    </html>
  )
}
