'use client'

import { createElement, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MoveLeft, MoveRight, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { supabase } from '@/db/supabase/client'
import { useToast } from '@/hooks/use-toast'

import { steps, StepType } from './utils/steps'
import { briefingFormScheme } from './utils/briefingFormScheme'
import { getLoadingMessage } from './utils/loadingMessages'

type BriefingFormSchemaType = z.infer<typeof briefingFormScheme>

export default function Briefing() {
  const { toast } = useToast()
  const router = useRouter()
  const [formSteps, setFormSteps] = useState<StepType>('step-1')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(briefingFormScheme),
    defaultValues: {
      type: 'digital-product',
      style: 'modern-minimalist',
      model: 'tuany-miranda-2',
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

  async function onSubmit(data: BriefingFormSchemaType) {
    setIsSubmitting(true)
    const order = await supabase
      .from('service_orders')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        title: data.title,
        description: data.description,
        model: data.model,
        style: data.style,
        type: data.type,
        status: 'order-generated',
      })
      .select('id')
      .single()

    if (order.error) {
      toast({
        title: 'Ops! Algo deu errado ao gerar o seu site',
        description: 'Por favor tente novamente',
        variant: 'destructive',
      })
      setIsSubmitting(false)
      return console.error(order.error)
    }

    router.push(
      `/premium-website/checkout/${order.data.id}?user_email=${data.email}`
    )
    setIsSubmitting(false)
  }

  const isDisabled =
    (formSteps === 'step-4' &&
      (form.watch('title').length < 3 ||
        form.watch('description').length < 40)) ||
    (formSteps === 'step-5' &&
      (form.watch('name').length < 3 ||
        form.watch('email').length < 3 ||
        form.watch('phone').length < 3))

  if (isSubmitting) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto'>
        <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
          <Zap className='w-20 h-20' />
          <span className='text-sm text-black'>Gerando seu site...</span>
        </div>
        <span className='text-center text-xl italic'>
          &ldquo;{getLoadingMessage()}&quot;
        </span>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <Progress value={Number(formSteps.split('-')[1]) * 20} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <main className='pt-12 md:pt-20 pb-16 text-center w-full flex flex-col justify-center items-center'>
              {createElement(steps[formSteps], {
                form,
                nextStep: handleNextStep,
              })}

              <div className='flex flex-row w-full justify-end max-w-3xl gap-2 mt-8'>
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
