/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Check,
  MessageCircleMore,
  Palette,
  TextCursorInput,
  TypeOutline,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { themes, setTheme } from '@/config/theme'
import type { themeType } from '@/config/theme/theme'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form'
import { InputWithLabel } from '../../input-label'
import { InputTextArea } from '../../input-textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { configFormScheme } from './form-scheme'

interface ConfigOptionsProps {
  osPublish: () => void
  form: any
  isSubmitting: boolean
}

export function ConfigOptions({ isSubmitting }: ConfigOptionsProps) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])

  const form = useForm({
    resolver: zodResolver(configFormScheme),
    defaultValues: {
      type: 'digital-product',
      style: 'modern-minimalist',
      theme: 'sunrise',
      title: '',
      slogan: '',
      whatsapp: '',
      whatsapp_message:
        'Olá, vim pelo seu site e quero conhecer melhor a sua empresa.',
    },
  })

  function handleChangeTheme(theme: themeType) {
    setTheme(theme)
    setSelectedTheme(theme)
    form.setValue('theme', theme)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as themeType

      setTheme(storedTheme ? storedTheme : themes[0])
      setSelectedTheme(storedTheme ? storedTheme : themes[0])
      form.setValue('theme', storedTheme ? storedTheme : themes[0])
    }
  }, [])

  return (
    <Popover>
      <PopoverTrigger className='bg-gradient-to-bl from-[#F8ACFF] to-[#FFF95B] p-2 rounded-full shadow-xl fixed right-5 bottom-8'>
        <Zap className='w-8 h-8 fill-[#D9D9D9]' />
      </PopoverTrigger>
      <Form {...form}>
        <PopoverContent className='w-screen max-w-full md:max-w-sm shadow-none mx-auto bg-transparent border-0'>
          <div className='flex flex-col gap-2 p-4 w-full bg-white shadow-xl rounded-lg border outline-none relative'>
            <div className='flex flex-col gap-0'>
              <h5 className='text-md text-black font-semibold'>
                Configure o seu site
              </h5>
              <span className='text-xs font-light text-black/70'>
                Clique em um ítem abaixo para expandir e configurar
              </span>
            </div>
            <Accordion type='single' collapsible>
              <AccordionItem value='name' className='border-b border-white/20'>
                <AccordionTrigger className='text-black py-2'>
                  <div className='flex items-center gap-2'>
                    <TextCursorInput />
                    <span className='text-sm'>Título e slogan</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='text-black/70 text-start'>
                  <div>
                    <div className='space-y-4 max-w-3xl w-full text-start animate__animated animate__fadeInUp'>
                      <FormField
                        control={form?.control}
                        name='title'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputWithLabel
                                label='Título do seu site'
                                type='text'
                                placeholder='Ex: Loja da Maria'
                                maxLength={30}
                                wrapperClassName='max-w-full'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {form.watch('title').length}/30
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form?.control}
                        name='slogan'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputTextArea
                                className='min-h-[80px]'
                                label='Adicione um slogan:'
                                placeholder='Ex: A melhor da cidade!'
                                maxLength={40}
                                wrapperClassName='max-w-full'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {form.watch('slogan').length}/40
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value='themes'
                className='border-b border-white/20'
              >
                <AccordionTrigger className='text-black py-2'>
                  <div className='flex items-center gap-2'>
                    <Palette />
                    <span className='text-sm'>Tema e cores</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='text-black/70 text-start'>
                  <div className='grid grid-cols-6 gap-2'>
                    {themes.map((theme: themeType) => {
                      return (
                        <label
                          key={theme}
                          className={`flex items-center justify-center w-full h-[62px] rounded-lg border border-black/20 data-[isSubmitting=true]:opacity-50 ${theme}`}
                          data-isSubmitting={isSubmitting}
                        >
                          <input
                            type='radio'
                            name='theme'
                            value={theme}
                            className='hidden'
                            onChange={() => handleChangeTheme(theme)}
                            disabled={isSubmitting}
                          />
                          {selectedTheme === theme && (
                            <Check className='text-[#797979]' />
                          )}
                        </label>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='fonte' className='border-b border-white/20'>
                <AccordionTrigger className='text-black py-2'>
                  <div className='flex items-center gap-2'>
                    <TypeOutline />
                    <span className='text-sm'>Fonte dos textos</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='text-black/70 text-start'>
                  <div>
                    <span className='text-sm'>Fontes</span>
                    <div className='grid grid-cols-6 gap-2'></div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value='whastapp'
                className='border-b border-white/20'
              >
                <AccordionTrigger className='text-black py-2'>
                  <div className='flex items-center gap-2'>
                    <MessageCircleMore />
                    <span className='text-sm'>Botão de WhatsApp</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='text-black/70 text-start'>
                  <div>
                    <div className='space-y-4 max-w-3xl w-full text-start animate__animated animate__fadeInUp'>
                      <FormField
                        control={form?.control}
                        name='whatsapp'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputWithLabel
                                label='WhatsApp da sua empresa:'
                                type='text'
                                placeholder='Ex: (11) 99999-9999'
                                maxLength={40}
                                wrapperClassName='max-w-full'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form?.control}
                        name='whatsapp_message'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputTextArea
                                className='min-h-[80px]'
                                label='Mensagem inicial:'
                                placeholder='Ex: Olá, vim pelo seu site e quero conhecer melhor a sua empresa.'
                                maxLength={80}
                                wrapperClassName='max-w-full'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {form.watch('whatsapp_message')?.length}/80
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              className='w-full gap-2 data-[isSubmitting=true]:animate-pulse'
              data-isSubmitting={isSubmitting}
              disabled={isSubmitting}
              type='button'
            >
              {isSubmitting ? 'Publicando...' : 'Publicar meu site'}
              <Zap
                className='w-6 h-6 data-[isSubmitting=true]:animate-spin'
                data-isSubmitting={isSubmitting}
              />
            </Button>
            <div className='absolute bottom-[-7px] right-[6%] transform -translate-x-[0%] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white rounded-t-sm'></div>
          </div>
        </PopoverContent>
      </Form>
    </Popover>
  )
}
