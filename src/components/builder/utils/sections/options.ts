/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ContentType, SectionOptionType } from '@/types/section'
import { HeroVariants } from '../../sections'
import { FeaturesVariants } from '../../sections/features'

interface SectionProps {
  id: string
  content: ContentType
  variant: string
}

export const Hero = (props: SectionProps): SectionOptionType => ({
  id: 'hero-' + props.id,
  name: 'Hero',
  variant: props.variant,
  variantOptions: ['Default', 'Centered'],
  description: 'Seção hero padrão',
  image: '/assets/sections-layout/hero-section-layout-default.svg',
  component: HeroVariants,
  content: {
    ['title-hero-' + props.id]: '',
    ['description-hero-' + props.id]: '',
    ['cta-hero-' + props.id]: '',
  },
  contentList: [
    'title-hero-' + props.id,
    'description-hero-' + props.id,
    'cta-hero-' + props.id,
  ],
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
  ai_prompt_properties: {
    'title-hero': {
      description: 'Título que deve aparecer na seção hero',
      type: 'string',
    },
    'description-hero': {
      description:
        'Descrição que deve aparecer na seção hero logo abaixo do título',
      type: 'string',
    },
    'cta-hero': {
      description: 'Texto do botão de call to action da seção hero',
      type: 'string',
    },
  },
})

export const Features = (props: SectionProps): SectionOptionType => ({
  id: 'features-' + props.id,
  name: 'Features',
  variant: props.variant,
  variantOptions: ['Default', 'Right'],
  description: 'Seção feature padrão',
  image: '/assets/sections-layout/features-section-layout-default.svg',
  component: FeaturesVariants,
  content: {
    ['title-features-' + props.id]: '',
    ['description-features-' + props.id]: '',
  },
  contentList: [
    'title-features-' + props.id,
    'description-features-' + props.id,
  ],
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
  ai_prompt_properties: {
    'title-features': {
      description: 'Título que deve aparecer na seção de features',
      type: 'string',
    },
    'description-features': {
      description:
        'Descrição que deve aparecer na seção de features logo abaixo do título',
      type: 'string',
    },
  },
})
