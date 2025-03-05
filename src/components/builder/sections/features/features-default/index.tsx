import { sectionFocusStyle } from '@/components/builder/utils/section-focus-style'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  focused?: boolean
  onClick?: () => void
  content?: { [x: string]: string | null | undefined }
}

export function FeaturesDefault(props: SectionProps) {
  const { focused = false, onClick, content, id } = props

  return (
    <section
      data-focused={focused}
      className={cn(
        sectionFocusStyle,
        'flex flex-col w-full text-center items-center justify-center min-h-screen gap-4 py-12 px-4'
      )}
      onClick={onClick}
    >
      <div className='flex flex-col max-w-[800px]'>
        <h1
          id={`title-${id}`}
          contentEditable
          suppressContentEditableWarning
          className='outline-none text-5xl sm:text-6xl font-bold leading-[3.5rem] tracking-tight text-gray-900'
        >
          {content?.['title-' + id]}
        </h1>
        <p
          id={`description-${id}`}
          contentEditable
          suppressContentEditableWarning
          className='outline-none mt-4 text-lg text-gray-600'
        >
          {content?.['description-' + id]}
        </p>
      </div>
      <div className='grid grid-cols-3 w-full gap-4 py-8'>
        <div className='bg-gray-200 p-4 rounded-lg'>
          <h2
            id='feature-1-title'
            contentEditable
            suppressContentEditableWarning
            className='outline-none text-2xl font-bold text-gray-900'
          >
            {content?.['feature-1-title'] || 'Feature 1'}
          </h2>
          <p
            id='feature-1-description'
            contentEditable
            suppressContentEditableWarning
            className='outline-none mt-4 text-gray-600'
          >
            {content?.['feature-1-description'] || 'Lorem ipsum dolor sit amet'}
          </p>
        </div>
        <div className='bg-gray-200 p-4 rounded-lg'>
          <h2
            id='feature-1-title'
            contentEditable
            suppressContentEditableWarning
            className='outline-none text-2xl font-bold text-gray-900'
          >
            {content?.['feature-1-title'] || 'Feature 1'}
          </h2>
          <p
            id='feature-1-description'
            contentEditable
            suppressContentEditableWarning
            className='outline-none mt-4 text-gray-600'
          >
            {content?.['feature-1-description'] || 'Lorem ipsum dolor sit amet'}
          </p>
        </div>
        <div className='bg-gray-200 p-4 rounded-lg'>
          <h2
            id='feature-1-title'
            contentEditable
            suppressContentEditableWarning
            className='outline-none text-2xl font-bold text-gray-900'
          >
            {content?.['feature-1-title'] || 'Feature 1'}
          </h2>
          <p
            id='feature-1-description'
            contentEditable
            suppressContentEditableWarning
            className='outline-none mt-4 text-gray-600'
          >
            {content?.['feature-1-description'] || 'Lorem ipsum dolor sit amet'}
          </p>
        </div>
      </div>
      <button className='px-8 py-3 bg-black text-white rounded-xl'>
        Obter benefício agora!
      </button>
    </section>
  )
}
