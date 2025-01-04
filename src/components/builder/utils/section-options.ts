/* eslint-disable @typescript-eslint/no-explicit-any */

import { HeroVariants } from '../sections'
import { FeaturesVariants } from '../sections/features'

export type SectionOptionType = {
  id: string
  name: string
  variant: string
  variantOptions?: string[]
  description: string
  image: string
  focused?: boolean
  content?: { [x: string]: string | null | undefined }
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

export const sectionOptions: SectionOptionType[] = [
  {
    id: 'hero-section',
    name: 'Hero',
    variant: 'Default',
    variantOptions: ['Default', 'Centered'],
    description: 'Seção hero padrão',
    image: '/assets/sections-layout/hero-section-layout-default.svg',
    component: HeroVariants,
    content: {
      'headline-title': 'Crie sites incríveis em um passe de mágica! Teste',
      'headline-description':
        'Crie páginas de alta conversão de forma simples e rápida, mesmo sem experiência técnica ou um orçamento alto!',
    },
    contentList: ['headline-title', 'headline-description'],
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
  },
  {
    id: 'features-section',
    name: 'Features',
    variant: 'Default',
    variantOptions: ['Default', 'Right'],
    description: 'Seção feature padrão',
    image: '/assets/sections-layout/features-section-layout-default.svg',
    component: FeaturesVariants,
    content: {
      'features-title': 'Quais são os principais benefícios?',
      'features-description':
        'Descreva quais são os principais benefícios que o seu produto ou serviço oferece.',
    },
    contentList: ['features-title', 'features-description'],
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
  },
]

// VAMOS CATEGORIZAR OS COMPONENTES DE ACORDO COM O TIPO DE SEÇÃO, IMPORTANDO TODOS OS COMPONENTES DE SEÇÃO EM UM ÚNICO ARQUIVO
