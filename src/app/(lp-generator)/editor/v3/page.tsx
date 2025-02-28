'use client'

import { CustomVariants } from '@/components/builder/sections'
import {
  sectionOptions,
  type SectionOptionType,
} from '@/components/builder/utils/section-options'
import { SelectSectionLayout } from '@/components/drawers/select-section-layout'
import { SelectSectionLayoutVariant } from '@/components/drawers/select-section-layout-variant'
import { LayoutTemplate, Plus, Trash } from 'lucide-react'
import { createElement, useState } from 'react'

export default function PageEditor() {
  const [sections, setSections] = useState(sectionOptions)
  const [focusedSection, setFocusedSection] = useState<string | null>(null)

  // async function getAllTextContent() {
  //   const contentEdited: { [x: string]: string | null | undefined }[] = []
  //   contentList.map((content) => {
  //     const value = document.getElementById(content)?.textContent
  //     contentEdited.push({ [content]: value })
  //   })
  //   console.log(contentEdited)
  // }

  function addNewSection(layout: string, variant: string) {
    if (focusedSection === null) return

    const id = `${layout.toLowerCase()}-${crypto.randomUUID().split('-')[0]}`

    const variantLayout = sectionOptions.find((item) => item.name === layout)

    const newSection: SectionOptionType = {
      id,
      name: variantLayout?.name || 'Custom',
      variant: variant || 'Default',
      variantOptions: variantLayout?.variantOptions,
      component: variantLayout?.component || CustomVariants,
      content: variantLayout?.content,
      contentList: variantLayout?.contentList || [],
      description: variantLayout?.description || 'Custom section',
      image: variantLayout?.image || '',
      variants: variantLayout?.variants || [],
    }

    const updatedSections = [...sections]
    const insertIndex =
      sections.findIndex((section) => section.id === focusedSection) + 1
    updatedSections.splice(insertIndex, 0, newSection)
    setSections(updatedSections)
    setFocusedSection(newSection.id)
  }

  function removeFocusedSection() {
    if (focusedSection === null) return

    const updatedSections = sections.filter(
      (section) => section.id !== focusedSection
    )
    setSections(updatedSections)
    setFocusedSection(null)
  }

  function handleFocus(id: string) {
    console.log('focus on section', id)
    setFocusedSection(id)
  }

  function handleBlur() {
    setFocusedSection(null)
    console.log('blur')
  }

  function handleVariantChange(
    id: string,
    newVariant: string,
    contentList: string[]
  ) {
    const updatedSections = sections.map((section) => {
      if (section.id === id) {
        const contentEdited: { [x: string]: string | null | undefined } = {}
        contentList.forEach((content) => {
          const value = document.getElementById(content)?.textContent
          contentEdited[content] = value
        })
        return { ...section, variant: newVariant, content: contentEdited }
      }
      return section
    })
    setSections(updatedSections)
  }

  return (
    <div className='min-h-screen relative' onClick={handleBlur}>
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
                  handleFocus(id)
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
      </main>

      {/* <button type='button' onClick={getAllTextContent}>
        Submit
      </button> */}
    </div>
  )
}
