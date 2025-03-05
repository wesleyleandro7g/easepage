import { ReactNode } from 'react'

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

import { defaultSections } from '../builder/utils/sections/default'

interface SelectSectionLayoutVariantProps {
  children: ReactNode
  layoutName: string
  onLayoutSelect: (layoutVariant: string) => void
}

export function SelectSectionLayoutVariant(
  props: SelectSectionLayoutVariantProps
) {
  const { children, onLayoutSelect, layoutName } = props

  return (
    <Drawer direction='left'>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerOverlay className='fixed inset-0 bg-black/40' />
      <DrawerContent className='w-full h-screen rounded-t-[10px] md:rounded-t-none md:w-[400px]'>
        <DrawerIndicator className='hidden' />
        <DrawerHeader>
          <div>
            <DrawerTitle>Selecione o estilo da seção</DrawerTitle>
            <DrawerDescription>
              Não se preocupe, você pode alterar o estilo da seção a qualquer
              momento.
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <div className='flex flex-col space-y-4 px-4'>
          <div className='flex flex-col space-y-4'>
            {defaultSections
              .find((sectionLayout) => sectionLayout.name === layoutName)
              ?.variants.map((variant) => (
                <button
                  key={variant.id}
                  className='flex text-left gap-2 bg-gray-100 p-2 rounded-md'
                  onClick={() => onLayoutSelect(variant.name)}
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
        </div>
      </DrawerContent>
    </Drawer>
  )
}
