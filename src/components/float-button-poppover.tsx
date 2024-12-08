/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, ChevronLeft, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { themes, setTheme } from '@/config/theme'
import type { themeType } from '@/config/theme/theme'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/input-label'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

interface FloatButtonPopoverProps {
  osPublish: () => void
  form: any
  isSubmitting: boolean
}

type configStepType = 'theme' | 'pageInfo' | 'userInfo'

export function FloatButtonPopover({
  osPublish,
  form,
  isSubmitting,
}: FloatButtonPopoverProps) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [configStep, setConfigStep] = useState<configStepType>('theme')

  function handleChangeTheme(theme: themeType) {
    setTheme(theme)
    setSelectedTheme(theme)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as themeType

      if (storedTheme) {
        setTheme(storedTheme ? storedTheme : themes[0])
        setSelectedTheme(storedTheme)
      }
    }
  }, [])

  return (
    <Popover>
      <PopoverTrigger className='bg-gradient-to-bl from-[#F8ACFF] to-[#FFF95B] p-2 rounded-full shadow-xl fixed right-5 bottom-8'>
        <Zap className='w-8 h-8 fill-[#D9D9D9]' />
      </PopoverTrigger>
      <PopoverContent className='w-screen shadow-none mx-auto bg-transparent border-0'>
        {configStep === 'theme' && (
          <div className='flex flex-col gap-2 p-4 w-full bg-white shadow-xl rounded-lg border outline-none relative'>
            <div className='space-y-2'>
              <span className='text-sm'>Temas</span>
              <div className='grid grid-cols-6 gap-2'>
                {themes.map((theme: themeType) => {
                  return (
                    <label
                      key={theme}
                      className={`flex items-center justify-center w-full h-[62px] rounded-lg border border-black/20 data-[isSubmitting=true]:opacity-50 ${theme}`}
                      data-isSubmitting={isSubmitting}
                    >
                      <input
                        type='radio'
                        name='theme'
                        value={theme}
                        className='hidden'
                        onChange={() => handleChangeTheme(theme)}
                        disabled={isSubmitting}
                      />
                      {selectedTheme === theme && (
                        <Check className='text-[#797979]' />
                      )}
                    </label>
                  )
                })}
              </div>
            </div>

            <div className='space-y-2'>
              <span className='text-sm'>Fontes</span>
              <div className='grid grid-cols-6 gap-2'></div>
            </div>

            <Button
              className='w-full gap-2 data-[isSubmitting=true]:animate-pulse'
              data-isSubmitting={isSubmitting}
              disabled={isSubmitting}
              type='button'
              onClick={() => setConfigStep('pageInfo')}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar meu site'}
              <Zap
                className='w-6 h-6 data-[isSubmitting=true]:animate-spin'
                data-isSubmitting={isSubmitting}
              />
            </Button>
            <div className='absolute bottom-[-7px] right-[6%] transform -translate-x-[0%] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white rounded-t-sm'></div>
          </div>
        )}

        {configStep === 'pageInfo' && (
          <div className='flex flex-col gap-2 p-4 w-full bg-white shadow-xl rounded-lg border outline-none relative'>
            <div className='flex w-full items-center justify-start gap-2 mb-4'>
              <button
                className='bg-gray-200 p-1 rounded-md'
                onClick={() => setConfigStep('theme')}
              >
                <ChevronLeft className='w-5 h-5' />
              </button>
              <h6 className='text-lg font-semibold'>Configure seu site</h6>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form?.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label='Dê um título:'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form?.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label='Adicione uma breve descrição:'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className='w-full gap-2 data-[isSubmitting=true]:animate-pulse'
              data-isSubmitting={isSubmitting}
              disabled={isSubmitting}
              type='button'
              onClick={() => setConfigStep('userInfo')}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar meu site 1/2'}
              <Zap
                className='w-6 h-6 hidden data-[isSubmitting=true]:flex data-[isSubmitting=true]:animate-spin'
                data-isSubmitting={isSubmitting}
              />
            </Button>
            <div className='absolute bottom-[-7px] right-[6%] transform -translate-x-[0%] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white rounded-t-sm'></div>
          </div>
        )}

        {configStep === 'userInfo' && (
          <div className='flex flex-col gap-2 p-4 w-full bg-white shadow-xl rounded-lg border outline-none relative'>
            <div className='flex w-full items-center justify-start gap-2 mb-4'>
              <button
                className='bg-gray-200 p-1 rounded-md'
                onClick={() => setConfigStep('pageInfo')}
              >
                <ChevronLeft className='w-5 h-5' />
              </button>
              <h6 className='text-lg font-semibold'>Configure seu site</h6>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form?.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label='Seu nome:'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form?.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label='Seu melhor email:'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className='w-full gap-2 data-[isSubmitting=true]:animate-pulse'
              data-isSubmitting={isSubmitting}
              disabled={isSubmitting}
              type='button'
              onClick={osPublish}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar meu site 2/2'}
              <Zap
                className='w-6 h-6 hidden data-[isSubmitting=true]:flex data-[isSubmitting=true]:animate-spin'
                data-isSubmitting={isSubmitting}
              />
            </Button>
            <div className='absolute bottom-[-7px] right-[6%] transform -translate-x-[0%] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white rounded-t-sm'></div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
