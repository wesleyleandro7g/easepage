'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { MailCheck, ShieldBan, X, Zap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { supabase } from '@/db/supabase/client'
import { useToast } from '@/hooks/use-toast'

import { signInFormSchema, signInFormSchemaType } from './schema'

export default function SignIn() {
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const error_code = searchParams.get('error')

  const [isLoading, setIsLoading] = useState(false)
  const [mailSent, setMailSent] = useState(false)
  const [baseURL, setBaseURL] = useState('')
  const [alertMessage, setAlertMessage] = useState(!!error_code)

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
        emailRedirectTo: `${baseURL}/auth/callback`,
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseURL(window.location.origin)
    }
  }, [])

  if (mailSent) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center bg-easebg-800 bg-circle-pattern'>
        <div className='flex flex-col gap-2 md:w-[480px] p-8 rounded-xl md:bg-white lg:bg-white items-center text-center'>
          <MailCheck className='size-20 text-white md:text-black' />
          <h1 className='text-4xl font-bold text-white md:text-black'>
            Email enviado!
          </h1>
          <p className='text-white/80 md:text-black/80 font-light leading-5'>
            Enviamos um email para você! Acesse sua caixa de email e clique no
            link para ser autenticado automaticamente.
          </p>
          <Button
            className='disabled:opacity-80 mt-2 bg-white text-black md:bg-black md:text-white hover:bg-white hover:text-black md:hover:bg-black md:hover:text-white'
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
    <main className='flex min-h-screen flex-col items-center justify-center gap-2 bg-easebg-800 bg-circle-pattern p-6'>
      {alertMessage && (
        <Alert
          variant='destructive'
          className='w-full flex gap-2 max-w-[480px] bg-red-400 relative'
        >
          <ShieldBan className='h-6 w-6' />
          <div>
            <AlertTitle>Ooops!</AlertTitle>
            <AlertDescription>
              Parece que esse link estava expirado! Tente novamente.
            </AlertDescription>
          </div>
          <X
            className='h-6 w-6 absolute top-2 right-2 cursor-pointer text-black'
            onClick={() => setAlertMessage(false)}
          />
        </Alert>
      )}

      <div className='flex flex-col gap-4 w-full md:w-[480px] md:p-8 rounded-xl bg-transparent md:bg-white'>
        <div className='flex flex-col gap-0 items-center'>
          <Zap className='w-16 h-16 text-white md:text-black mb-6' />
          <h1 className='text-3xl font-bold text-white md:text-black text-center'>
            Bem vindo de volta!
          </h1>
          <p className='text-white/80 md:text-black/60 text-center font-light mb-2'>
            Digite o seu email para acessar sua conta.
          </p>
        </div>

        <Form {...form}>
          <form
            className='space-y-2'
            onSubmit={form.handleSubmit(signInWithEmail)}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormControl>
                    <Input
                      placeholder='Seu email'
                      {...field}
                      className='w-full border-white md:border-black/60 focus-visible:ring-white md:focus-visible:ring-black text-white md:text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className='w-full disabled:opacity-80 bg-white md:bg-black text-black md:text-white hover:bg-white hover:text-black md:hover:bg-black md:hover:text-white '
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Enviando email...' : 'Continuar'}
              <Zap
                className='w-8 h-8 hidden data-[issubmitting=true]:flex data-[issubmitting=true]:animate-spin text-black md:text-white focus:text-white md:focus:text-black'
                data-issubmitting={isLoading}
              />
            </Button>

            <div className='flex w-full justify-center'>
              <Link
                href='/briefing'
                className='w-full md:w-fit text-center underline text-sm text-white md:text-black'
              >
                Não tem uma conta? Criar conta!
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
