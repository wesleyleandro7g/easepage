/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'

import { InputWithLabel } from '../input-label'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerIndicator,
  DrawerDescription,
  DrawerOverlay,
} from '../ui/drawer'
import { FormField, FormItem, FormControl, FormMessage, Form } from '../ui/form'
import { useSections } from '@/hooks/useSections'

interface ManageLinksProps {
  sectionId: string
  buttonId?: string
  children: ReactNode
}

const formSchema = z.object({
  link: z.string().url(),
})

type formSchemaType = z.infer<typeof formSchema>

export function ManageLinks(props: ManageLinksProps) {
  const { children, sectionId } = props

  const { addSectionLink, sections } = useSections()

  const [isMobile, setIsMobile] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  // const [buttonLabel, setButtonLabel] = useState('')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: sections.find((section) => section.id === sectionId)?.link || '',
    },
  })

  const onSubmit = (data: formSchemaType) => {
    addSectionLink(sectionId, data.link)
    setIsOpened(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // useEffect(() => {
  //   if (window !== undefined) {
  //     if (buttonId) {
  //       const value = document.getElementById(buttonId)?.textContent
  //       setButtonLabel(value || '')
  //     }
  //   }
  // }, [sectionId, buttonId])

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
            Altere os link da seção
          </DrawerTitle>
          <DrawerDescription className='text-start text-black/60 font-light'>
            Você pode adicionar um link para o seu WhatsApp, página de
            pagamentos, ou qualquer outro link que desejar!
          </DrawerDescription>
          <div className='flex flex-col space-y-2 justify-start mt-4'>
            <span className='text-start text-black/80 font-normal text-md'>
              Observações:
            </span>
            <ul>
              <li className='text-start text-black/60 font-light text-sm'>
                1. O link abre em uma nova aba.
              </li>
              <li className='text-start text-black/60 font-light text-sm'>
                2. O link é injetado no botão da seção.
              </li>
              <li className='text-start text-black/60 font-light text-sm'>
                3. O link é acessível apenas no modo de visualização ou no site
                publicado.
              </li>
              <li className='text-start text-black/60 font-light text-sm'>
                4. É preciso publicar as modificações para o link ser alterado.
              </li>
            </ul>
          </div>
          <X
            className='cursor-pointer absolute top-0 md:top-3 right-5'
            onClick={() => setIsOpened(false)}
          />
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='px-4 space-y-4'>
              <FormField
                control={form?.control}
                name='link'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label='Adicione o link para o botão:'
                        type='url'
                        placeholder='https://seulink.com.br'
                        maxLength={300}
                        wrapperClassName='max-w-full'
                        className='text-black/80 border-black/60 focus-visible:border-black'
                        labelClassName='text-black/80'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter>
              <Button type='submit' className='w-full'>
                Adicionar Link
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
