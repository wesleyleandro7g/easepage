'use server'

import { redirect } from 'next/navigation'
import { createServer } from '@/db/supabase/server'

export async function signOutAction() {
  const supabase = createServer()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}
