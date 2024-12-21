'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/db/supabase/client'

interface useFetchPageProps {
  slug?: string
}

interface useFetchPageByIdProps {
  id?: string
}

export function useFetchPage({ slug }: useFetchPageProps) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      if (!slug) {
        return
      }

      const data = await supabase.from('pages').select('*').eq('slug', slug)

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (data.data?.[0]) {
        const { page_structure, ...rest } = data.data[0]

        return {
          ...rest,
          page_structure: JSON.parse(page_structure),
        }
      }

      return data.data?.[0]
    },
  })
}

export function useFetchPageById({ id }: useFetchPageByIdProps) {
  return useQuery({
    queryKey: ['page-id', id],
    queryFn: async () => {
      if (!id) {
        return
      }

      const data = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single()

      if (data.error) {
        throw new Error(data.error.message)
      }

      if (data.data) {
        const { page_structure, ...rest } = data.data

        return {
          ...rest,
          page_structure: JSON.parse(page_structure),
        }
      }

      return data.data?.[0]
    },
  })
}
