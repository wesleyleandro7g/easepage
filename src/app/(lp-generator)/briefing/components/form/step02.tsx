/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormControl, FormField, FormItem } from '@/components/ui/form'

type Step02Props = {
  form: any
  nextStep: any
}

const siteStyle = [
  {
    id: 1,
    name: 'Moderno e minimalista 🌿',
    slug: 'modern-minimalist',
  },
  {
    id: 2,
    name: 'Colorido e vibrante 🌈',
    slug: 'colorful-vibrant',
  },
  {
    id: 3,
    name: 'Sofisticado e elegante 💅',
    slug: 'sophisticated-elegant',
  },
  {
    id: 4,
    name: 'Divertido e descontraído 😄',
    slug: 'fun-relaxed',
  },
  {
    id: 5,
    name: 'Outro 🤔',
    slug: 'other',
  },
]

export function Step02({ form, nextStep }: Step02Props) {
  return (
    <section className='flex flex-col gap-8 max-w-5xl items-center text-center'>
      <h1 className='text-3xl md:text-6xl font-extrabold tracking-tight animate__animated animate__fadeInUp text-headline'>
        Qual estilo visual mais combina com o seu negócio?
      </h1>
      <div className='space-y-8 max-w-3xl w-full'>
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
                      className='flex flex-col items-center justify-center w-full p-4 h-28 rounded-lg bg-black/10 cursor-pointer font-semibold text-sm data-[checked=true]:bg-black data-[checked=true]:text-white transition'
                      data-checked={field.value === style.slug}
                    >
                      {style.name}
                      <input
                        type='radio'
                        value={style.slug}
                        checked={field.value === style.slug}
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
