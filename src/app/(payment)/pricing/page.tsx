'use client'

import 'animate.css'
import { useEffect, useState } from 'react'
import { Check, Copy, MoveRight, Zap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import QRCode from 'qrcode'

import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/db/supabase/client'

import { Progress } from '@/components/ui/progress'

import { createChargeByPix } from '@/actions/createChargeByPix'
import { unsecuredCopyToClipboard } from '@/utils/copy-to-clipboard'

const pagePrice = process.env.NEXT_PUBLIC_PAGE_PRICE

const bennefits = [
  { title: 'Site no ar por 1 ano', active: true },
  { title: 'Temas profissionais', active: true },
  { title: 'Domínio personalizado', active: false },
  { title: 'Dashboard analítica', active: false },
  { title: 'Upload de imagens', active: false },
  { title: 'Upload de vídeos', active: false },
  { title: 'Criação de formulários', active: false },
  { title: 'Criação de QUIZ', active: false },
  // { title: 'Gerador de depoimentos', active: false },
  // { title: 'Chatbot integrado', active: false },
  // { title: 'Teste A/B', active: false },
]

export default function LandingPage() {
  const searchParams = useSearchParams()

  const pageSlug = searchParams.get('slug')
  const pageId = searchParams.get('pageId')
  const userId = searchParams.get('userId')

  const { toast } = useToast()

  const [processingPayment, setProcessingPayment] = useState(false)

  const [pixInfo, setPixInfo] = useState({
    pixCopiaECola: '',
    txid: '',
    billingId: '',
  })

  const [codeCopied, setCodeCopied] = useState(false)
  const [codeCopiedOneTime, setCodeCopiedOneTime] = useState(false)
  const [imageBase64, setImageBase64] = useState('')

  async function handleCreateCharge() {
    setProcessingPayment(true)

    const pixGeneration = await createChargeByPix({
      amount: pagePrice || '67.00',
    })

    if (!pixGeneration.txid) {
      setProcessingPayment(false)
      return toast({
        title: 'Ops! Algo deu errado',
        description: 'Por favor tente novamente ou contate o nosso suporte',
        variant: 'destructive',
      })
    }

    const createdBilling = await supabase
      .from('billings')
      .insert({
        amount: pagePrice || '67.00',
        plan: 'launch',
        method: 'pix',
        status: 'pending',
        txid: pixGeneration.txid,
        page_id: pageId,
        user_id: userId,
      })
      .select('id')
      .single()

    console.log({
      pixGeneration,
      createdBilling,
    })

    setPixInfo({
      pixCopiaECola: pixGeneration.pixCopiaECola,
      txid: pixGeneration.txid,
      billingId: createdBilling?.data?.id,
    })

    setProcessingPayment(false)
  }

  async function handleCopyCode() {
    try {
      unsecuredCopyToClipboard(pixInfo.pixCopiaECola)
      setCodeCopied(true)
      setCodeCopiedOneTime(true)
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

  const generateQR = async () => {
    try {
      const imageBase64 = await QRCode.toDataURL(pixInfo.pixCopiaECola)
      setImageBase64(imageBase64)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (pixInfo.pixCopiaECola) {
      generateQR()
    }
  }, [pixInfo])

  return (
    <div className='min-h-screen sunrise'>
      <Progress
        value={pixInfo.pixCopiaECola ? 90 : 70}
        className='rounded-none'
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {pixInfo.pixCopiaECola ? (
          <main className='flex flex-col flex-1 pt-12 pb-16 text-center justify-center lg:text-left'>
            <div className='flex flex-col gap-3 max-w-4xl text-center'>
              <h1 className='text-5xl sm:text-6xl text-center font-bold leading-[3rem] tracking-tight text-headline'>
                Realize o pagamento para finalizar
              </h1>
              <p className='text-lg font-normal leading-5 text-center text-subheadline max-w-2xl'>
                Acesse o aplicativo do seu banco, realize o pagamento e toque em
                continuar para prosseguir
              </p>

              <div className='mt-5 flex flex-col sm:flex-row items-center gap-5'>
                {imageBase64 && (
                  <Image
                    src={imageBase64}
                    alt='QR Code'
                    width={240}
                    height={240}
                    className='rounded-lg'
                  />
                )}
                <button
                  onClick={handleCopyCode}
                  className='flex items-center justify-center w-fit gap-2 text-md font-bold px-8 py-3 rounded-lg bg-white text-[#171E2C] shadow-xl data-[codecopied=true]:bg-green-400 animate__animated'
                  data-codecopied={codeCopied}
                >
                  {codeCopied ? 'Código copiado' : 'Copiar código'}
                  {codeCopied ? <Check /> : <Copy className='w-5 h-5' />}
                </button>
              </div>
            </div>

            <Link
              href={`/welcome/?slug=${pageSlug}&pageId=${pageId}&userId=${userId}&txid=${pixInfo.txid}&billingId=${pixInfo.billingId}`}
              className='flex justify-center'
            >
              <button
                className='flex items-center justify-center gap-2 text-md px-8 py-3 rounded-lg w-fit bg-black text-white shadow-xl opacity-20 data-[isactive=true]:opacity-100 mt-20'
                data-isactive={codeCopiedOneTime}
                disabled={!codeCopiedOneTime}
              >
                Continuar
                <MoveRight />
              </button>
            </Link>
          </main>
        ) : (
          <main className='pt-12 pb-16 text-center lg:text-left'>
            <div className='flex flex-col gap-3 max-w-4xl text-center'>
              <h1 className='text-5xl sm:text-6xl text-center font-bold leading-[3rem] tracking-tight animate__animated animate__bounceInUp text-headline'>
                Tenha acesso à todos os recursos
              </h1>
              <p className='text-lg font-normal leading-5 text-center text-subheadline max-w-2xl animate__animated animate__bounceInUp'>
                Você pode ir muito mais longe com o plano profissional
              </p>

              <div className='mt-5 flex flex-col sm:flex-row items-start gap-5 p-6 rounded-3xl bg-[#171E2C] shadow-xl animate__animated animate__bounceInUp'>
                <div className='w-full flex flex-col items-start'>
                  <div className='flex justify-end w-full'></div>
                  <h2 className='text-white text-6xl font-extrabold text-start'>
                    R$67
                    <span className='text-sm font-light'>,00</span>
                  </h2>
                  <p className='text-white/70 text-sm'>
                    Crie sites como um profissional
                  </p>
                </div>
                <ul className='text-start flex flex-col gap-2'>
                  {bennefits.map((bennefit) => (
                    <li
                      key={bennefit.title}
                      className='text-white text-sm inline-flex items-center gap-2'
                    >
                      <Check className='text-emerald-400 w-5 h-5' />{' '}
                      {bennefit.title}{' '}
                      {!bennefit.active && (
                        <span className='text-white/40'>(em breve)</span>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleCreateCharge}
                  className='flex items-center justify-center gap-2 text-md font-bold px-8 py-3 rounded-lg w-full bg-white text-[#171E2C] shadow-xl hover:bg-black/90 animate__animated focus:bg-white hover:bg-white'
                  disabled={processingPayment}
                >
                  {processingPayment ? 'Gerando cobrança...' : 'Assinar agora'}
                  <Zap
                    className='w-6 h-6 hidden data-[issubmitting=true]:flex data-[issubmitting=true]:animate-spin text-[#171E2C]'
                    data-issubmitting={processingPayment}
                  />
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
