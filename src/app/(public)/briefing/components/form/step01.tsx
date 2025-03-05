/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { InputWithLabel } from '@/components/input-label'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { productType } from '@/utils/pageItems'

type Step01Props = {
  form: any
  nextStep: any
}

export function Step01({ form, nextStep }: Step01Props) {
  return (
    <section className='flex flex-col gap-8 max-w-3xl items-center text-center w-full'>
      <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight animate__animated animate__fadeInUp text-headline'>
        O que você quer vender ou exibir no seu site?
      </h1>
      <div className='space-y-8 w-full animate__animated animate__fadeInUp'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full'>
                  {productType.map((product) => (
                    <label
                      key={product.id}
                      className='flex flex-col items-center justify-center w-full p-4 h-28 rounded-lg bg-black/10 cursor-pointer font-semibold text-sm data-[checked=true]:bg-black data-[checked=true]:text-white transition'
                      data-checked={field.value === product.slug}
                    >
                      {`${product.name} ${product.emoji}`}
                      <input
                        type='radio'
                        value={product.slug}
                        checked={field.value === product.slug}
                        onChange={(...args) => {
                          field.onChange(...args)
                          if (args[0].target.value !== 'other') {
                            setTimeout(() => {
                              nextStep()
                            }, 500)
                          }
                        }}
                        className='hidden'
                      />
                    </label>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {form.watch('type') === 'other' && (
          <FormField
            control={form.control}
            name='customType'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex flex-col items-start justify-center w-full text-left'>
                    <InputWithLabel
                      label='Qual o tipo de produto?'
                      wrapperClassName='max-w-full'
                      maxLength={60}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className='text-left' />
                <FormDescription className='text-left'>
                  {form.watch('customType')?.length || 0}/60
                </FormDescription>
              </FormItem>
            )}
          />
        )}
      </div>
    </section>
  )
}
