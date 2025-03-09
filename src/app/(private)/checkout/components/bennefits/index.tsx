import {
  Headset,
  Palette,
  ShieldCheck,
  Sparkles,
  Trophy,
  WandSparkles,
} from 'lucide-react'

export function Bennefits() {
  return (
    <ul className='text-start flex flex-col gap-2 animate__animated animate__bounceInUp'>
      <li className='text-white text-md inline-flex items-center gap-2'>
        <ShieldCheck className='text-white w-5 h-5' /> 7 Dias de Garantia
      </li>
      <li className='text-white text-md inline-flex items-center gap-2'>
        <Headset className='text-white w-5 h-5' /> Suporte Prioritário Direto no
        WhatsApp
      </li>
      <li className='text-white text-md inline-flex items-center gap-2'>
        <Trophy className='text-white w-5 h-5' /> Acesso às Atualizações Futuras
      </li>
      <li className='text-white text-md inline-flex items-center gap-2'>
        <WandSparkles className='text-white w-5 h-5' /> Personalize seu Site a
        Qualquer Momento
      </li>
      <li className='text-white text-md inline-flex items-center gap-2'>
        <Sparkles className='text-white w-5 h-5' /> Gere o Conteúdo com
        Facilidade usando nossa IA
      </li>
      <li className='text-white text-md inline-flex items-center gap-2'>
        <Palette className='text-white w-5 h-5' /> Temas Profissionais e
        Exclusivos
      </li>
    </ul>
  )
}
