'use client'

import { createElement, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MoveLeft, MoveRight, Zap } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { supabase } from '@/db/supabase/client'
import { useToast } from '@/hooks/use-toast'

import { steps, StepType } from './utils/steps'
import { onboardingFormScheme } from './utils/onboardingFormScheme'
import { usePageContent } from '@/context/page-context'
import { useContentGeneration } from '@/hooks/useContentGeneration'
import { buildingMessages } from './utils/buildingMessages'
import { productType, siteStyle } from '@/utils/pageItems'

type OnboardingFormSchemaType = z.infer<typeof onboardingFormScheme>

export default function Onboarding() {
  const { toast } = useToast()
  const router = useRouter()
  const [formSteps, setFormSteps] = useState<StepType>('step-1')
  const [startBuilding, setStartBuilding] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const { setPageData } = usePageContent()

  const { generateContent } = useContentGeneration()

  const form = useForm({
    resolver: zodResolver(onboardingFormScheme),
    defaultValues: {
      type: 'digital-product',
      customType: '',
      style: 'modern-minimalist',
      customStyle: '',
      theme: 'sunrise',
      title: '',
      description: '',
      name: '',
      email: '',
      phone: '',
    },
  })

  function handleBuildMessages(currentIndex: number) {
    setStartBuilding(true)

    if (currentIndex === 6) {
      setTimeout(() => {
        router.push(`/editor/`)
      }, 2000)

      return
    }

    setTimeout(() => {
      setCurrentMessage((prev) => {
        return prev + 1
      })
      handleBuildMessages(currentIndex + 1)
    }, 4000)
  }

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

  async function onSubmit(data: OnboardingFormSchemaType) {
    handleBuildMessages(0)
    const {
      title,
      description,
      name,
      email,
      phone,
      style,
      theme,
      type,
      customStyle,
      customType,
    } = data
    // const dataJSON = JSON.stringify(dataToSaveInJson, null, 2)

    const shortUUID = uuidv4().split('-')[0]

    setPageData({
      id: shortUUID,
      title,
      description,
      theme,
      style,
      type,
    })

    const pageType =
      type === 'other'
        ? customType
        : productType.find((item) => item.slug === type)?.name
    const pageStyle =
      style === 'other'
        ? customStyle
        : siteStyle.find((item) => item.slug === style)?.name

    const context = `O site que estamos criando é para ${pageType} com o estilo ${pageStyle}. Gere a copy das seções levando em consideração o tipo, o estilo e a descrição a seguir que foi fornecida pelo usuário: ${description}`

    generateContent({
      context,
      sections: [
        { name: 'hero', variant: 'Default' },
        { name: 'features', variant: 'Default' },
        // { name: 'pricing', variant: 'Default' },
        // { name: 'testimonials', variant: 'Default' },
        // { name: 'cta', variant: 'Default' },
      ],
    })

    console.log(context)

    return console.log(data)

    const password = uuidv4().split('-')[0]

    const signUpUser = await supabase.auth.signUp({
      email: email,
      password,
      phone,
      options: {
        emailRedirectTo: 'http://localhost:3000/panel',
        data: {
          first_name: name.split(' ')[0],
          last_name: name.split(' ')[1],
        },
      },
    })

    if (signUpUser.error) {
      toast({
        title: 'Ops! Algo deu errado',
        description: 'Por favor tente novamente',
        variant: 'destructive',
      })
      return console.error(signUpUser.error)
    }

    const createdPage = await supabase
      .from('pages')
      .insert({
        title,
        description,
        slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${shortUUID}`,
        theme,
        style,
        type,
        is_active: false,
        // page_structure: dataJSON,
        user_id: signUpUser.data.user?.id,
      })
      .select('id, slug')
      .single()

    if (createdPage.error) {
      toast({
        title: 'Ops! Algo deu errado ao gerar o seu site',
        description: 'Por favor tente novamente',
        variant: 'destructive',
      })
      return console.error(createdPage.error)
    }
  }

  const isDisabled =
    (formSteps === 'step-1' &&
      form.watch('type') === 'other' &&
      form.watch('customType')?.length < 5) ||
    (formSteps === 'step-2' &&
      form.watch('style') === 'other' &&
      form.watch('customStyle')?.length < 5) ||
    (formSteps === 'step-4' &&
      (form.watch('title').length < 3 ||
        form.watch('description').length < 40)) ||
    (formSteps === 'step-5' &&
      (form.watch('name').length < 3 ||
        form.watch('email').length < 3 ||
        form.watch('phone').length < 3))

  if (startBuilding) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto'>
        <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
          <Zap className='w-20 h-20' />
          <span className='text-sm text-black'>Gerando seu site...</span>
        </div>
        <span className='text-center text-xl italic'>
          {buildingMessages[currentMessage]}
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
