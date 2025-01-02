import { sectionFocusStyle } from '@/components/builder/utils/section-focus-style'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SectionProps {
  focused?: boolean
  onClick?: () => void
  content?: { [x: string]: string | null | undefined }
}

export function HeroDefault(props: SectionProps) {
  const { focused = false, onClick, content } = props

  return (
    <section
      data-focused={focused}
      className={cn(
        sectionFocusStyle,
        'flex w-full text-left min-h-[60vh] gap-4 py-12 px-4'
      )}
      onClick={onClick}
    >
      <div className='flex flex-1 flex-col items-start space-y-4'>
        <h1
          id='headline-title'
          contentEditable
          suppressContentEditableWarning
          className='outline-none text-5xl sm:text-6xl font-bold leading-[3.5rem] tracking-tight text-gray-900'
        >
          {content?.['headline-title']}
        </h1>
        <p
          id='headline-description'
          contentEditable
          suppressContentEditableWarning
          className='outline-none mt-4 text-lg text-gray-600'
        >
          {content?.['headline-description']}
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
