'use client'

import { createElement, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MoveLeft, MoveRight, Zap } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { supabase } from '@/db/supabase/client'

import { steps, StepType } from './utils/steps'
import { onboardingFormScheme } from './utils/onboardingFormScheme'
import { usePageContent } from '@/context/page-context'
import { useContentGeneration } from '@/hooks/useContentGeneration'
// import { buildingMessages } from './utils/buildingMessages'
import { productType, siteStyle } from '@/utils/pageItems'
import { useSections } from '@/hooks/useSections'

type OnboardingFormSchemaType = z.infer<typeof onboardingFormScheme>

export default function Briefing() {
  const router = useRouter()

  const [formSteps, setFormSteps] = useState<StepType>('step-1')
  const [startBuilding, setStartBuilding] = useState(false)
  // const [currentMessage, setCurrentMessage] = useState(0)

  const { user } = useUser()
  const { setPageData, setSections } = usePageContent()
  const { convertSectionsInObject } = useSections()
  const { generateContent } = useContentGeneration()

  const isNewProject = !!user?.id

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
      name: user?.user_metadata.first_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  })

  // function handleBuildMessages(currentIndex: number) {
  //   setStartBuilding(true)

  //   if (currentIndex === 6) return

  //   setTimeout(() => {
  //     setCurrentMessage((prev) => {
  //       return prev + 1
  //     })
  //     handleBuildMessages(currentIndex + 1)
  //   }, 4000)
  // }

  function handleNextStep() {
    if (formSteps === 'step-5' || (isNewProject && formSteps === 'step-4')) {
      return
    }

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
    setStartBuilding(true)

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

    const shortUUID = uuidv4().split('-')[0]

    const pageType =
      type === 'other'
        ? customType
        : productType.find((item) => item.slug === type)?.name
    const pageStyle =
      style === 'other'
        ? customStyle
        : siteStyle.find((item) => item.slug === style)?.name

    const context = `O site que estamos criando é para ${pageType} com o estilo ${pageStyle}. Gere a copy das seções levando em consideração o tipo, o estilo e a descrição a seguir que foi fornecida pelo usuário: ${description}`

    const { sectionsWithContent } = await generateContent({
      context,
      sections: [
        { name: 'hero', variant: 'Default' },
        { name: 'features', variant: 'Default' },
        // { name: 'pricing', variant: 'Default' },
        // { name: 'testimonials', variant: 'Default' },
        // { name: 'cta', variant: 'Default' },
      ],
    })

    setPageData({
      id: shortUUID,
      title,
      description,
      theme,
      style: pageStyle,
      type: pageType,
    })

    setSections(sectionsWithContent)

    const sectionsToSave = convertSectionsInObject(sectionsWithContent)

    if (user?.id) {
      const createdPage = await supabase
        .from('pages')
        .insert({
          title,
          description,
          slug: `${title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}-${shortUUID}`,
          theme,
          style: pageStyle,
          type: pageType,
          is_active: false,
          page_structure: sectionsToSave,
          user_id: user?.id,
        })
        .select('id, slug')
        .single()

      if (createdPage.error) {
        return router.push(`/editor?error=create_page`)
      }

      router.push(`/editor?page_id=${createdPage.data.id}&is_new=true`)
      return
    }

    const password = uuidv4().split('-')[0]

    const signUpUser = await supabase.auth.signUp({
      email,
      password,
      phone: phone || '',
      options: {
        emailRedirectTo: 'https://easepage.io/panel',
        data: {
          first_name: name?.split(' ')[0],
          last_name: name?.split(' ')[1],
          phone,
        },
      },
    })

    if (signUpUser.error) {
      return router.push(`/editor?error=sign_up`)
    }

    const createdPage = await supabase
      .from('pages')
      .insert({
        title,
        description,
        slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${shortUUID}`,
        theme,
        style: pageStyle,
        type: pageType,
        is_active: false,
        page_structure: sectionsToSave,
        user_id: signUpUser.data.user?.id,
      })
      .select('id, slug')
      .single()

    if (createdPage.error) {
      return router.push(`/editor?error=create_page`)
    }

    router.push(`/editor?page_id=${createdPage.data.id}`)
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
          <Zap className='w-20 h-20 text-white' />
          <span className='text-lg text-white'>Gerando seu site...</span>
        </div>
      </div>
    )
  }

  const activeSubmitButton =
    formSteps === 'step-5' || (formSteps === 'step-4' && isNewProject)

  return (
    <div className='min-h-screen w-full bg-circle-pattern'>
      <Progress value={Number(formSteps.split('-')[1]) * 20} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <main className='pt-12 md:pt-20 pb-16 text-center w-full flex flex-col justify-center items-center'>
              {createElement(steps[formSteps], {
                form,
                nextStep: handleNextStep,
              })}

              <div className='flex flex-row w-full justify-end max-w-3xl gap-2 mt-8 animate__animated animate__bounceInUp'>
                <Link href='/panel'>
                  <Button
                    variant='outline'
                    className='px-4 w-fit data-[disabled=true]:hidden focus:bg-easebg-500 border border-white focus:text-white text-white'
                    data-disabled={!isNewProject}
                    type='button'
                  >
                    Cancelar
                  </Button>
                </Link>
                <Button
                  variant='outline'
                  className='px-4 w-fit data-[disabled=true]:hidden bg-transparent focus:text-white text-white hover:border border-white'
                  onClick={handlePrevStep}
                  data-disabled={formSteps === 'step-1'}
                  type='button'
                >
                  <MoveLeft />
                </Button>
                <Button
                  className='w-full md:w-fit animate-gradient'
                  onClick={handleNextStep}
                  type={activeSubmitButton ? 'submit' : 'button'}
                  disabled={isDisabled}
                >
                  {activeSubmitButton ? 'Gerar meu site' : 'Próximo'}
                  {activeSubmitButton ? <Zap /> : <MoveRight />}
                </Button>
              </div>
            </main>
          </div>
        </form>
      </Form>
    </div>
  )
}
