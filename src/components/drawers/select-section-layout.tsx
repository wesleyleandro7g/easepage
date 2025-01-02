import { ReactNode, useState } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerIndicator,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'

import { sectionOptions } from '../builder/utils/section-options'

interface SelectSectionLayoutProps {
  children: ReactNode
  onLayoutSelect: (layoutName: string, layoutVariant: string) => void
}

export function SelectSectionLayout(props: SelectSectionLayoutProps) {
  const { children, onLayoutSelect } = props
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId)
  }

  return (
    <Drawer direction='left'>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerOverlay className='fixed inset-0 bg-black/40' />
      <DrawerContent className='w-full h-screen rounded-t-[10px] md:rounded-t-none md:w-[400px]'>
        <DrawerIndicator className='hidden' />
        <DrawerHeader>
          <div className='flex items-start gap-4'>
            {selectedSection && (
              <button
                className='flex items-center w-fit p-1 text-sm rounded-md bg-gray-200'
                onClick={() => setSelectedSection(null)}
              >
                <ChevronLeft />
              </button>
            )}
            <div>
              <DrawerTitle>
                {selectedSection
                  ? 'Selecione o estilo da seção'
                  : 'Adicionar nova seção'}
              </DrawerTitle>
              <DrawerDescription>
                {selectedSection
                  ? 'Não se preocupe, você pode alterar o estilo da seção a qualquer momento.'
                  : 'Selecione o estilo de layout para a nova seção'}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className='flex flex-col space-y-4 px-4'>
          <div className='flex flex-col space-y-4'>
            {sectionOptions.map((section) => {
              const isSelected = selectedSection === section.id
              return (
                <div key={section.id}>
                  {!selectedSection && (
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className='flex text-left gap-2 bg-gray-200 p-2 w-full rounded-md'
                    >
                      <div className=''>
                        <Image
                          src={section.image}
                          alt='Section layout'
                          width={100}
                          height={100}
                          className='rounded-md border border-gray-200'
                        />
                      </div>
                      <div>
                        <span className='font-semibold text-sm'>
                          {section.name}
                        </span>
                        <p className='text-xs'>{section.description}</p>
                      </div>
                    </button>
                  )}
                  {isSelected && (
                    <div className='flex flex-col space-y-2'>
                      {section.variants.map((variant) => (
                        <button
                          key={variant.id}
                          className='flex text-left gap-2 bg-gray-100 p-2 rounded-md'
                          onClick={() =>
                            onLayoutSelect(section.name, variant.name)
                          }
                        >
                          <div className=''>
                            <Image
                              src={variant.image}
                              alt='Variant layout'
                              width={80}
                              height={80}
                              className='rounded-md border border-gray-200'
                            />
                          </div>
                          <div>
                            <span className='font-semibold text-sm'>
                              {variant.name}
                            </span>
                            <p className='text-xs'>{variant.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
