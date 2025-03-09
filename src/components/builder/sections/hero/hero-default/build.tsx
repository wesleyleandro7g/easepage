import Image from 'next/image'

interface SectionProps {
  id: string
  content?: { [x: string]: string | null | undefined }
  link?: string
}

export function HeroDefaultBuild(props: SectionProps) {
  const { content, id, link } = props

  return (
    <section
      id={id}
      className='flex w-full text-left min-h-[60vh] gap-4 py-12 px-4'
    >
      <div className='flex flex-1 flex-col items-start space-y-4'>
        <h1
          id={`title-${id}`}
          className='outline-none text-5xl sm:text-6xl font-bold leading-[3.5rem] tracking-tight text-gray-900'
        >
          {content?.['title-' + id]}
        </h1>
        <p
          id={`description-${id}`}
          className='outline-none mt-4 text-lg text-gray-600'
        >
          {content?.['description-' + id]}
        </p>
        <a
          id={`cta-${id}`}
          className='px-8 py-3 mt-10 bg-black text-white rounded-xl'
          href={link}
          target='_blank'
          rel='noreferrer'
        >
          {content?.['cta-' + id]}
        </a>
      </div>
      <div className='flex flex-1 relative'>
        <Image src='/img-mock1.svg' alt='Hero Section' fill />
      </div>
    </section>
  )
}
