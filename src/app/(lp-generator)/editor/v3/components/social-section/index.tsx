import { cn } from '@/lib/utils'

const sectionVariants = {
  default: {
    wrapper: 'flex w-full text-center',
    leftWrapper: 'flex flex-col items-center space-y-4',
    title:
      'text-5xl sm:text-6xl font-bold leading-[3.5rem] tracking-tight text-gray-900',
    description: 'mt-4 text-lg text-gray-600',
  },
}

interface SectionProps {
  variant?: 'default'
}

export function SocialSection({ variant = 'default' }: SectionProps) {
  return (
    <section className={cn(sectionVariants[variant].wrapper)}>
      <div className={cn(sectionVariants[variant].leftWrapper)}>
        <h1 id='headline-title' className={cn(sectionVariants[variant].title)}>
          Social
        </h1>
        <p
          id='headline-description'
          className={cn(sectionVariants[variant].description)}
        >
          social
        </p>
      </div>
    </section>
  )
}
