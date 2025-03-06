'use client'

import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/db/supabase/client'

interface useQueryPageStatusProps {
  page_id?: string | null
}

export function useQueryPageStatus({ page_id }: useQueryPageStatusProps) {
  return useQuery({
    queryKey: ['pages-status', page_id],
    queryFn: async () => {
      if (!page_id || page_id === null) {
        throw new Error('page_id is required')
      }

      const data = await supabase
        .from('pages')
        .select('is_active, domain, slug')
        .eq('id', page_id)
        .single()

      if (data.error) {
        throw new Error(data.error.message)
      }

      return data.data as { is_active: boolean; domain: string; slug: string }
    },
  })
}
