/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import 'animate.css'
import { Zap, Sparkles, Check, MonitorSmartphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import Autoplay from 'embla-carousel-autoplay'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { bennefits, faq, projectsCover, projectsSite } from './utils'

export default function LandingPage() {
  return (
    <>
      {/* Meta Pixel Code */}
      <Script id='facebook-pixel'>
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '580880927898740');
        fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height='1'
          width='1'
          style={{ display: 'none' }}
          src='https://www.facebook.com/tr?id=580880927898740&ev=PageView&noscript=1'
        />
      </noscript>
      {/* End Meta Pixel Code */}
      <div className='min-h-screen bg-[#030114] relative'>
        <div className='flex flex-col items-center max-w-7xl mx-auto px-0 lg:px-8'>
          <header className='hidden md:grid grid-cols-3 w-full items-center py-6 animate__animated animate__bounceInDown z-20 px-4 md:px-0'>
            <div className='flex items-center space-x-2 text-white'>
              <Image
                src='/easepage-logo-white.svg'
                alt='Ease Page Logo'
                width={150}
                height={40}
              />
            </div>
            <div className='text-xs text-white flex justify-between border border-white/20 rounded-full py-3 px-6 bg-gradient-to-br from-white/10 to-white/5'>
              <a href='#benefits'>Benefícios</a>
              <a href='#process'>Processo</a>
              <a href='#portfolio'>Portfólio</a>
              <a href='#price'>Preço</a>
              <a
                target='_blank'
                href='https://wa.me/5538999932655?text=Ol%C3%A1!%20Vim%20pela%20EasePage%20e%20quero%20falar%20sobre%20um%20site'
              >
                Contato
              </a>
            </div>
            <div className='flex items-center justify-end space-x-2 text-white'>
              <Link href='/briefing' className='w-fit'>
                <Button
                  variant='outline'
                  size='lg'
                  className='animate__animated animate__bounceInDown bg-white text-black hover:bg-white hover:text-black'
                >
                  Criar meu site
                </Button>
              </Link>
            </div>
          </header>

          <main className='mt-10 md:mt-20 pb-16 text-center'>
            <section className='flex flex-col gap-4 max-w-6xl items-center text-center relative px-4 md:px-0'>
              <Badge className='rounded-full w-fit px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 animate__animated animate__bounceInUp z-20'>
                <Sparkles className='w-4 h-4' />
                Tenha um site turbinado
              </Badge>
              <h1 className='text-6xl md:text-8xl font-extrabold text-white tracking-tight animate__animated animate__bounceInUp z-20'>
                Aumente suas vendas com um site poderoso!
              </h1>
              <p className='text-lg font-normal text-white text-center max-w-2xl animate__animated animate__bounceInUp z-20'>
                Transmita mais autoridade e credibilidade com um site premium e
                veja suas vendas decolarem! 🚀
              </p>
              <Link
                href='/briefing'
                className='w-full md:w-fit mt-4 z-20 animate__animated animate__bounceInUp'
              >
                <Button className='w-full md:w-full animate-gradient'>
                  Criar meu site
                  <Zap />
                </Button>
              </Link>
              <div className='w-full mt-4 md:mt-8 animate__animated animate__fadeInUp z-20'>
                <Carousel plugins={[Autoplay({ delay: 4000 })]}>
                  <CarouselContent className='h-[200px] md:h-[640px]'>
                    {projectsCover.map((project) => (
                      <CarouselItem key={project.id}>
                        <div className='w-full h-full relative rounded-2xl md:rounded-3xl border-8 border-white/20 overflow-hidden'>
                          <Image
                            src={project.src}
                            alt={project.alt}
                            fill
                            className='object-cover'
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              <div className='absolute inset-0 -top-40 flex items-center justify-center z-10 bg-purple-radial opacity-30 animate__animated animate__zoomIn animate__delay-2s'>
                <Image src='/linear-lines.svg' alt='' fill />
              </div>
            </section>

            <section
              id='benefits'
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mt-16 px-4 md:px-0'
            >
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image src='/premium.svg' alt='' width={40} height={40} />
                <h6 className='text-sm font-bold text-white mt-2'>
                  Design premium
                </h6>
                <p className='text-sm text-white/70'>
                  Visual premium assim como as maiores marcas do mundo
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image src='/devices.svg' alt='' width={40} height={40} />
                <h6 className='text-sm font-bold text-white mt-2'>
                  Site responsivo
                </h6>
                <p className='text-sm text-white/70'>
                  Adaptado para diversos tamanhos de dispositivos
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image src='/copy.svg' alt='' width={40} height={40} />
                <h6 className='text-sm font-bold text-white mt-2'>
                  Copy assertiva
                </h6>
                <p className='text-sm text-white/70'>
                  Copy otimizada para aumentar suas taxas de conversão
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image src='/animacoes.svg' alt='' width={40} height={40} />
                <h6 className='text-sm font-bold text-white mt-2'>Animações</h6>
                <p className='text-sm text-white/70'>
                  Visual premium assim como as maiores marcas do mundo
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image
                  src='/desktop-outline.svg'
                  alt=''
                  width={40}
                  height={40}
                />
                <h6 className='text-sm font-bold text-white mt-2'>
                  Tecnologia de ponta
                </h6>
                <p className='text-sm text-white/70'>
                  O melhor em tecnologia para entregar o máximo em resultados
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image src='/filter-server.svg' alt='' width={40} height={40} />
                <h6 className='text-sm font-bold text-white mt-2'>
                  SEO otimizado
                </h6>
                <p className='text-sm text-white/70'>
                  Alcanse o topo dos resultados de busca com SEO otimizado
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image src='/shield.svg' alt='' width={40} height={40} />
                <h6 className='text-sm font-bold text-white mt-2'>
                  Suporte personalizado
                </h6>
                <p className='text-sm text-white/70'>
                  Prontos para resolver qualquer problema que você tenha
                </p>
              </div>
              <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg border border-white/20 hover:border-white animate-gradient-2'>
                <Image
                  src='/rocket-outline.svg'
                  alt=''
                  width={40}
                  height={40}
                />
                <h6 className='text-sm font-bold text-white mt-2'>
                  Velocidade imbatível
                </h6>
                <p className='text-sm text-white/70'>
                  Seu site mais rápido do que nunca
                </p>
              </div>
            </section>

            <section
              id='process'
              className='flex flex-col gap-4 max-w-6xl mt-16 px-4 md:px-0'
            >
              <div className='max-w-5xl flex flex-col gap-4 items-center mx-auto'>
                <Badge className='rounded-full px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 z-20'>
                  Como funciona?
                </Badge>
                <h1 className='text-5xl md:text-7xl font-extrabold text-white tracking-tight z-20'>
                  O processo mais simples e rápido do mercado
                </h1>
                <p className='text-lg font-normal text-white text-center max-w-2xl z-20'>
                  Em 5 passos simples e rápidos, você terá um site premium
                  pronto para gerar vendas por você!
                </p>
              </div>
              <div className='relative max-w-[700px] mx-auto mt-8 space-y-6'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-[2px] h-full bg-white/20'></div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='flex flex-col items-end text-end p-4'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#8D44F6] text-white font-bold animate-gradient'>
                      1
                    </div>
                    <h6 className='text-lg font-bold text-white mt-2'>
                      Briefing
                    </h6>
                    <p className='text-sm text-white/70'>
                      Você vai responder a algumas perguntas rápidas pelo
                      WhatsApp, com isso, capturamos as informações essenciais
                      para criar o site perfeito para o seu negócio.
                    </p>
                  </div>
                  <div />
                </div>
                <div className='grid grid-cols-2'>
                  <div />
                  <div className='flex flex-col items-start text-start p-4'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#8D44F6] text-white font-bold animate-gradient'>
                      2
                    </div>
                    <h6 className='text-lg font-bold text-white mt-2'>
                      Desenvolvimento
                    </h6>
                    <p className='text-sm text-white/70'>
                      Usamos as melhores tecnologias do mercado para desenvolver
                      um site premium, rápido e otimizado para conversão.
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='flex flex-col items-end text-end p-4'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#8D44F6] text-white font-bold animate-gradient'>
                      3
                    </div>
                    <h6 className='text-lg font-bold text-white mt-2'>
                      Validação
                    </h6>
                    <p className='text-sm text-white/70'>
                      Antes de lançar, você revisa tudo para garantir que o site
                      está exatamente como imaginou — ou melhor!
                    </p>
                  </div>
                  <div />
                </div>
                <div className='grid grid-cols-2'>
                  <div />
                  <div className='flex flex-col items-start text-start p-4'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#8D44F6] text-white font-bold animate-gradient'>
                      4
                    </div>
                    <h6 className='text-lg font-bold text-white mt-2'>
                      Entrega
                    </h6>
                    <p className='text-sm text-white/70'>
                      Seu site entra no ar com total performance e pronto para
                      converter visitantes em clientes.
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='flex flex-col items-end text-end p-4'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#8D44F6] text-white font-bold animate-gradient'>
                      5
                    </div>
                    <h6 className='text-lg font-bold text-white mt-2'>
                      Suporte
                    </h6>
                    <p className='text-sm text-white/70'>
                      Conte com nosso suporte dedicado para ajustes e melhorias
                      constantes, garantindo que seu site continue entregando
                      resultados.
                    </p>
                  </div>
                  <div />
                </div>
              </div>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mt-32'>
              <div className='relative w-full h-[600px]'>
                <Image
                  src='/mobile-mock.png'
                  fill
                  alt='mobile'
                  className='object-contain z-20'
                />
                <div className='absolute inset-0 -top-20 flex items-center justify-center z-10 bg-purple-radial opacity-50'>
                  <Image src='/linear-lines.svg' alt='' fill />
                </div>
              </div>
              <div className='text-start max-w-[600px] space-y-4 px-4 md:px-0'>
                <Badge className='rounded-full px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 z-20'>
                  <MonitorSmartphone className='w-4 h-4' />
                  Design Mobile First
                </Badge>
                <h2 className='text-5xl font-bold text-white'>
                  Visual premium e performance que trazem resultados
                </h2>
                <ul>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Design alinhado com a sua marca
                  </li>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Acessível por todos os dispositivos
                  </li>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Desenvolvimento em tempo récorde
                  </li>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Visual premium
                  </li>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Transmite mais credibilidade e autoridade
                  </li>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Estrutura feita para converter seus leads
                  </li>
                  <li className='inline-flex items-center gap-2 text-white'>
                    <Check className='text-green-500' />
                    Copy pensada para gerar vendas
                  </li>
                </ul>
                <Link href='/briefing' className='w-full md:w-fit z-20'>
                  <Button className='w-full md:w-fit mt-8 animate-gradient'>
                    Criar meu site
                    <Zap />
                  </Button>
                </Link>
              </div>
            </section>

            <section
              id='portfolio'
              className='flex flex-col gap-4 max-w-6xl mt-32'
            >
              <div className='max-w-5xl flex flex-col gap-4 items-center mx-auto px-4 md:px-0'>
                <Badge className='rounded-full px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 z-20'>
                  Portfólio
                </Badge>
                <h1 className='text-5xl md:text-7xl font-extrabold text-white tracking-tight z-20'>
                  Design Premium + Performance = Vendas
                </h1>
                <p className='text-lg font-normal text-white text-center max-w-2xl z-20'>
                  Esses são alguns dos sites que já criamos para nossos
                  clientes.
                </p>
              </div>
              <div>
                <Carousel plugins={[Autoplay({ delay: 4000 })]}>
                  <CarouselContent className='h-[1040px]'>
                    {projectsSite.map((project) => (
                      <CarouselItem
                        key={project.id}
                        className='basis-1/2 md:basis-1/3'
                      >
                        <div className='w-full h-full relative rounded-xl md:rounded-3xl border-4 border-white/20 overflow-hidden'>
                          <Image
                            src={project.src}
                            alt={project.alt}
                            fill
                            className='object-cover object-top'
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </section>

            <section
              id='price'
              className='flex flex-col items-center gap-4 max-w-6xl mt-32 px-4 md:px-0'
            >
              <div className='max-w-5xl flex flex-col gap-4 items-center mx-auto'>
                <Badge className='rounded-full px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 z-20'>
                  Investimento
                </Badge>
                <h1 className='text-5xl md:text-7xl font-extrabold text-white tracking-tight z-20'>
                  O design premium mais barato que você já viu!
                </h1>
                <p className='text-lg font-normal text-white text-center max-w-2xl z-20'>
                  Invista em um site premium e alcance resultados incríveis
                </p>
              </div>
              <div className='p-0.5 mt-5 rounded-3xl w-full animate-gradient-3 max-w-[400px]'>
                <div className='w-full max-w-[400px] flex flex-col items-start gap-5 p-6 rounded-3xl bg-[#03011498] shadow-xl'>
                  <div className='w-full flex flex-col items-start'>
                    <div className='flex justify-end w-full'></div>
                    <h2 className='text-white text-7xl font-extrabold text-start'>
                      <span className='text-sm font-light'>12x</span>
                      R$49
                      <span className='text-sm font-light'>,90</span>
                    </h2>
                    <p className='text-white/70 text-sm'>
                      Tenha um site premium
                    </p>
                  </div>
                  <ul className='text-start flex flex-col gap-2'>
                    {bennefits.map((bennefit) => (
                      <li
                        key={bennefit.title}
                        className='text-white text-md inline-flex items-center gap-2'
                      >
                        <Check className='text-emerald-400 w-5 h-5' />{' '}
                        {bennefit.title}{' '}
                        {!bennefit.active && (
                          <span className='text-white/40'>(em breve)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Link href='/briefing' className='w-full z-20'>
                    <Button className='w-full bg-white text-black hover:bg-white hover:text-black'>
                      Criar meu site
                      <Zap />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <section
              id='faq'
              className='flex flex-col items-center gap-4 max-w-6xl mt-32 px-4 md:px-0'
            >
              <div className='max-w-5xl flex flex-col gap-4 items-center mx-auto'>
                <Badge className='rounded-full px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 z-20'>
                  FAQ
                </Badge>
                <h1 className='text-5xl md:text-4xl font-extrabold text-white tracking-tight z-20'>
                  Ficou com alguma dúvida?
                </h1>
                <p className='text-md font-normal text-white text-center max-w-2xl z-20'>
                  Confira algumas perguntas frequentes que sempre recebemos
                </p>
              </div>
              <div className='w-full max-w-3xl'>
                <Accordion type='single' collapsible>
                  {faq.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={`${item.id}`}
                      className='border-b border-white/20'
                    >
                      <AccordionTrigger className='text-white'>
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className='text-white/70 text-start'>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            <section className='flex flex-col items-center gap-4 w-full mt-32 px-4 md:px-0 py-12 md:rounded-lg animate-gradient-3'>
              <div className='flex flex-col gap-4 items-center mx-auto'>
                <Badge className='rounded-full px-4 py-2 shadow-none bg-white/10 border-white/20 text-white gap-2 z-20'>
                  Contato
                </Badge>
                <h1 className='text-5xl md:text-4xl font-extrabold text-white tracking-tight z-20'>
                  Ainda está com dúvidas?
                </h1>
                <p className='text-md font-normal text-white text-center max-w-2xl z-20'>
                  Clique no botão abaixo e fale com a gente pelo WhatsApp. Fique
                  a vontade para entrar em contato conosco, estamos prontos para
                  te ajudar!
                </p>
                <a
                  target='_blank'
                  href='https://wa.me/5538999932655?text=Ol%C3%A1!%20Vim%20pela%20EasePage%20e%20quero%20falar%20sobre%20um%20site'
                >
                  <Button className='bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-xl'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path
                        d='M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z'
                        fillRule='evenodd'
                        className='fill-white'
                      />
                    </svg>
                    Fale com a gente!
                  </Button>
                </a>
              </div>
            </section>

            <section
              id='faq'
              className='flex flex-col items-center gap-4 max-w-6xl mt-32 px-4 md:px-0'
            >
              <div className='max-w-5xl flex flex-col gap-2 items-center mx-auto'>
                <span className='text-white text-sm'>
                  &copy; {new Date().getFullYear()} EasePage. Todos os direitos
                  reservados.
                </span>
                <span className='text-white/80 text-sm space-x-2'>
                  <Link href='/terms-of-use' target='_blank'>
                    Termos de uso
                  </Link>
                  <span>•</span>
                  <Link href='/privacy-police' target='_blank'>
                    Política de privacidade
                  </Link>
                </span>

                <p className='text-xs text-white/60'>
                  Este site não é afiliado ao Facebook, Instagram ou qualquer
                  outra entidade do grupo Meta. Todo o conteúdo e serviço
                  oferecidos são de responsabilidade exclusiva da nossa empresa
                  e não são patrocinados, endossados ou administrados por essas
                  plataformas. Os resultados mencionados podem variar de acordo
                  com o esforço individual e outros fatores externos.
                </p>
              </div>
            </section>
          </main>
        </div>

        <a
          target='_blank'
          href='https://wa.me/5538999932655?text=Ol%C3%A1!%20Vim%20pela%20EasePage%20e%20quero%20falar%20sobre%20um%20site'
        >
          <Button className='bg-emerald-600 hover:bg-emerald-500 rounded-full fixed bottom-4 right-4 md:bottom-8 md:right-12 z-20 animate__delay-5s animate__animated animate__bounceInRight shadow-xl'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path
                d='M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z'
                fillRule='evenodd'
                className='fill-white'
              />
            </svg>
            Fale com a gente!
          </Button>
        </a>
      </div>
    </>
  )
}
