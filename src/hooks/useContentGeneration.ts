import { useState } from 'react'
import axios from 'axios'

import { usePageContent } from '@/context/page-context'
import { Features, Hero } from '@/components/builder/utils/sections/options'
import { SectionOptionType } from '@/types/section'

type sectionPromptType = {
  [key: string]:
    | {
        [key: string]: {
          description: string
          type: string
        }
      }
    | undefined
}

type prepareSectionsType = {
  sections: {
    name: 'hero' | 'features'
    variant: string
  }[]
}

async function fetchContent(context: string, properties: sectionPromptType) {
  const response = await axios.post('/api/content-generate', {
    context,
    properties,
  })
  return response.data
}

export const useContentGeneration = () => {
  const { setSections } = usePageContent()

  const [isLoading, setIsLoading] = useState(false)

  const hash = crypto.randomUUID().split('-')[0]

  const hero = Hero({
    id: `${hash}`,
    content: {},
    variant: 'Default',
  })

  const features = Features({
    id: `${hash}`,
    variant: 'Default',
    content: {},
  })

  const sectionsOptions = {
    hero,
    features,
  }

  async function generateContent(props: prepareSectionsType) {
    const { sections } = props

    let sectionsPrompts: sectionPromptType = {}

    for (const section of sections) {
      const prompt = sectionsOptions[section.name].ai_prompt_properties

      sectionsPrompts = {
        ...sectionsPrompts,
        [section.name]: prompt,
      }
    }

    const context =
      'Somos uma empresa especializada em instalação e manutenção de ar condicionando'

    const contentGeneratedWithAI = await fetchContent(context, sectionsPrompts)

    const sectionsWithContent: SectionOptionType[] = []

    for (const section of sections) {
      const sectionContent = contentGeneratedWithAI[section.name]

      let formattedContentKeys = {}

      Object.keys(sectionContent).forEach((key) => {
        formattedContentKeys = {
          ...formattedContentKeys,
          [`${key}-${hash}`]: sectionContent[key],
        }
      })

      sectionsWithContent.push({
        ...sectionsOptions[section.name],
        variant: section.variant,
        content: formattedContentKeys,
      })
    }

    setSections(sectionsWithContent)

    setTimeout(() => {
      setIsLoading(false)
      return 'ok'
    }, 2500)
  }

  return {
    isLoading,
    generateContent,
  }
}
