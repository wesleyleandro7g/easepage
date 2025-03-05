import { SectionOptionType } from '@/types/section'
import { Features, Hero } from './options'

const hash = crypto.randomUUID().split('-')[0]

const heroSection = Hero({
  id: `hero-${hash}`,
  variant: 'Default',
  content: {
    ['title-hero-' + hash]: 'Insira seu belo título aqui',
    ['description-hero-' + hash]:
      'Aqui vai uma descrição incrível para o seu título',
    ['cta-hero-' + hash]: 'E Aqui Deve Ter Um CTA!',
  },
})

const featuresSection = Features({
  id: `features-${hash}`,
  variant: 'Default',
  content: {
    ['title-features-' + hash]: 'Quais são os principais benefícios?',
    ['description-features-' + hash]:
      'Descreva quais são os principais benefícios que o seu produto ou serviço oferece.',
  },
})

export const defaultSections: SectionOptionType[] = [
  heroSection,
  featuresSection,
]
