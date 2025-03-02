/* eslint-disable @typescript-eslint/no-explicit-any */

import { HeroVariants } from '../../sections'
import { FeaturesVariants } from '../../sections/features'

type ContentType = { [x: string]: string | null | undefined }

export type SectionOptionType = {
  id: string
  name: string
  variant: string
  variantOptions?: string[]
  description: string
  image: string
  focused?: boolean
  content: ContentType
  contentList: string[]
  component: any
  variants: {
    id: string
    name: string
    description: string
    component: any
    image: string
  }[]
}

interface SectionProps {
  id: string
  content: ContentType
  contentList: string[]
  variant: string
}

export const Hero = (props: SectionProps): SectionOptionType => ({
  id: props.id,
  name: 'Hero',
  variant: props.variant,
  variantOptions: ['Default', 'Centered'],
  description: 'Seção hero padrão',
  image: '/assets/sections-layout/hero-section-layout-default.svg',
  component: HeroVariants,
  content: props.content,
  contentList: props.contentList,
  variants: [
    {
      id: 'hero-section-default',
      name: 'Default',
      description: 'Seção hero padrão',
      component: 'HeroVariants',
      image: '/assets/sections-layout/hero-section-layout-default.svg',
    },
    {
      id: 'hero-section-centered',
      name: 'Centered',
      description: 'Seção hero centralizada',
      component: 'HeroVariants',
      image: '/assets/sections-layout/hero-section-layout-centered.svg',
    },
    //   {
    //     name: 'With Image',
    //     description: 'Seção hero com imagem',
    //     component: 'HeroVariants',
    //     image: '/assets/sections-layout/hero-section-layout-with-image.svg',
    //   },
    //   {
    //     name: 'With Video',
    //     description: 'Seção hero com vídeo',
    //     component: 'HeroVariants',
    //     image: '/assets/sections-layout/hero-section-layout-with-video.svg',
    //   },
  ],
})

export const Features = (props: SectionProps): SectionOptionType => ({
  id: props.id,
  name: 'Features',
  variant: props.variant,
  variantOptions: ['Default', 'Right'],
  description: 'Seção feature padrão',
  image: '/assets/sections-layout/features-section-layout-default.svg',
  component: FeaturesVariants,
  content: props.content,
  contentList: props.contentList,
  variants: [
    {
      id: 'features-section-default',
      name: 'Default',
      description: 'Seção Features Padrão',
      component: 'FeaturesVariants',
      image: '/assets/sections-layout/features-section-layout-default.svg',
    },
    {
      id: 'features-section-right',
      name: 'Right',
      description: 'Seção Features à Direita',
      component: 'FeaturesVariants',
      image: '/assets/sections-layout/features-section-layout-right.svg',
    },
    //   {
    //     name: 'With Image',
    //     description: 'Seção hero com imagem',
    //     component: 'HeroVariants',
    //     image: '/assets/sections-layout/hero-section-layout-with-image.svg',
    //   },
    //   {
    //     name: 'With Video',
    //     description: 'Seção hero com vídeo',
    //     component: 'HeroVariants',
    //     image: '/assets/sections-layout/hero-section-layout-with-video.svg',
    //   },
  ],
})
