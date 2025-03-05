'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaymentButton } from '@/components/payment-button'

const bennefits = [
  { title: 'Site no ar por 1 ano', active: true },
  { title: 'Temas profissionais', active: true },
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

export function PriceTable() {
  const [period, setPeriod] = useState('yearly')

  const searchParams = useSearchParams()

  const pageId = searchParams.get('page_id')

  return (
    <Tabs defaultValue='yearly' onValueChange={setPeriod}>
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
          <PaymentButton
            recurrence_type={period as 'yearly' | 'monthly' | 'quarterly'}
            page_id={pageId!}
          >
            Assinar agora
          </PaymentButton>
        </div>
      </div>
    </Tabs>
  )
}
