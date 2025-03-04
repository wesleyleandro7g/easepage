'use client'

import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { PageProvider } from '@/context/page-context'
// import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'

export function AppProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={client}>
      <PageProvider>{children}</PageProvider>
      <Toaster />
    </QueryClientProvider>
  )
}
