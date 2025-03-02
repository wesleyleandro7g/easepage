import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { sectionOptions } from '../builder/utils/sections/options'

interface SelectSectionLayoutProps {
  children: ReactNode
  onLayoutSelect: (layoutName: string, layoutVariant: string) => void
}

export function SelectSectionLayout(props: SelectSectionLayoutProps) {
  const { children, onLayoutSelect } = props
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Drawer direction={isMobile ? 'bottom' : 'left'}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerOverlay className='fixed inset-0 bg-black/40' />
      <DrawerContent className='w-full h-auto md:h-screen rounded-t-[10px] md:rounded-t-none md:w-[400px]'>
        <DrawerIndicator className='md:hidden' />
        <DrawerHeader>
          <DrawerTitle>Adicionar nova seção</DrawerTitle>
          <DrawerDescription>
            Não se preocupe, você pode alterar o estilo da seção a qualquer
            momento.
          </DrawerDescription>
        </DrawerHeader>

        <div className='flex flex-col space-y-4 px-4'>
          <Accordion type='single' collapsible>
            <div className='flex flex-col space-y-4'>
              {sectionOptions.map((section) => {
                return (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className='flex text-left gap-2 hover:bg-gray-100 p-2 w-full rounded-lg decoration-transparent data-[state=open]:bg-gray-100 data-[state=open]:rounded-b-none'>
                      <div className='flex gap-2'>
                        <Image
                          src={section.image}
                          alt='Section layout'
                          width={100}
                          height={100}
                          className='rounded-md border border-gray-200'
                        />
                        <div>
                          <span className='font-semibold text-sm'>
                            {section.name}
                          </span>
                          <p className='text-xs'>{section.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='bg-gray-100 rounded-b-lg'>
                      <div className='flex flex-col space-y-2 ml-4 pt-2'>
                        {section.variants.map((variant) => (
                          <button
                            key={variant.id}
                            className='flex text-left gap-2 p-2 rounded-md'
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
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </div>
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
