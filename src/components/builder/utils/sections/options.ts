/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ContentType, SectionOptionType } from '@/types/section'
import { HeroVariants } from '../../sections'
import { FeaturesVariants } from '../../sections/features'

interface SectionProps {
  id: string
  content: ContentType
  contentList?: string[]
  variant: string
  buttonId?: string
}

export const Hero = (props: SectionProps): SectionOptionType => ({
  id: 'hero-' + props.id,
  name: 'Hero',
  label: 'Seção Hero',
  variant: props.variant,
  variantOptions: ['Default', 'Centered'],
  description:
    'Geramente essa é a primeira seção de uma página. Ela é usada para chamar a atenção do visitante e direcioná-lo para a ação desejada.',
  image: '/assets/sections-layout/hero-section-layout-default.svg',
  component: HeroVariants,
  content: props.content || {
    ['title-hero-' + props.id]: '',
    ['description-hero-' + props.id]: '',
    ['cta-hero-' + props.id]: '',
  },
  contentList: props.contentList || [
    'title-hero-' + props.id,
    'description-hero-' + props.id,
    'cta-hero-' + props.id,
  ],
  buttonId: props.buttonId || 'cta-hero-' + props.id,
  variants: [
    {
      id: 'hero-section-default',
      name: 'Default',
      label: 'Padrão',
      description: 'Com texto à esquerda e imagem à direita',
      component: 'HeroVariants',
      image: '/assets/sections-layout/hero-section-layout-default.svg',
    },
    {
      id: 'hero-section-centered',
      name: 'Centered',
      label: 'Centralizada',
      description: 'Com texto centralizado e sem imagem',
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
  label: 'Seção Recursos',
  variant: props.variant,
  variantOptions: ['Default', 'Right'],
  description:
    'Essa seção é ideal para destacar funcionalidades do seu produto, serviço ou empresa.',
  image: '/assets/sections-layout/features-section-layout-default.svg',
  component: FeaturesVariants,
  content: props.content || {
    ['title-features-' + props.id]: '',
    ['description-features-' + props.id]: '',
  },
  contentList: props.contentList || [
    'title-features-' + props.id,
    'description-features-' + props.id,
  ],
  variants: [
    {
      id: 'features-section-default',
      name: 'Default',
      label: 'Padrão',
      description: 'Seção de Recursos Padrão',
      component: 'FeaturesVariants',
      image: '/assets/sections-layout/features-section-layout-default.svg',
    },
    {
      id: 'features-section-right',
      name: 'Right',
      label: 'Alinhado à Direita',
      description: 'Seção de Recursos Alinhado à Direita',
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

export const sectionOptions = {
  Hero,
  Features,
}
