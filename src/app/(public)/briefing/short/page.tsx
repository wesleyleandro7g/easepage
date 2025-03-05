'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputTextArea } from '@/components/input-textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContentGeneration } from '@/hooks/useContentGeneration'
import { useRouter } from 'next/navigation'
import { usePageContent } from '@/context/page-context'
import { useSections } from '@/hooks/useSections'

const formSchema = z.object({
  description: z.string().max(280),
})

type formType = z.infer<typeof formSchema>

export default function TempPage() {
  const router = useRouter()
  const { generateContent, isLoading } = useContentGeneration()
  const { setSections } = usePageContent()
  const { convertSectionsInObject } = useSections()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description:
        'Somos uma empresa especializada em instalação e manutenção de ar condicionando',
    },
  })

  async function handleSectionsContentGeneration(data: formType) {
    const { sectionsWithContent } = await generateContent({
      context: data.description,
      sections: [
        { name: 'hero', variant: 'Default' },
        { name: 'features', variant: 'Default' },
        // { name: 'pricing', variant: 'Default' },
        // { name: 'testimonials', variant: 'Default' },
        // { name: 'cta', variant: 'Default' },
      ],
    })

    setSections(sectionsWithContent)
    const dataObject = convertSectionsInObject(sectionsWithContent)

    // Salvar o `dataObject` na tabela pages

    console.log({ dataObject })
    router.push('/editor/')
  }

  return (
    <div className='h-screen w-full flex flex-col gap-2 justify-center items-center'>
      <div className='flex flex-col max-w-3xl w-full gap-4 items-center text-left'>
        <h1 className='text-2xl font-bold'>Short Briefing</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSectionsContentGeneration)}
            className='w-full'
          >
            <FormField
              control={form?.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputTextArea
                      className='min-h-[200px]'
                      label='Adicione uma breve descrição sobre o negócio, produto ou serviço:'
                      placeholder='Ex: Somos uma loja de roupas femininas que preza pela qualidade e conforto.'
                      maxLength={280}
                      wrapperClassName='max-w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.watch('description').length}/280
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='w-full flex justify-end'>
              <button
                className='px-4 py-2 bg-black text-white rounded-md disabled:bg-black/10 disabled:text-black/60'
                disabled={form.watch('description').length < 10}
                type='submit'
              >
                {isLoading ? 'Loading...' : 'Generate Sections'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
