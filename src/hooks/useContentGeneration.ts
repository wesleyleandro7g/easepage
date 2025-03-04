import { useState } from 'react'
import axios from 'axios'

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
  context: string
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
    const { context, sections } = props

    let sectionsPrompts: sectionPromptType = {}

    for (const section of sections) {
      const prompt = sectionsOptions[section.name].ai_prompt_properties

      sectionsPrompts = {
        ...sectionsPrompts,
        [section.name]: prompt,
      }
    }

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

    setIsLoading(false)

    return { sectionsWithContent }
  }

  return {
    isLoading,
    generateContent,
  }
}
