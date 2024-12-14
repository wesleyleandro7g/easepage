'use client'

import { useState } from 'react'

import { InputWithLabel } from '@/components/input-label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MoveRight } from 'lucide-react'

export default function Checkout() {
  const [step, setStep] = useState(2)

  function handleNextStep() {
    if (step === 3) {
      return
    }

    setStep((prevStep) => prevStep + 1)
  }

  function handleClickStep(step: number) {
    setStep(step)
  }

  return (
    <div className='flex flex-col flex-1 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-start justify-start items-center lg:text-left h-svh gap-6'>
      <Tabs defaultValue='credit' className='w-full'>
        <TabsList className='w-full min-w-full bg-black/10'>
          <TabsTrigger value='credit' className='w-full'>
            Cartão de crédito
          </TabsTrigger>
          <TabsTrigger value='pix' className='w-full'>
            Pix
          </TabsTrigger>
        </TabsList>
        <TabsContent value='credit'>
          <div className='grid grid-cols-3 w-full space-x-4 mb-4'>
            <Badge
              className='bg-black text-white gap-2 flex justify-center'
              onClick={() => setStep(1)}
            >
              Dados pessoais
            </Badge>
            <Badge
              className='bg-black/10 text-black/60 shadow-none gap-2 flex justify-center data-[isactive=true]:bg-black data-[isactive=true]:text-white'
              data-isactive={step > 1}
              onClick={() => {
                if (step > 1) {
                  handleClickStep(2)
                }
              }}
            >
              Endereço
            </Badge>
            <Badge
              className='bg-black/10 text-black/60 shadow-none gap-2 flex justify-center data-[isactive=true]:bg-black data-[isactive=true]:text-white'
              data-isactive={step === 3}
            >
              Cartão
            </Badge>
          </div>

          {step === 1 && (
            <div className='space-y-4'>
              <InputWithLabel label='Nome' type='text' />
              <InputWithLabel label='Email' type='text' />
              <InputWithLabel label='CPF' type='text' />
              <InputWithLabel label='Telefone' type='text' />
              <InputWithLabel label='Data de nascimento' type='text' />
            </div>
          )}
          {step === 2 && (
            <div className='space-y-4'>
              <InputWithLabel label='Cidade' type='text' />
              <InputWithLabel label='CEP' type='text' />
              <InputWithLabel label='Rua' type='text' />
              <InputWithLabel label='Bairro' type='text' />
              <InputWithLabel label='Número' type='text' />
              <InputWithLabel label='Estado' type='text' />
            </div>
          )}
          {step === 3 && (
            <div className='space-y-4'>
              <InputWithLabel label='Nome no cartão' type='text' />
              <InputWithLabel label='Número' type='text' />
              <div className='flex w-full space-x-4'>
                <InputWithLabel label='Mês' type='text' />
                <InputWithLabel label='Ano' type='text' />
                <InputWithLabel label='CVC' type='text' />
              </div>
            </div>
          )}

          <button
            onClick={handleNextStep}
            className='flex items-center justify-center gap-2 text-md font-bold px-8 py-3 rounded-lg w-full bg-black text-white shadow-xl mt-12'
          >
            {step === 3 ? 'Finalizar' : 'Próximo'}
            <MoveRight className='w-6 h-6 text-white' />
          </button>
        </TabsContent>
        <TabsContent value='pix'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
