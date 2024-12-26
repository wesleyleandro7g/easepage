/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Check } from 'lucide-react'

type Step03Props = {
  form: any
  nextStep: any
}

const projectsCover = [
  {
    id: 1,
    src: '/assets/site-cover/tuany-project-2.png',
    alt: 'Tuany Miranda Project',
    slug: 'tuany-miranda-2',
  },
  {
    id: 2,
    src: '/assets/site-cover/james-project.png',
    alt: 'James Moto Shop Project',
    slug: 'james-moto-shop',
  },
  {
    id: 3,
    src: '/assets/site-cover/farol-project.png',
    alt: 'Farol Contabilidade Project',
    slug: 'farol-contabilidade',
  },
  {
    id: 4,
    src: '/assets/site-cover/ismael-project.png',
    alt: 'Ismael Costa Project',
    slug: 'ismael-costa',
  },
  {
    id: 5,
    src: '/assets/site-cover/tecport-project.png',
    alt: 'TecPort Project',
    slug: 'tecport',
  },
  {
    id: 6,
    src: '/assets/site-cover/celia-project.png',
    alt: 'Celia Cannavino Project',
    slug: 'celia-cannavino',
  },
  {
    id: 7,
    src: '/assets/site-cover/wesley-project.png',
    alt: 'Wesley Leandro Project',
    slug: 'wesley-leandro',
  },
  {
    id: 8,
    src: '/assets/site-cover/tuany-project.png',
    alt: 'Tuany Miranda Project',
    slug: 'tuany-miranda',
  },
  {
    id: 9,
    src: '/assets/site-cover/gsat-project.png',
    alt: 'GSAT Project',
    slug: 'gsat',
  },
  {
    id: 10,
    src: '/assets/site-cover/finsy-project.png',
    alt: 'Finsy Project',
    slug: 'finsy',
  },
  {
    id: 11,
    src: '/assets/site-cover/advocacia-project.png',
    alt: 'Finsy Project',
    slug: 'advocacia',
  },
  {
    id: 12,
    src: '/assets/site-cover/better-project.png',
    alt: 'Finsy Project',
    slug: 'better',
  },
  {
    id: 13,
    src: '/assets/site-cover/crypto-project.png',
    alt: 'Finsy Project',
    slug: 'crypto',
  },
  {
    id: 14,
    src: '/assets/site-cover/galaxy-project.png',
    alt: 'Finsy Project',
    slug: 'galaxy',
  },
]

export function Step03({ form, nextStep }: Step03Props) {
  return (
    <section className='flex flex-col gap-8 max-w-5xl items-center text-center'>
      <h1 className='text-3xl md:text-6xl font-extrabold tracking-tight animate__animated animate__fadeInUp text-headline'>
        Qual desses sites você mais gosta?
      </h1>
      <div className='space-y-8 max-w-3xl w-full'>
        <FormField
          control={form.control}
          name='model'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 w-full animate__animated animate__fadeInUp'>
                  {projectsCover.map((project) => (
                    <label
                      key={project.id}
                      className={`flex flex-col items-center justify-center w-full p-4 h-28 md:h-36 rounded-lg border border-black/20 bg-black/10 cursor-pointer font-semibold text-sm data-[checked=true]:border-2 data-[checked=true]:border-emerald-500 data-[checked=true]:text-white transition`}
                      data-checked={field.value === project.slug}
                      style={{
                        backgroundImage: `url(${project.src})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      {field.value === project.slug && (
                        <Check className='text-emerald-500 w-10 h-10' />
                      )}
                      <input
                        type='radio'
                        value={project.slug}
                        checked={field.value === project.slug}
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
