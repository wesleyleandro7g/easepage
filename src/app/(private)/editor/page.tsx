'use client'

import { createElement, useEffect } from 'react'
import {
  LayoutDashboard,
  Palette,
  Plus,
  Trash,
  WandSparkles,
  Link as LinkIcon,
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { AddSection } from '@/components/drawers/add-section'
import { ChangeVariant } from '@/components/drawers/change-variant'
import { ConfigPopup } from '@/components/builder/config-popup'

import { useSections } from '@/hooks/useSections'
import { SectionOptionType } from '@/types/section'
import { ManageLinks } from '@/components/drawers/manage-links'

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
  } = useSections()

  const searchParams = useSearchParams()

  const pageId = searchParams.get('page_id')

  useEffect(() => {
    if (pageId) {
      getSectionsFromDB(pageId)
    }
  }, [])

  return (
    <div className='min-h-screen relative' onClick={handleSectionBlur}>
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
