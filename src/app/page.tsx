'use client'

import LandingPage from './(service)/premium-website/page'

export function Home() {
  return <LandingPage />
}

// import 'animate.css'
// import { useState } from 'react'
// import { Palette, Zap, Sparkles, LogIn } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import Autoplay from 'embla-carousel-autoplay'

// import { setTheme, themes } from '@/config/theme'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   // CarouselNext,
//   // CarouselPrevious,
// } from '@/components/ui/carousel'

// const projectsCover = [
//   { id: 1, src: '/assets/tuany-project-2.png', alt: 'Tuany Miranda Project' },
//   { id: 2, src: '/assets/james-project.png', alt: 'James Moto Shop Project' },
//   {
//     id: 3,
//     src: '/assets/farol-project.png',
//     alt: 'Farol Contabilidade Project',
//   },
//   { id: 4, src: '/assets/ismael-project.png', alt: 'Ismael Costa Project' },
//   { id: 5, src: '/assets/tecport-project.png', alt: 'TecPort Project' },
//   { id: 6, src: '/assets/celia-project.png', alt: 'Celia Cannavino Project' },
//   { id: 7, src: '/assets/wesley-project.png', alt: 'Wesley Leandro Project' },
//   { id: 8, src: '/assets/tuany-project.png', alt: 'Tuany Miranda Project' },
// ]

// export default function LandingPage() {
//   const [currentTheme, setCurrentTheme] = useState(0)

//   function handleNextTheme() {
//     if (currentTheme === themes.length - 1) {
//       setCurrentTheme(0)
//       setTheme(themes[0])
//       return
//     }

//     setTheme(themes[currentTheme + 1])
//     setCurrentTheme(currentTheme + 1)
//   }

//   return (
//     <div className='min-h-screen'>
//       <div className='flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//         <header className='flex w-full justify-between items-center py-6 animate__animated animate__bounceInDown'>
//           <div className='flex items-center space-x-2 text-black'>
//             <Image
//               src='/easepage-logo.svg'
//               alt='Ease Page Logo'
//               width={150}
//               height={40}
//             />
//           </div>
//           <div className='flex items-center space-x-2 text-black'>
//             <Link href='/sign-in' className='w-fit'>
//               <Button
//                 variant='outline'
//                 size='sm'
//                 className='animate__animated animate__bounceInDown'
//               >
//                 Login
//                 <LogIn className='w-4 h-4' />
//               </Button>
//             </Link>
//           </div>
//         </header>

//         <main className='mt-10 md:mt-20 pb-16 text-center'>
//           <section className='flex flex-col gap-4 max-w-6xl items-center text-center'>
//             <Badge className='rounded-full px-4 py-2 shadow-none bg-white/60 gap-2 animate__animated animate__bounceInUp'>
//               <Sparkles className='w-4 h-4' />
//               Tenha um site turbinado
//             </Badge>
//             <h1 className='text-5xl md:text-8xl font-extrabold tracking-tight animate__animated animate__bounceInUp text-headline'>
//               Crie sites incríveis em um passe de mágica!
//             </h1>
//             <p className='text-lg font-normal text-subheadline text-center max-w-2xl animate__animated animate__bounceInUp'>
//               Crie páginas de alta conversão de forma simples e rápida, mesmo
//               sem experiência técnica ou um orçamento alto!
//             </p>
//             <div className='flex flex-col md:flex-row w-full justify-center'>
//               <Link href='/onboarding' className='w-full md:w-fit'>
//                 <Button className='animate__animated animate__bounceInUp w-full md:w-full'>
//                   Criar meu site
//                   <Zap />
//                 </Button>
//               </Link>
//               <Button
//                 variant='link'
//                 className='animate__animated animate__bounceInUp animate__delay-0.5s text-headline px-4'
//                 onClick={handleNextTheme}
//               >
//                 Trocar tema do site
//                 <Palette className='w-5 h-5 text-headline' />
//               </Button>
//             </div>
//             <div className='w-full mt-4 md:mt-8 animate__animated animate__fadeInUp'>
//               <Carousel plugins={[Autoplay({ delay: 4000 })]}>
//                 <CarouselContent className='h-[200px] md:h-[640px]'>
//                   {projectsCover.map((project) => (
//                     <CarouselItem key={project.id}>
//                       <div className='w-full h-full relative rounded-2xl md:rounded-3xl border-8 border-black/20 overflow-hidden'>
//                         <Image
//                           src={project.src}
//                           alt={project.alt}
//                           fill
//                           className='object-cover'
//                         />
//                       </div>
//                     </CarouselItem>
//                   ))}
//                 </CarouselContent>
//                 {/* <CarouselPrevious />
//                 <CarouselNext /> */}
//               </Carousel>
//             </div>
//           </section>

//           <section className='grid grid-cols-4 gap-4 max-w-6xl mt-16'>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg bg-gradient-to-br from-black/60 to-black/40'>
//               <Image src='/premium.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-white'>Design premium</h6>
//               <p className='text-sm text-white/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg  animate__animated animate__fadeInUp'>
//               <Image src='/premium-black.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-black'>Design premium</h6>
//               <p className='text-sm text-black/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg  animate__animated animate__fadeInUp'>
//               <Image src='/premium-black-2.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-black'>Design premium</h6>
//               <p className='text-sm text-black/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg  animate__animated animate__fadeInUp'>
//               <Image src='/premium-black.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-black'>Design premium</h6>
//               <p className='text-sm text-black/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg  animate__animated animate__fadeInUp'>
//               <Image src='/premium-black.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-black'>Design premium</h6>
//               <p className='text-sm text-black/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg bg-black animate__animated animate__fadeInUp'>
//               <Image src='/premium.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-white'>Design premium</h6>
//               <p className='text-sm text-white/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg bg-black animate__animated animate__fadeInUp'>
//               <Image src='/premium.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-white'>Design premium</h6>
//               <p className='text-sm text-white/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//             <div className='flex flex-col p-4 gap-0.5 text-start rounded-lg bg-black animate__animated animate__fadeInUp'>
//               <Image src='/premium.svg' alt='' width={40} height={40} />
//               <h6 className='font-semibold text-white'>Design premium</h6>
//               <p className='text-sm text-white/80'>
//                 Visual premium assim como as maiores marcas do mundo
//               </p>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }

// Use o poder da Inteligência Artificial para criar sites incríveis em minutos!
