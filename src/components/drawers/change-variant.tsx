import { ReactNode, useEffect, useState } from 'react'
import { X } from 'lucide-react'

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

interface ChangeVariantProps {
  children: ReactNode
  layoutName: string
  onLayoutSelect: (layoutVariant: string) => void
}

export function ChangeVariant(props: ChangeVariantProps) {
  const { children, onLayoutSelect, layoutName } = props

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
            Altere o Layout da Seção
          </DrawerTitle>
          <DrawerDescription className='text-start text-black/60 font-light'>
            O Layout é a disposição dos elementos na seção. Altere como
            preferir, já cuidamos de toda a parte de responsividade para você!
          </DrawerDescription>
          <X
            className='cursor-pointer absolute top-0 md:top-3 right-5'
            onClick={() => setIsOpened(false)}
          />
        </DrawerHeader>

        <div className='flex flex-col space-y-4 px-4'>
          <div className='flex flex-col space-y-4'>
            {defaultSections(hash)
              .find((sectionLayout) => sectionLayout.name === layoutName)
              ?.variants.map((variant) => (
                <button
                  key={variant.id}
                  className='flex text-left gap-2 border-b border-gray-200 pb-2'
                  onClick={() => {
                    onLayoutSelect(variant.name)
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
        </div>
      </DrawerContent>
    </Drawer>
  )
}
