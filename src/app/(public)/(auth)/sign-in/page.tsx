'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MailCheck, ShieldBan, Zap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { InputWithLabel } from '@/components/input-label'
import { Button } from '@/components/ui/button'
import { supabase } from '@/db/supabase/client'
import { useToast } from '@/hooks/use-toast'

import { signInFormSchema, signInFormSchemaType } from './schema'

export default function SignIn() {
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [mailSent, setMailSent] = useState(false)

  const error_code = searchParams.get('error_code')

  const form = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
    },
    disabled: isLoading,
  })

  async function signInWithEmail({ email }: signInFormSchemaType) {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    })

    setIsLoading(false)

    if (error) {
      return toast({
        title: 'Erro ao entrar',
        description: 'Não foi possível entrar com o email informado.',
        variant: 'destructive',
      })
    }

    setMailSent(true)
  }

  if (mailSent) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center bg-background sunrise'>
        <div className='flex flex-col gap-2 md:w-[480px] p-8 rounded-xl md:bg-white lg:bg-white items-center text-center'>
          <MailCheck className='size-20' />
          <h1 className='text-4xl font-bold text-black'>Email enviado!</h1>
          <p className='text-black/80 font-light leading-5'>
            Enviamos um email para você! Acesse sua caixa de email e clique no
            link para ser autenticado automaticamente.
          </p>
          <Button
            className='disabled:opacity-80 mt-2'
            type='button'
            onClick={() => setMailSent(false)}
          >
            Reenviar Email
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background gap-2 sunrise'>
      {error_code && (
        <Alert
          variant='destructive'
          className='w-full max-w-[480px] bg-red-400'
        >
          <ShieldBan className='h-6 w-6' />
          <AlertTitle>Ooops!</AlertTitle>
          <AlertDescription>
            Parece que esse link estava expirado! Tente novamente.
          </AlertDescription>
        </Alert>
      )}

      <div className='flex flex-col gap-4 md:w-[480px] p-8 rounded-xl md:bg-white lg:bg-white'>
        <div>
          <h1 className='text-4xl font-bold text-black'>Entrar</h1>
          <p>Informe o seu email para acessar a sua conta.</p>
        </div>

        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit(signInWithEmail)}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormControl>
                    <InputWithLabel
                      label='Email'
                      placeholder='Seu email'
                      {...field}
                      className='bg-white w-full'
                      wrapperClassName='w-full max-w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className='w-full disabled:opacity-80'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Enviando email...' : 'Entrar'}
              <Zap
                className='w-8 h-8 hidden data-[issubmitting=true]:flex data-[issubmitting=true]:animate-spin text-white'
                data-issubmitting={isLoading}
              />
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
