/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/db/supabase/client'
import { Zap } from 'lucide-react'

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  const handleSignIn = async (token_hash: string) => {
    const { error, data } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'email',
    })

    if (error?.message) {
      router.push('/sign-in?error=invalid_token')
    }

    if (data.session?.access_token) {
      router.push('/panel')
    } else {
      router.push('/sign-in?error=invalid_token')
    }
  }

  useEffect(() => {
    if (token_hash && type === 'email') {
      handleSignIn(token_hash)
    } else {
      router.push('/sign-in?error=invalid_token')
    }
  }, [token_hash, type])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto bg-circle-pattern'>
      <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
        <Zap className='w-20 h-20 text-white' />
        <span className='text-lg text-white'>Autenticando...</span>
      </div>
    </div>
  )
}
