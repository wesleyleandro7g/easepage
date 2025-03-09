/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Check,
  MessageCircleMore,
  Palette,
  TextCursorInput,
  TypeOutline,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputWithLabel } from '../../input-label'
import { InputTextArea } from '../../input-textarea'

import { configFormSchema, type ConfigFormSchemaType } from './form-schema'

import { usePageContent } from '@/context/page-context'
import { useSections } from '@/hooks/useSections'
import { useToast } from '@/hooks/use-toast'

import { themes } from '@/config/theme'
import { fonts } from '@/config/fonts'
import type { themeType } from '@/config/theme/theme'

import { supabase } from '@/db/supabase/client'

export function ConfigPopup() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [selectedFont, setSelectedFont] = useState(fonts[0].name)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const { pageData, setPageData } = usePageContent()
  const { getSectionsEditedContent } = useSections()

  const searchParams = useSearchParams()

  const pageId = searchParams.get('page_id')
  const isNewProject = searchParams.get('is_new')
  const isEditProject = searchParams.get('is_edit')

  const form = useForm({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      style: pageData?.style || 'modern-minimalist',
      theme: pageData?.theme || themes[0],
      font: pageData?.font || 'Prompt',
      title: pageData?.title || '',
      slogan: pageData?.slogan || '',
      whatsapp: pageData?.whatsapp || '',
      whatsapp_message:
        pageData?.whatsapp_message ||
        'Olá, vim pelo seu site e quero conhecer melhor a sua empresa.',
    },
  })

  function handleChangeTheme(theme: themeType) {
    setSelectedTheme(theme)
    form.setValue('theme', theme)
    setPageData((prev) => ({
      ...prev,
      theme,
    }))
  }

  function handleChangeFont(font: string) {
    setSelectedFont(font)
    form.setValue('font', font)
    setPageData((prev) => ({
      ...prev,
      font,
    }))
  }

  async function onSubmit(data: ConfigFormSchemaType) {
    setIsSubmitting(true)

    const { title, slogan, theme, font, whatsapp, whatsapp_message } = data

    const editedContent = getSectionsEditedContent()

    const updatedPage = await supabase
      .from('pages')
      .update({
        title,
        slogan,
        theme,
        font,
        whatsapp,
        whatsapp_message,
        page_structure: editedContent,
      })
      .eq('id', pageId)

    if (updatedPage.status > 300) {
      setIsSubmitting(false)
      return toast({
        title: 'Ops! Algo deu errado',
        description: 'Por favor tente novamente ou contate o nosso suporte',
        variant: 'destructive',
      })
    }

    setPageData((prev) => ({
      ...prev,
      title,
      slogan,
      theme,
      font,
      whatsapp,
      whatsapp_message,
    }))

    setIsSubmitting(false)

    if (pageData.is_active) {
      return toast({
        title: 'Sucesso!',
        description: 'As alterações foram salvas e publicadas',
        variant: 'success',
      })
    } else {
      router.push(`/checkout?page_id=${pageId}`)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelectedTheme(
        pageData.theme ? (pageData.theme as themeType) : themes[0]
      )
      setSelectedFont(pageData.font ? pageData.font : fonts[0].name)
      form.setValue('font', pageData.font ? pageData.font : fonts[0].name)
      form.setValue('theme', pageData.theme ? pageData.theme : themes[0])
    }
  }, [])

  useEffect(() => {
    form.setValue('title', pageData?.title || '')
    form.setValue('slogan', pageData?.slogan || '')
    form.setValue('whatsapp', pageData?.whatsapp || '')
    form.setValue(
      'whatsapp_message',
      pageData?.whatsapp_message ||
        'Olá, vim pelo seu site e quero conhecer melhor a sua empresa.'
    )
    form.setValue('style', pageData?.style || 'modern-minimalist')
    form.setValue('theme', pageData?.theme || themes[0])
    form.setValue('font', pageData?.font || 'Prompt')
  }, [pageData])

  useEffect(() => {
    setTimeout(() => {
      setShowTips(true)
      setTimeout(() => {
        setShowTips(false)
      }, 16000)
    }, 6000)
  }, [])

  return (
    <Popover>
      <PopoverTrigger
        data-tips={showTips}
        className='animate-gradient p-2 rounded-full data-[tips=true]:rounded-lg shadow-xl fixed right-5 bottom-8 transition-all duration-100'
      >
        <div
          className={`h-[40px] flex items-center justify-center gap-2 rounded-full p-0 w-[40px] data-[tips=true]:w-[280px] data-[tips=true]:h-[380px] transition-all duration-300`}
          data-tips={showTips}
        >
          {showTips && (
            <div
              className='flex flex-col justify-center items-center w-full h-full'
              onClick={() => setShowTips(false)}
            >
              <span className='text-white'>
                👋 Clique aqui para acessar mais configurações e para publicar
                seu site!
              </span>
            </div>
          )}
          <Zap
            data-tips={showTips}
            className='w-8 h-8 flex data-[tips=true]:hidden fill-[#ffffff]'
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-screen max-w-full md:max-w-sm shadow-none mx-auto bg-transparent border-0 ring-0'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 p-4 w-full bg-white shadow-xl rounded-lg border border-gray-200 outline-none relative'>
              <div className='flex flex-col gap-0'>
                <h5 className='text-md text-black font-semibold'>
                  Configure o seu site
                </h5>
                <span className='text-xs font-light text-black/70'>
                  Clique em um ítem abaixo para expandir e configurar
                </span>
              </div>
              <Accordion type='single' collapsible>
                <AccordionItem
                  value='name'
                  className='border-b border-white/20'
                >
                  <AccordionTrigger className='text-black py-2'>
                    <div className='flex items-center gap-2'>
                      <TextCursorInput />
                      <span className='text-sm'>Título e slogan</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='text-black/70 text-start'>
                    <div>
                      <div className='space-y-4 max-w-3xl w-full text-start'>
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
                                  className='text-black/80 border-black/60 focus-visible:border-black'
                                  labelClassName='text-black/80'
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                {form.watch('title')?.length || 0}/30
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
                                  className='min-h-[80px] text-black/80 border-black/60 focus-visible:border-black'
                                  label='Adicione um slogan:'
                                  placeholder='Ex: A melhor da cidade!'
                                  maxLength={40}
                                  wrapperClassName='max-w-full'
                                  labelClassName='text-black/80'
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                {form.watch('slogan')?.length || 0}/40
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
                            className={`flex items-center justify-center w-full h-[62px] rounded-lg border border-black/20 data-[issubmitting=true]:opacity-50 cursor-pointer ${theme}`}
                            data-issubmitting={isSubmitting}
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
                <AccordionItem
                  value='fonte'
                  className='border-b border-white/20'
                >
                  <AccordionTrigger className='text-black py-2'>
                    <div className='flex items-center gap-2'>
                      <TypeOutline />
                      <span className='text-sm'>Fonte dos textos</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='text-black/70 text-start'>
                    <div>
                      <span className='text-sm'>Fontes</span>
                      <div className='grid grid-cols-3 gap-2'>
                        {fonts.map((font) => {
                          return (
                            <label
                              key={font.name}
                              className={`flex items-center justify-center w-full py-2 rounded-lg border border-black/20 data-[issubmitting=true]:opacity-50 data-[selected=true]:bg-gray-300 cursor-pointer`}
                              data-issubmitting={isSubmitting}
                              data-selected={selectedFont === font.name}
                            >
                              <input
                                type='radio'
                                name='font'
                                value={font.name}
                                className='hidden'
                                onChange={() => handleChangeFont(font.name)}
                                disabled={isSubmitting}
                              />
                              <span
                                className={`text-easebg-500 ${font.font.className}`}
                              >
                                {font.name}
                              </span>
                            </label>
                          )
                        })}
                      </div>
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
                      <div className='space-y-4 max-w-3xl w-full text-start'>
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
                                  className='text-black/80 border-black/60 focus-visible:border-black'
                                  labelClassName='text-black/80'
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
                                  className='min-h-[80px] text-black/80 border-black/60 focus-visible:border-black'
                                  label='Mensagem inicial:'
                                  placeholder='Ex: Olá, vim pelo seu site e quero conhecer melhor a sua empresa.'
                                  maxLength={80}
                                  wrapperClassName='max-w-full'
                                  labelClassName='text-black/80'
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                {form.watch('whatsapp_message')?.length || 0}/80
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
                className='w-full gap-2 data-[issubmitting=true]:animate-pulse animate-gradient'
                data-issubmitting={isSubmitting}
                disabled={isSubmitting}
                type='submit'
              >
                {isSubmitting
                  ? 'Publicando...'
                  : pageData.is_active
                  ? 'Publicar alterações'
                  : 'Publicar meu site'}
                <Zap
                  className='w-6 h-6 data-[issubmitting=true]:animate-spin'
                  data-issubmitting={isSubmitting}
                />
              </Button>
              {(isNewProject || isEditProject) && (
                <Link href='/panel'>
                  <Button
                    className='w-full gap-2 data-[issubmitting=true]:animate-pulse bg-transparent text-black border border-black hover:bg-transparent hover:text-black'
                    data-issubmitting={isSubmitting}
                    disabled={isSubmitting}
                    type='button'
                  >
                    Sair do editor
                  </Button>
                </Link>
              )}
              <div className='absolute bottom-[-7px] right-[6%] transform -translate-x-[0%] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white rounded-t-sm'></div>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
