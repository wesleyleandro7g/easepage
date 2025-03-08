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
import { siteStyle } from '@/utils/pageItems'

type Step02Props = {
  form: any
  nextStep: any
}

export function Step02({ form, nextStep }: Step02Props) {
  return (
    <section className='flex flex-col gap-8 max-w-3xl items-center text-center'>
      <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight animate__animated animate__fadeInUp gradient-text-white'>
        Qual estilo visual mais combina com o seu negócio?
      </h1>
      <div className='space-y-8 w-full'>
        <FormField
          control={form.control}
          name='style'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full animate__animated animate__fadeInUp'>
                  {siteStyle.map((style) => (
                    <label
                      key={style.id}
                      className='flex flex-col items-center justify-center w-full p-4 h-28 rounded-lg text-white cursor-pointer font-semibold text-sm data-[checked=true]:bg-white data-[checked=true]:text-black data-[checked=true]:border-white transition border border-white/20 hover:border-white'
                      data-checked={field.value === style.slug}
                    >
                      {`${style.name} ${style.emoji}`}
                      <input
                        type='radio'
                        value={style.slug}
                        checked={field.value === style.slug}
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

        {form.watch('style') === 'other' && (
          <FormField
            control={form.control}
            name='customStyle'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex flex-col items-start justify-center w-full text-left'>
                    <InputWithLabel
                      label='Qual o tipo de estilo?'
                      wrapperClassName='max-w-full'
                      placeholder='Qual estilo visual mais combina com o seu negócio?'
                      maxLength={60}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className='text-left' />
                <FormDescription className='text-left text-white'>
                  {form.watch('customStyle')?.length || 0}/60
                </FormDescription>
              </FormItem>
            )}
          />
        )}
      </div>
    </section>
  )
}
