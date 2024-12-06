'use client'

// import { Zap, Type, Palette, Hexagon } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import contentV0 from './content-v0.json'
import { EditHeroBtn } from '@/components/drawers/edit-hero-btn'
import {
  Form,
  FormAlert,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { CustomAlert } from '@/components/custom-alert'

const formSchema = z.object({
  headline: z
    .string()
    .min(
      30,
      'A sua HEADLINE está muito curta! Fale sobre o resultado imediato que você irá gerar.'
    )
    .max(
      80,
      'A sua HEADLINE está muito grande! Mantenha ela um pouco menor e mais direta.'
    ),
  subheadline: z
    .string()
    .min(
      30,
      'A sua SUBHEADLINE está muito curta! Fale sobre o resultado imediato que você irá gerar.'
    )
    .max(
      240,
      'A sua SUBHEADLINE está muito grande! Mantenha ela um pouco menor e mais direta.'
    ),
  heroButtonText: z.string().min(10, 'O texto do botão não pode estar vazio.'),
  heroButtonLink: z
    .string({ required_error: 'O link do botão é obrigatório.' })
    .url('O link do botão deve ser uma URL válida.'),
})

// const formSchemaType = z.infer<typeof formSchema>

function useAutoResizeTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
      textarea.addEventListener('input', adjustHeight)
      adjustHeight()
      return () => textarea.removeEventListener('input', adjustHeight)
    }
  }, [])

  return textareaRef
}

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
    },
  })

  function onSubmit(data: unknown) {
    console.log(data)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-yellow-100 relative'>
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
                        className='text-5xl sm:text-6xl font-bold leading-[3rem] tracking-tight text-black max-w-full bg-transparent break-words overflow-hidden whitespace-normal resize-none'
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
                        className='text-md font-normal tracking-tight text-gray-600 w-full max-w-full bg-transparent break-words overflow-hidden whitespace-normal resize-none'
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

              <button>enviar</button>
            </div>
          </main>
        </form>
      </Form>
    </div>
  )
}
