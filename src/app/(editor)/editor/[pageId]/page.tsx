'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

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
import { FloatButtonPopover } from '@/components/float-button-poppover'

import { supabase } from '@/db/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useFetchPageById } from '@/db/queries/query-page'

import contentV0 from '../content-v0.json'
import { EditorFormSchemeType, editorFormScheme } from './editorFormScheme'

export default function PageEditor() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const { pageId } = useParams()

  const router = useRouter()
  const headlineTextareaRef = useAutoResizeTextarea()
  const subheadlineTextareaRef = useAutoResizeTextarea()

  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data } = useFetchPageById({
    id: pageId as string,
  })

  console.log('Page data: ', data)

  const form = useForm({
    resolver: zodResolver(editorFormScheme),
    disabled: isSubmitting,
    defaultValues: {
      theme: data?.theme,
      headline: contentV0.heroSection.headline.text,
      subheadline: contentV0.heroSection.subheadline.text,
      heroButtonText: contentV0.heroSection.heroButtonCTA.text,
      heroButtonLink: '',
    },
  })

  async function onSubmit(data: EditorFormSchemeType) {
    const { theme, ...dataToSaveInJson } = data
    const dataJSON = JSON.stringify(dataToSaveInJson, null, 2)

    setIsSubmitting(true)

    const updatedPage = await supabase
      .from('pages')
      .update({
        theme,
        is_active: true,
        page_structure: dataJSON,
      })
      .select('id, slug')
      .single()

    setIsSubmitting(false)

    if (updatedPage.error) {
      toast({
        title: 'Ops! Algo deu errado ao gerar o seu site',
        description: 'Por favor tente novamente',
        variant: 'destructive',
      })
      return console.error(updatedPage.error)
    }

    router.push(`/pricing/?pageId=${updatedPage.data.id}&userId=${userId}`)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.className = data?.theme
    }
  }, [data])

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
