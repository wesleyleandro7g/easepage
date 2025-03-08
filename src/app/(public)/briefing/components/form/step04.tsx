/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { InputWithLabel } from '@/components/input-label'
import { InputTextArea } from '@/components/input-textarea'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

type Step04Props = {
  form: any
}

export function Step04({ form }: Step04Props) {
  return (
    <section className='flex flex-col gap-8 max-w-3xl items-center text-center'>
      <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight animate__animated animate__fadeInUp gradient-text-white'>
        Fale um pouco sobre o seu negócio
      </h1>
      <div className='space-y-4 w-full text-start animate__animated animate__fadeInUp'>
        <FormField
          control={form?.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel
                  label='Qual título devemos dar ao seu site:'
                  type='text'
                  placeholder='Ex: Loja da Maria'
                  maxLength={40}
                  wrapperClassName='max-w-full'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-white'>
                {form.watch('title').length}/40
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription className='text-white'>
                {form.watch('description').length}/280
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  )
}
