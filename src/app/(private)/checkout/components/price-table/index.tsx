'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUser } from '@/hooks/useUser'
// import { PaymentButton } from '@/components/payment-button'

const links = {
  monthly: process.env.NEXT_PUBLIC_CHECKOUT_MONTLY_PLAN_URL,
  quarterly: process.env.NEXT_PUBLIC_CHECKOUT_QUARTERLY_PLAN_URL,
  yearly: process.env.NEXT_PUBLIC_CHECKOUT_YEARLY_PLAN_URL,
}

const bennefits = [
  { title: 'Temas profissionais', active: true },
  { title: 'IA Exclusiva', active: true },
  { title: 'Domínio personalizado', active: false },
  { title: 'Dashboard analítica', active: false },
  { title: 'Upload de imagens', active: false },
  { title: 'Upload de vídeos', active: false },
  { title: 'Criação de formulários', active: false },
  { title: 'Criação de QUIZ', active: false },
  { title: 'Gerador de depoimentos', active: false },
  { title: 'Chatbot integrado', active: false },
  { title: 'Teste A/B', active: false },
]

interface PriceTableProps {
  src?: string | null
}

export function PriceTable({ src }: PriceTableProps) {
  const { user } = useUser()

  const [period, setPeriod] = useState<'yearly' | 'monthly' | 'quarterly'>(
    'yearly'
  )

  const prepolutated = `?email=${user?.email}&name=${user?.user_metadata.first_name}&phone=${user?.user_metadata.phone}&src=${src}`

  return (
    <Tabs
      defaultValue='yearly'
      onValueChange={(value) =>
        setPeriod(value as 'yearly' | 'monthly' | 'quarterly')
      }
    >
      <div className='flex flex-col items-center gap-5 w-full'>
        <div
          data-primary={period === 'yearly'}
          className='mt-5 flex flex-col items-start gap-5 p-6 rounded-3xl max-w-sm md:max-w-md w-full data-[primary=true]:bg-gradient-to-bl from-[#3E26E8] to-[#7331F1] bg-[#171E2C] shadow-xl animate__animated animate__bounceInUp'
        >
          <TabsList className='grid w-full grid-cols-3 '>
            <TabsTrigger
              className='data-[state=active]:bg-gradient-to-bl from-[#3E26E8] to-[#7331F1]'
              value='yearly'
            >
              Anual
            </TabsTrigger>
            <TabsTrigger
              className='data-[state=active]:bg-[#171E2C]'
              value='quarterly'
            >
              Trimestral
            </TabsTrigger>
            <TabsTrigger
              className='data-[state=active]:bg-[#171E2C]'
              value='monthly'
            >
              Mensal
            </TabsTrigger>
          </TabsList>
          <div className='w-full flex flex-col items-start'>
            <TabsContent value='monthly'>
              <h2 className='text-white text-6xl font-extrabold text-start'>
                R$49
                <span className='text-sm font-light'>,00/mês</span>
              </h2>
            </TabsContent>
            <TabsContent value='quarterly'>
              <h2 className='text-white text-6xl font-extrabold text-start'>
                R$39
                <span className='text-sm font-light'>,00/mês</span>
              </h2>
            </TabsContent>
            <TabsContent value='yearly'>
              <h2 className='text-white text-6xl font-extrabold text-start'>
                R$19
                <span className='text-sm font-light'>,00/mês</span>
              </h2>
            </TabsContent>
            <p className='text-white/70 text-sm'>
              Crie sites como um profissional
            </p>
          </div>
          <ul className='text-start flex flex-col gap-2'>
            {bennefits.map((bennefit) => (
              <li
                key={bennefit.title}
                className='text-white text-sm inline-flex items-center gap-2'
              >
                <Check className='text-emerald-400 w-5 h-5' /> {bennefit.title}{' '}
                {!bennefit.active && (
                  <span className='text-white/40'>(em breve)</span>
                )}
              </li>
            ))}
          </ul>
          <a
            href={`${links[period]}${prepolutated}`}
            className='flex items-center justify-center gap-2 text-md font-bold px-8 py-3 rounded-lg w-full bg-white text-[#171E2C] shadow-xl hover:bg-black/90 animate__animated focus:bg-white hover:bg-white cursor-pointer'
          >
            Assinar agora
          </a>
          {/* <PaymentButton
            recurrence_type={period as 'yearly' | 'monthly' | 'quarterly'}
            page_id={page_id}
            user_id={user_id}
          >
            Assinar agora
          </PaymentButton> */}
        </div>
      </div>
    </Tabs>
  )
}
