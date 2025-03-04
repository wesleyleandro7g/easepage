'use client'

import { createElement } from 'react'
import { LayoutTemplate, Plus, Trash } from 'lucide-react'

import { SelectSectionLayout } from '@/components/drawers/select-section-layout'
import { SelectSectionLayoutVariant } from '@/components/drawers/select-section-layout-variant'
import { ConfigOptions } from '@/components/builder/config-options'

import { useSections } from '@/hooks/useSections'
import { SectionOptionType } from '@/types/section'

export default function Editor() {
  const {
    sections,
    focusedSection,
    handleSectionBlur,
    handleSectionFocus,
    addNewSection,
    getSectionsEditedContent,
    handleVariantChange,
    removeFocusedSection,
  } = useSections()

  return (
    <div className='min-h-screen relative' onClick={handleSectionBlur}>
      <main
        className='pt-20 pb-16 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {sections.map((section: SectionOptionType) => {
          const { component, id, variant, content, contentList } = section

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
                  <SelectSectionLayout
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
                  </SelectSectionLayout>
                  <SelectSectionLayoutVariant
                    layoutName='Hero'
                    onLayoutSelect={(variant: string) => {
                      handleVariantChange(id, variant, contentList)
                    }}
                  >
                    <button
                      type='button'
                      className='bg-black/10 rounded-md p-2 w-fit h-fit'
                    >
                      <LayoutTemplate />
                    </button>
                  </SelectSectionLayoutVariant>

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
        <button type='button' onClick={getSectionsEditedContent}>
          Salvar
        </button>
      </main>

      <ConfigOptions osPublish={() => {}} form={null} isSubmitting={false} />
    </div>
  )
}
