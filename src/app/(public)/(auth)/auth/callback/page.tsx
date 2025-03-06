/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/db/supabase/client'

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  const handleSignIn = async (token_hash: string) => {
    const { error, data } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'email',
    })

    if (error?.message) {
      setMessage(error.message)
    }

    if (data.session?.access_token) {
      setMessage('Autenticado com sucesso.')
      router.push('/panel')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (token_hash && type === 'email') {
      handleSignIn(token_hash)
    } else {
      setLoading(false)
      setMessage('Link inválido ou expirado.')
    }
  }, [token_hash, type])

  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-xl'>{loading ? 'Autenticando...' : message}</p>
    </div>
  )
}
