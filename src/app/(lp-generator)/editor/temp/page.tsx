'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useSectionContent } from '@/context/sectionContext'
import {
  HeroSection,
  FeaturesSection,
  SectionOptionType,
} from '@/components/builder/utils/section-options'

interface handleSectionGenerateProps {
  sections: {
    name: 'heroSection' | 'featuresSection'
    variant: string
  }[]
}

export default function TempPage() {
  const { setSections } = useSectionContent()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const hash = crypto.randomUUID().split('-')[0]

  const heroSection = HeroSection({
    id: `hero-${hash}`,
    content: {
      ['title-hero-' + hash]: 'Hero Title',
      ['description-hero-' + hash]: 'Hero Description',
      ['cta-hero-' + hash]: 'Hero CTA',
    },
    contentList: [
      'title-hero-' + hash,
      'description-hero-' + hash,
      'cta-hero-' + hash,
    ],
    variant: 'Default',
  })

  const featuresSection = FeaturesSection({
    id: `features-${hash}`,
    variant: 'Default',
    content: {
      ['title-features-' + hash]: 'Features Title',
      ['description-features-' + hash]: 'Features Description',
    },
    contentList: ['title-features-' + hash, 'description-features-' + hash],
  })

  const sectionsOptions = {
    heroSection,
    featuresSection,
  }

  function handleSectionGenerate({ sections }: handleSectionGenerateProps) {
    setIsLoading(true)

    const sectionsRequested: SectionOptionType[] = []

    sections.forEach((section) => {
      sectionsRequested.push({
        ...sectionsOptions[section.name],
        variant: section.variant,
      })
    })

    setSections(sectionsRequested)

    setTimeout(() => {
      router.push('/editor/v4')
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className='h-screen w-full flex flex-col gap-2 justify-center items-center'>
      <h1 className='text-2xl font-bold'>Temp Page</h1>
      <button
        className='px-4 py-2 bg-black/10 rounded-md'
        onClick={() =>
          handleSectionGenerate({
            sections: [
              { name: 'heroSection', variant: 'Default' },
              { name: 'featuresSection', variant: 'Default' },
            ],
          })
        }
      >
        {isLoading ? 'Loading...' : 'Generate Sections'}
      </button>
    </div>
  )
}
