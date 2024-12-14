'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, Copy, ExternalLink, Link as LinkIcon, Zap } from 'lucide-react'
import Link from 'next/link'

import { useToast } from '@/hooks/use-toast'

import { supabase } from '@/db/supabase/client'

import { verifyChargeByPix } from '@/actions/verifyChargeByPix'
import { handleParticles } from './particles-effect'
import { unsecuredCopyToClipboard } from '@/utils/copy-to-clipboard'

export default function Welcome() {
  const [codeCopied, setCodeCopied] = useState(false)
  const [paymentReceived, setPaymentReceived] = useState(true)

  const searchParams = useSearchParams()
  const pathName = window.location.origin

  const pageSlug = searchParams.get('slug')
  const pageId = searchParams.get('pageId')
  const userId = searchParams.get('userId')
  const txid = searchParams.get('txid')
  const pixCode = searchParams.get('pixCode') || ''
  const billingId = searchParams.get('billingId')

  const { toast } = useToast()

  console.log({
    billingId,
    pageSlug,
    pageId,
    userId,
    txid,
  })

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

  const handleCheckPayment = async () => {
    if (txid) {
      const result = await verifyChargeByPix({
        txid: txid,
      })

      if (result.status === 'CONCLUIDA') {
        await supabase
          .from('billings')
          .update({ status: 'approved' })
          .eq('id', billingId)

        handleParticles()
      }

      console.log(result)
      return result
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await handleCheckPayment()
      if (result?.status === 'CONCLUIDA') {
        clearInterval(interval)
        setPaymentReceived(true)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [txid])

  if (paymentReceived) {
    return (
      <div className='flex flex-col flex-1 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center justify-center items-center lg:text-left h-svh gap-6'>
        <Zap className='w-32 h-32 fill-[#D9D9D9]' />
        <div className='space-y-2'>
          <h2 className='text-5xl font-extrabold text-black'>Online 🚀</h2>
          <p className='text-black/80'>
            <span className='font-extrabold'>
              Parabéns! O seu site está no ar. Você já pode acessa-lo pelos
              botões abaixo.
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

  return (
    <div className='flex flex-col flex-1 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center justify-center items-center lg:text-left h-svh gap-6'>
      <Zap className='w-32 h-32 fill-[#D9D9D9]' />
      <div className='space-y-2'>
        <h2 className='text-5xl font-extrabold text-black'>Quase lá!</h2>
        <p className='text-black/70'>
          Por favor aguarde alguns instantes, estamos confirmando o seu
          pagamento. Caso ainda não tenha efetuado você pode copiar o código
          abaixo.
        </p>
      </div>
      <button
        onClick={() => handleCopyCode(pixCode)}
        className='flex items-center justify-center w-fit gap-2 text-md font-bold px-8 py-3 rounded-lg bg-white text-[#171E2C] shadow-xl data-[codecopied=true]:bg-green-400 mt-12 animate__animated'
        data-codecopied={codeCopied}
      >
        {codeCopied ? 'Código copiado' : 'Copiar código'}
        {codeCopied ? <Check /> : <Copy className='w-5 h-5' />}
      </button>
    </div>
  )
}
