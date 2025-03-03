'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { useSectionContent } from '@/context/sectionContext'
import {
  Hero,
  Features,
  SectionOptionType,
} from '@/components/builder/utils/sections/options'

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

export default function TempPage() {
  const { setSections } = useSectionContent()
  const router = useRouter()

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

  async function generateSectionsContent(props: prepareSectionsType) {
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
      router.push('/editor')
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className='h-screen w-full flex flex-col gap-2 justify-center items-center'>
      <h1 className='text-2xl font-bold'>Temp Page</h1>
      <button
        className='px-4 py-2 bg-black/10 rounded-md'
        onClick={() =>
          generateSectionsContent({
            sections: [
              { name: 'hero', variant: 'Default' },
              { name: 'features', variant: 'Default' },
            ],
          })
        }
      >
        {isLoading ? 'Loading...' : 'Generate Sections'}
      </button>
    </div>
  )
}
