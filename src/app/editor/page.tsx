'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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

import { supabase } from '@/db/supabase/client'
import { useToast } from '@/hooks/use-toast'

import { themes, setTheme } from '@/config/theme'
import type { themeType } from '@/config/theme/theme'
import contentV0 from './content-v0.json'

export default function PageEditor() {
  const router = useRouter()
  const headlineTextareaRef = useAutoResizeTextarea()
  const subheadlineTextareaRef = useAutoResizeTextarea()

  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    disabled: isSubmitting,
    defaultValues: {
      email: '',
      name: '',
      title: '',
      description: '',
      headline: contentV0.heroSection.headline.text,
      subheadline: contentV0.heroSection.subheadline.text,
      heroButtonText: contentV0.heroSection.heroButtonCTA.text,
      heroButtonLink: '',
    },
  })

  async function onSubmit(data: FormSchemaType) {
    const { title, description, ...dataToSaveInJson } = data
    const dataJSON = JSON.stringify(dataToSaveInJson, null, 2)

    const storedTheme = localStorage.getItem('theme') as themeType

    const shortUUID = crypto.randomUUID().split('-')[0]
    const password = crypto.randomUUID().split('-')[0]

    setIsSubmitting(true)

    const signUpUser = await supabase.auth.signUp({
      email: data.email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/panel',
        data: {
          first_name: data.name.split(' ')[0],
          last_name: data.name.split(' ')[1],
        },
      },
    })

    if (signUpUser.error) {
      toast({
        title: 'Ops! Algo deu errado',
        description: 'Por favor tente novamente',
        variant: 'destructive',
      })
      setIsSubmitting(false)
      return console.error(signUpUser.error)
    }

    const createdPage = await supabase
      .from('pages')
      .insert({
        title,
        description,
        slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${shortUUID}`,
        theme: storedTheme,
        is_active: true,
        page_structure: dataJSON,
        user_id: signUpUser.data.user?.id,
      })
      .select('id, slug')
      .single()

    setIsSubmitting(false)

    if (createdPage.error) {
      toast({
        title: 'Ops! Algo deu errado ao gerar o seu site',
        description: 'Por favor tente novamente',
        variant: 'destructive',
      })
      return console.error(createdPage.error)
    }

    router.push(
      `/pricing/?slug=${createdPage.data.slug}&pageId=${createdPage.data.id}&userId=${signUpUser.data.user?.id}`
    )
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
        <FloatButtonPopover
          osPublish={form.handleSubmit(onSubmit)}
          form={form}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  )
}
