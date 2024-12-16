/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { themes } from '@/config/theme'
import { Check } from 'lucide-react'

type Step03Props = {
  form: any
  nextStep: any
}

export function Step03({ form, nextStep }: Step03Props) {
  return (
    <section className='flex flex-col gap-8 max-w-5xl items-center text-center'>
      <h1 className='text-3xl md:text-6xl font-extrabold tracking-tight animate__animated animate__fadeInUp text-headline'>
        Escolha o tema que mais combina com o seu negócio
      </h1>
      <div className='space-y-8 max-w-3xl w-full'>
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-5 gap-2 w-full animate__animated animate__fadeInUp'>
                  {themes.map((theme) => (
                    <label
                      key={theme}
                      className={`flex flex-col items-center justify-center w-full p-4 h-20 rounded-lg border border-black/20 bg-black/10 cursor-pointer font-semibold text-sm data-[checked=true]:bg-black data-[checked=true]:text-white transition ${theme}`}
                      data-checked={field.value === theme}
                    >
                      {field.value === theme && (
                        <Check className='text-[#797979]' />
                      )}
                      <input
                        type='radio'
                        value={theme}
                        checked={field.value === theme}
                        onChange={(...args) => {
                          field.onChange(...args)
                          setTimeout(() => {
                            nextStep()
                          }, 500)
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
      </div>
    </section>
  )
}
