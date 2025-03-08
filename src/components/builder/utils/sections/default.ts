import { SectionOptionType } from '@/types/section'
import { Features, Hero } from './options'

const heroSection = (hash: string) =>
  Hero({
    id: hash,
    variant: 'Default',
    content: {
      ['title-hero-' + hash]: 'Insira seu belo título aqui',
      ['description-hero-' + hash]:
        'Aqui vai uma descrição incrível para o seu título',
      ['cta-hero-' + hash]: 'E Aqui Deve Ter Um CTA!',
    },
    contentList: [
      'title-hero-' + hash,
      'description-hero-' + hash,
      'cta-hero-' + hash,
    ],
  })

const featuresSection = (hash: string) =>
  Features({
    id: hash,
    variant: 'Default',
    content: {
      ['title-features-' + hash]: 'Quais são os principais benefícios?',
      ['description-features-' + hash]:
        'Descreva quais são os principais benefícios que o seu produto ou serviço oferece.',
    },
    contentList: ['title-features-' + hash, 'description-features-' + hash],
  })

export const defaultSections = (hash: string): SectionOptionType[] => [
  heroSection(hash),
  featuresSection(hash),
]
