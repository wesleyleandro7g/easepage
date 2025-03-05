'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, ExternalLink, Link as LinkIcon, Zap } from 'lucide-react'
import Link from 'next/link'

import { useToast } from '@/hooks/use-toast'

import { supabase } from '@/db/supabase/client'

import { handleParticles } from './particles-effect'
import { unsecuredCopyToClipboard } from '@/utils/copy-to-clipboard'

export default function PaymentConfirmation() {
  const [codeCopied, setCodeCopied] = useState(false)
  const [pageSlug, setPageSlug] = useState<string | undefined>(undefined)

  const searchParams = useSearchParams()
  const pathName = window.location.origin

  const order_id = searchParams.get('order_id')
  const session_id = searchParams.get('session_id')

  const { toast } = useToast()

  async function handleCopyCode(code: string) {
    try {
      unsecuredCopyToClipboard(code)
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 5000)
    } catch {
      toast({
        title: 'Ops! Algo deu errado',
        description:
          'Não foi possível copiar o código, recarregue a página e tente novamente',
        variant: 'destructive',
      })
    }
  }

  async function handleUpdateOrderStatus() {
    const result = await supabase
      .from('billings')
      .update({ status: 'approved', stripe_session_id: session_id })
      .eq('id', order_id)
      .select('page_id')
      .single()

    if (result.error) {
      toast({
        title: 'Ops! Algo deu errado',
        description:
          'Não foi possível encontrar o pagamento! Por favor, entre em contato com o suporte pelo botão abaixo.',
        variant: 'destructive',
      })
    }

    if (result.data) {
      const pageUdate = await supabase
        .from('pages')
        .update({ is_active: true })
        .eq('id', result.data.page_id)
        .select('slug')
        .single()

      setPageSlug(pageUdate?.data?.slug)
      handleParticles()
    }
  }

  useEffect(() => {
    if (!order_id || !session_id) {
      toast({
        title: 'Ops! Algo deu errado',
        description:
          'Não foi possível encontrar o pagamento! Por favor, entre em contato com o suporte pelo botão abaixo.',
        variant: 'destructive',
      })
    }

    handleUpdateOrderStatus()
  }, [])

  return (
    <div className='flex flex-col flex-1 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center justify-center items-center lg:text-left h-svh gap-6'>
      <Zap className='w-32 h-32 fill-[#D9D9D9]' />
      <div className='space-y-2'>
        <h2 className='text-5xl font-extrabold text-black'>Online 🚀</h2>
        <p className='text-black/80'>
          <span className='font-extrabold'>
            Parabéns! O seu site está no ar. Você já pode acessa-lo pelos botões
            abaixo.
          </span>{' '}
          <br />
          <br /> <span className='font-black'>[ATENÇÃO!]</span>
          <br /> Verifique o email que te enviamos para concluir a criação da
          sua conta e poder fazer mais edições no seu site.
        </p>
      </div>
      <div className='flex w-full justify-center gap-2 mt-12'>
        <button
          onClick={() => handleCopyCode(`${pathName}/${pageSlug}`)}
          className='flex items-center justify-center w-fit text-nowrap gap-2 text-sm font-bold px-4 py-3 rounded-lg bg-white text-[#171E2C] shadow-xl data-[codecopied=true]:bg-green-400 animate__animated'
          data-codecopied={codeCopied}
        >
          {codeCopied ? 'URL Copiada' : 'Copiar URL'}
          {codeCopied ? <Check /> : <LinkIcon className='w-5 h-5' />}
        </button>
        <Link href={`/${pageSlug}`}>
          <button className='flex items-center justify-center w-fit text-nowrap gap-2 text-sm font-bold px-4 py-3 rounded-lg bg-white text-[#171E2C] shadow-xl data-[codecopied=true]:bg-green-400 animate__animated'>
            Ver meu site
            <ExternalLink />
          </button>
        </Link>
      </div>
    </div>
  )
}
