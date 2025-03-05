'use client'

import { supabase } from '@/db/supabase/client'

export default function SignIn() {
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: 'wesleyleandro.dev+teste2@gmail.com',
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'http://localhost:3000/panel',
      },
    })

    console.log(data, error)
  }

  return (
    <div>
      <button onClick={signInWithEmail}>Sign In</button>
    </div>
  )
}
