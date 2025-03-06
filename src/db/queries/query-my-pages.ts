'use client'

import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/db/supabase/client'
import { PageType } from '@/types/page'

interface useQueryMyPagesProps {
  user_id?: string
}

export function useQueryMyPages({ user_id }: useQueryMyPagesProps) {
  return useQuery({
    queryKey: ['my-pages', user_id],
    queryFn: async () => {
      if (!user_id) {
        return
      }

      const data = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user_id)

      if (data.error) {
        throw new Error(data.error.message)
      }

      return data.data as PageType[]
    },
  })
}
