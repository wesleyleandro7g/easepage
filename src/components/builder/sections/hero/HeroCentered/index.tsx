import { sectionFocusStyle } from '@/components/builder/utils/section-focus-style'
import { cn } from '@/lib/utils'

interface SectionProps {
  focused?: boolean
  onClick?: () => void
  content?: { [x: string]: string | null | undefined }
}

export function HeroCentered(props: SectionProps) {
  const { focused = false, onClick, content } = props

  return (
    <section
      data-focused={focused}
      className={cn(
        sectionFocusStyle,
        'flex flex-col justify-center items-center w-full min-h-[40vh] py-12 px-4'
      )}
      onClick={onClick}
    >
      <div className='flex flex-1 flex-col justify-center items-center text-center gap-0 max-w-[800px]'>
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
          className='outline-none mt-4 text-lg text-gray-600 max-w-[600px]'
        >
          {content?.['headline-description']}
        </p>
        <button className='px-8 py-3 mt-10 bg-black text-white rounded-xl'>
          Obter benefício agora!
        </button>
      </div>
    </section>
  )
}