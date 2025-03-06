'use client'

import { supabase } from '@/db/supabase/client'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser()
      return { data, error }
    },
  })

  return { user: data?.data.user, isLoading, error }
}
