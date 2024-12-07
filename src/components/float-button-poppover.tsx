import { Check, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { themes, setTheme } from '@/config/theme'
import type { themeType } from '@/config/theme/theme'
import { Button } from './ui/button'

export function FloatButtonPopover() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])

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
      <PopoverTrigger className='bg-gradient-to-bl from-[#F8ACFF] to-[#FFF95B] p-2 rounded-full shadow-xl fixed right-8 bottom-10'>
        <Zap className='w-10 h-10 fill-[#D9D9D9]' />
      </PopoverTrigger>
      <PopoverContent className='w-screen shadow-none mx-auto bg-transparent border-0'>
        <div className='flex flex-col gap-2 p-4 w-full bg-white shadow-xl rounded-lg border outline-none relative'>
          <div className='space-y-2'>
            <span className='text-sm'>Temas</span>
            <div className='grid grid-cols-6 gap-2'>
              {themes.map((theme: themeType) => {
                return (
                  <label
                    key={theme}
                    className={`flex items-center justify-center w-full h-[62px] rounded-lg border border-black/20 ${theme}`}
                  >
                    <input
                      type='radio'
                      name='theme'
                      value={theme}
                      className='hidden'
                      onChange={() => handleChangeTheme(theme)}
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

          <Button className='w-full'>Publicar meu site</Button>
          <div className='absolute bottom-[-7px] right-[10%] transform -translate-x-[5%] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white rounded-t-sm'></div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
