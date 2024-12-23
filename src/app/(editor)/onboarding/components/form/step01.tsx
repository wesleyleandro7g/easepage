/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormControl, FormField, FormItem } from '@/components/ui/form'

type Step01Props = {
  form: any
  nextStep: any
}

const productType = [
  {
    id: 1,
    name: 'Produto digital 💻',
    slug: 'digital-product',
  },
  {
    id: 2,
    name: 'Produto físico 📦',
    slug: 'physical-product',
  },
  {
    id: 3,
    name: 'Serviço ou consultoria 🛠️',
    slug: 'service',
  },
  {
    id: 4,
    name: 'Informações da empresa 🏢',
    slug: 'company-info',
  },
  {
    id: 5,
    name: 'Agendamentos ou delivery 📅',
    slug: 'scheduling',
  },
  {
    id: 6,
    name: 'Outro 🤔',
    slug: 'other',
  },
]

export function Step01({ form, nextStep }: Step01Props) {
  return (
    <section className='flex flex-col gap-8 max-w-5xl items-center text-center w-full'>
      <h1 className='text-3xl md:text-6xl font-extrabold tracking-tight animate__animated animate__fadeInUp text-headline'>
        O que você quer vender ou exibir no seu site?
      </h1>
      <div className='space-y-8 max-w-3xl w-full animate__animated animate__fadeInUp'>
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
                      {product.name}
                      <input
                        type='radio'
                        value={product.slug}
                        checked={field.value === product.slug}
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
