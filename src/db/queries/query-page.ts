'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/db/supabase/client'
import { SectionOptionType } from '@/types/section'
import { sectionOptions } from '@/components/builder/utils/sections/options'

interface useQueryPageBySlugProps {
  slug?: string
}

interface useQueryPageById {
  pageId?: string
}

export function useQueryPageBySlug({ slug }: useQueryPageBySlugProps) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      if (!slug) {
        return
      }

      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      const sectionDataValue: SectionOptionType[] = []
      const dataContent = data.page_structure

      Object.keys(dataContent).forEach((sectionId, index) => {
        const section = dataContent[sectionId]
        const sectionOption =
          sectionOptions[section.name as keyof typeof sectionOptions]

        sectionDataValue.push(
          sectionOption({
            id: '',
            variant: section.variant,
            content: {},
            isBuild: true,
          })
        )

        const contentList = Object.keys(section.content)

        sectionDataValue[index].id = sectionId
        sectionDataValue[index].variant = section.variant
        sectionDataValue[index].link = section.link
        sectionDataValue[index].buttonId = section.buttonId
        sectionDataValue[index].content = section.content
        sectionDataValue[index].contentList = contentList
      })

      const pageData = {
        title: data.title,
        description: data.description,
        theme: data.theme,
        font: data.font,
        style: data.style,
        slug: data.slug,
        type: data.type,
        slogan: data.slogan,
        is_active: data.is_active,
        id: data.id,
        user_id: data.user_id,
        whatsapp: data.whatsapp,
        whatsapp_message: data.whatsapp_message,
        sections: sectionDataValue,
      }

      return pageData
    },
  })
}

export function useQueryPageById({ pageId }: useQueryPageById) {
  return useQuery({
    queryKey: ['page-id', pageId],
    queryFn: async () => {
      if (!pageId) {
        return
      }

      const data = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (data.error) {
        throw new Error(data.error.message)
      }

      return data.data
    },
  })
}
