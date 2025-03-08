import { ReactNode, useEffect, useState } from 'react'
import { X } from 'lucide-react'
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

import { defaultSections } from '../builder/utils/sections/default'

interface AddSectionProps {
  children: ReactNode
  onLayoutSelect: (layoutName: string, layoutVariant: string) => void
}

export function AddSection(props: AddSectionProps) {
  const { children, onLayoutSelect } = props

  const [isMobile, setIsMobile] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const hash = crypto.randomUUID().split('-')[0]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'left'}
      open={isOpened}
      onClose={() => setIsOpened(false)}
    >
      <DrawerTrigger onClick={() => setIsOpened(true)}>
        {children}
      </DrawerTrigger>
      <DrawerOverlay className='fixed inset-0 bg-black/40' />
      <DrawerContent className='w-full h-[90%] md:h-screen rounded-t-[10px] md:rounded-t-none md:w-[400px] bg-white'>
        <DrawerIndicator className='md:hidden bg-black/20' />
        <DrawerHeader className='relative'>
          <DrawerTitle className='text-start'>
            Adicione uma Nova Seção
          </DrawerTitle>
          <DrawerDescription className='text-start text-black/60 font-light'>
            A Seção é um bloco de conteúdo que pode ser adicionado à sua página.
            Escolha o tipo de Seção e uma Variante para adicionar!
          </DrawerDescription>
          <X
            className='cursor-pointer absolute top-0 md:top-3 right-5'
            onClick={() => setIsOpened(false)}
          />
        </DrawerHeader>

        <div className='flex flex-col space-y-4 px-4'>
          <Accordion type='single' collapsible>
            <div className='flex flex-col space-y-4'>
              {defaultSections(hash).map((section) => {
                return (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className='border-gray-200 data-[state=open]:border-none'
                  >
                    <AccordionTrigger className='flex text-left gap-2 hover:bg-gray-100 p-2 w-full rounded-lg decoration-transparent data-[state=open]:bg-gray-200 data-[state=open]:rounded-b-none'>
                      <div className='flex gap-2'>
                        <Image
                          src={section.image}
                          alt='Section layout'
                          width={100}
                          height={100}
                          className='rounded-md border border-gray-200 '
                        />
                        <div className='w-full'>
                          <span className='font-semibold text-sm'>
                            {section.label}
                          </span>
                          <p className='text-xs font-light text-black/60'>
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='bg-gray-100 rounded-b-lg'>
                      <div className='flex flex-col space-y-2 ml-0 pt-2'>
                        {section.variants.map((variant) => (
                          <button
                            key={variant.id}
                            className='flex text-left gap-2 p-2 rounded-md'
                            onClick={() => {
                              onLayoutSelect(section.name, variant.name)
                              setIsOpened(false)
                            }}
                          >
                            <div className=''>
                              <Image
                                src={variant.image}
                                alt='Variant layout'
                                width={100}
                                height={100}
                                className='rounded-md border border-gray-200'
                              />
                            </div>
                            <div>
                              <span className='font-semibold text-sm'>
                                {variant.label}
                              </span>
                              <p className='text-xs font-light text-black/60'>
                                {variant.description}
                              </p>
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
