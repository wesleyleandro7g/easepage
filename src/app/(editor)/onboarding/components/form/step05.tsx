/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { InputWithLabel } from '@/components/input-label'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

type Step05Props = {
  form: any
}

export function Step05({ form }: Step05Props) {
  return (
    <section className='flex flex-col gap-8 max-w-5xl items-center text-center'>
      <h1 className='text-3xl md:text-6xl font-extrabold tracking-tight animate__animated animate__fadeInUp text-headline'>
        Última etapa!
      </h1>
      <div className='space-y-4 max-w-3xl w-full text-start animate__animated animate__fadeInUp'>
        <FormField
          control={form?.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel
                  label='Seu nome:'
                  type='text'
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel
                  label='Seu melhor email:'
                  type='email'
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
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel
                  label='Seu telefone:'
                  type='tel'
                  wrapperClassName='max-w-full'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  )
}
