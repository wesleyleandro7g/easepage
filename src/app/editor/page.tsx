'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditHeroBtn } from '@/components/drawers/edit-hero-btn'
import {
  Form,
  FormAlert,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { CustomAlert } from '@/components/custom-alert'
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea'
import { formSchema, FormSchemaType } from './formSchema'
import { FloatButtonPopover } from '@/components/float-button-poppover'

import { supabase } from '@/supabase/client'

import { themes, setTheme } from '@/config/theme'
import type { themeType } from '@/config/theme/theme'
import contentV0 from './content-v0.json'

export default function PageEditor() {
  const headlineTextareaRef = useAutoResizeTextarea()
  const subheadlineTextareaRef = useAutoResizeTextarea()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: contentV0.heroSection.headline.text,
      subheadline: contentV0.heroSection.subheadline.text,
      heroButtonText: contentV0.heroSection.heroButtonCTA.text,
      heroButtonLink: '',
      theme: themes[0],
    },
  })

  async function onSubmit(data: FormSchemaType) {
    const { theme, ...dataToSaveInJson } = data
    const dataJSON = JSON.stringify(dataToSaveInJson, null, 2)

    const result = await supabase
      .from('pages')
      .insert({
        title: 'Página teste 2',
        description: 'Descrição teste 2',
        slug: 'pagina-teste-2',
        theme,
        page_structure: dataJSON,
      })
      .select('*')

    console.log(result)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as themeType
      if (storedTheme) {
        setTheme(storedTheme ? storedTheme : themes[0])
      }
    }
  }, [])

  return (
    <div className='min-h-screen relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <main className='pt-20 pb-16 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl text-left'>
              <FormField
                control={form.control}
                name='headline'
                render={({ field }) => (
                  <FormItem>
                    <FormAlert />
                    <FormControl>
                      <textarea
                        className='text-5xl sm:text-6xl font-bold leading-[3rem] tracking-tight text-headline max-w-full bg-transparent break-words overflow-hidden whitespace-normal resize-none'
                        {...field}
                        ref={headlineTextareaRef}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='subheadline'
                render={({ field }) => (
                  <FormItem>
                    <FormAlert />
                    <FormControl>
                      <textarea
                        className='text-md font-normal tracking-tight text-subheadline w-full max-w-full bg-transparent break-words overflow-hidden whitespace-normal resize-none'
                        {...field}
                        ref={subheadlineTextareaRef}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='mt-10 flex flex-col sm:flex-row items-start gap-3'>
                {(form.formState.errors.heroButtonText ||
                  form.formState.errors.heroButtonLink) && (
                  <CustomAlert>
                    <span>
                      Ops! Tem algum problema nesse botão!
                      <br />
                      Entre aqui e dê uma olhada
                    </span>
                  </CustomAlert>
                )}
                <EditHeroBtn form={form}>
                  {form.watch('heroButtonText')}
                </EditHeroBtn>
                <p className='text-sm text-gray-600'>
                  +500 pessoas amaram este produto
                </p>
              </div>
            </div>
          </main>
        </form>
      </Form>
      <FloatButtonPopover onClick={form.handleSubmit(onSubmit)} />
    </div>
  )
}
