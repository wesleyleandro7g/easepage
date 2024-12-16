'use client'

import { createElement, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MoveLeft, MoveRight, Zap } from 'lucide-react'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { steps, StepType } from './utils/steps'
import { onboardingFormScheme } from './utils/onboardingFormScheme'

type OnboardingFormSchemaType = z.infer<typeof onboardingFormScheme>

export default function Onboarding() {
  const [formSteps, setFormSteps] = useState<StepType>('step-1')

  const form = useForm({
    resolver: zodResolver(onboardingFormScheme),
    defaultValues: {
      type: 'digital-product',
      style: 'modern-minimalist',
      theme: 'sunrise',
      title: '',
      description: '',
      name: '',
      email: '',
      phone: '',
    },
  })

  function handleNextStep() {
    if (formSteps === 'step-5') return
    setFormSteps((prev) => {
      const stepNumber = parseInt(prev.split('-')[1])
      return `step-${stepNumber + 1}` as StepType
    })
  }

  function handlePrevStep() {
    if (formSteps === 'step-1') return
    setFormSteps((prev) => {
      const stepNumber = parseInt(prev.split('-')[1])
      return `step-${stepNumber - 1}` as StepType
    })
  }

  const onSubmit = (data: OnboardingFormSchemaType) => {
    console.log(data)
    alert('Formulário enviado com sucesso!')
  }

  const isDisabled =
    (formSteps === 'step-4' &&
      (form.watch('title').length < 3 ||
        form.watch('description').length < 40)) ||
    (formSteps === 'step-5' &&
      (form.watch('name').length < 3 ||
        form.watch('email').length < 3 ||
        form.watch('phone').length < 3))

  return (
    <div className='min-h-screen'>
      <Progress value={Number(formSteps.split('-')[1]) * 20} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <main className='pt-12 md:pt-20 pb-16 text-center w-full'>
              {createElement(steps[formSteps], {
                form,
                nextStep: handleNextStep,
              })}

              <div className='flex flex-row w-full justify-end max-w-4xl gap-2 mt-8'>
                <Button
                  variant='outline'
                  className='text-headline px-4 w-fit data-[disabled=true]:hidden focus:bg-transparent focus:text-black'
                  onClick={handlePrevStep}
                  data-disabled={formSteps === 'step-1'}
                  type='button'
                >
                  <MoveLeft />
                </Button>
                <Button
                  className='animate__animated animate__bounceInUp w-full md:w-fit disabled:opacity-50'
                  onClick={handleNextStep}
                  type={formSteps !== 'step-5' ? 'button' : 'submit'}
                  disabled={isDisabled}
                >
                  {formSteps === 'step-5' ? 'Gerar meu site' : 'Próximo'}
                  {formSteps === 'step-5' ? <Zap /> : <MoveRight />}
                </Button>
              </div>
            </main>
          </div>
        </form>
      </Form>
    </div>
  )
}
