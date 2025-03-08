'use client'

import { createElement, useEffect } from 'react'
import {
  LayoutDashboard,
  Palette,
  Plus,
  Trash,
  WandSparkles,
  Link as LinkIcon,
  Zap,
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { AddSection } from '@/components/drawers/add-section'
import { ChangeVariant } from '@/components/drawers/change-variant'
import { ConfigPopup } from '@/components/builder/config-popup'

import { useSections } from '@/hooks/useSections'
import { SectionOptionType } from '@/types/section'
import { ManageLinks } from '@/components/drawers/manage-links'
import { usePageContent } from '@/context/page-context'
import { Button } from '@/components/ui/button'

import { fonts } from '@/config/fonts'

export default function Editor() {
  const {
    sections,
    focusedSection,
    handleSectionBlur,
    handleSectionFocus,
    addNewSection,
    handleVariantChange,
    removeFocusedSection,
    getSectionsFromDB,
    loadingSections,
    hasSectionError,
  } = useSections()
  const { pageData } = usePageContent()

  const searchParams = useSearchParams()

  const pageId = searchParams.get('page_id')

  const font = fonts.find((item) => item.name === pageData.font)?.font.className

  useEffect(() => {
    if (pageId) {
      getSectionsFromDB(pageId)
    }
  }, [])

  if (hasSectionError) {
    return (
      <div className='flex flex-col items-center justify-center w-full min-h-screen py-12 px-8 gap-2'>
        <h1 className='text-7xl text-center font-bold tracking-tight animate__animated animate__bounceInUp'>
          🥲
        </h1>
        <h1 className='text-4xl sm:text-4xl text-center font-bold leading-[2.6rem] tracking-tight animate__animated animate__bounceInUp gradient-text-white'>
          Houve um erro ao carregar sua página!
        </h1>
        <p className='text-lg font-normal leading-5 text-center max-w-2xl animate__animated animate__bounceInUp text-white'>
          Volte para o painel e tente novamente, se o erro persistir, entre em
          contato com o suporte.
        </p>
        <div className='flex flex-col md:flex-row justify-between w-full md:w-fit gap-2 mt-8 animate__animated animate__bounceInUp'>
          <Link href='/panel' className='w-full md:w-fit'>
            <Button className='w-full md:w-fit bg-white text-black '>
              Voltar para o painel
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loadingSections) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4 p-8 max-w-3xl mx-auto'>
        <div className='flex flex-col items-center justify-center animate-pulse gap-2'>
          <Zap className='w-20 h-20 text-white' />
          <span className='text-lg text-white'>Carregando seu site...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen relative ${pageData.theme} ${font}`}
      onClick={handleSectionBlur}
    >
      <main
        className='pt-20 pb-16 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {sections.map((section: SectionOptionType) => {
          const { component, id, name, variant, content, contentList } = section

          return (
            <div key={id}>
              {createElement(component[variant], {
                id,
                variant,
                focused: focusedSection === id,
                onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation()
                  handleSectionFocus(id)
                },
                content,
              })}

              {focusedSection === id && (
                <div className='flex w-full justify-end space-x-2 mt-4 mb-4'>
                  <AddSection
                    onLayoutSelect={(layout: string, variant: string) => {
                      addNewSection(layout, variant)
                    }}
                  >
                    <button
                      type='button'
                      className='bg-black/10 rounded-md p-2 w-fit h-fit'
                    >
                      <Plus />
                    </button>
                  </AddSection>
                  <ChangeVariant
                    layoutName={name}
                    onLayoutSelect={(variant: string) => {
                      handleVariantChange(id, variant, contentList)
                    }}
                  >
                    <button
                      type='button'
                      className='bg-black/10 rounded-md p-2 w-fit h-fit'
                    >
                      <LayoutDashboard />
                    </button>
                  </ChangeVariant>

                  <ManageLinks sectionId={id} buttonId={section.buttonId}>
                    <button
                      type='button'
                      className='bg-black/10 rounded-md p-2 w-fit h-fit disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <LinkIcon />
                    </button>
                  </ManageLinks>

                  <button
                    type='button'
                    className='bg-black/10 rounded-md p-2 w-fit h-fit disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled
                  >
                    <WandSparkles />
                  </button>

                  <button
                    type='button'
                    className='bg-black/10 rounded-md p-2 w-fit h-fit disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled
                  >
                    <Palette />
                  </button>

                  {sections.length > 1 && (
                    <button
                      type='button'
                      className='bg-red-400/20 text-red-400 rounded-md p-2 w-fit h-fit'
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        removeFocusedSection()
                      }}
                    >
                      <Trash />
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </main>

      <ConfigPopup />
    </div>
  )
}
