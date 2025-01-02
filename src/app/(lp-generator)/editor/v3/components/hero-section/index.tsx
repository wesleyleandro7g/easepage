import { cn } from '@/lib/utils'
import Image from 'next/image'

const sectionVariants = {
  default: {
    wrapper: 'flex w-full text-left min-h-[60vh] gap-4 py-12',
    leftWrapper: 'flex flex-1 flex-col items-start space-y-4',
    title:
      'text-5xl sm:text-6xl font-bold leading-[3.5rem] tracking-tight text-gray-900',
    description: 'mt-4 text-lg text-gray-600',
  },
  centered: {
    wrapper: 'flex flex-col w-full text-center min-h-[60vh] gap-4 py-12',
    leftWrapper: 'flex flex-col items-center space-y-4',
    title:
      'text-5xl sm:text-6xl font-bold leading-[3.5rem] tracking-tight text-gray-900',
    description: 'mt-4 text-lg text-gray-600',
  },
}

interface SectionProps {
  variant?: 'default'
  focused?: boolean
  onClick?: () => void
}

export function HeroSection(props: SectionProps) {
  const { variant = 'default', focused = false, onClick } = props

  return (
    <section
      data-focused={focused}
      className={cn(
        'data-[focused=true]:border-4 data-[focused=true]:rounded-xl data-[focused=true]:px-4 border-blue-500 data-[focused=false]:border-none',
        sectionVariants[variant].wrapper
      )}
      onClick={onClick}
    >
      <div className={cn(sectionVariants[variant].leftWrapper)}>
        <h1
          id='headline-title'
          contentEditable
          suppressContentEditableWarning
          className={cn('outline-none', sectionVariants[variant].title)}
        >
          Crie sites incríveis em um passe de mágica!
        </h1>
        <p
          id='headline-description'
          className={cn(sectionVariants[variant].description)}
        >
          Crie páginas de alta conversão de forma simples e rápida, mesmo sem
          experiência técnica ou um orçamento alto!
        </p>
        <button className='px-8 py-3 bg-black text-white rounded-xl'>
          Obter benefício agora!
        </button>
      </div>
      <div className='flex flex-1 relative'>
        <Image src='/img-mock1.svg' alt='Hero Section' fill />
      </div>
    </section>
  )
}
