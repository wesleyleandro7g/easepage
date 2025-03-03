import { CustomVariants } from '@/components/builder/sections'
import { defaultSections } from '@/components/builder/utils/sections/default'
import { usePageContent } from '@/context/page-context'
import type { SectionOptionType } from '@/types/section'
import { useState } from 'react'

export function useSections() {
  const { sections, setSections } = usePageContent()

  const [focusedSection, setFocusedSection] = useState<string | null>(null)

  function addNewSection(layout: string, variant: string) {
    if (focusedSection === null) return

    const id = `${layout.toLowerCase()}-${crypto.randomUUID().split('-')[0]}`

    const variantLayout = defaultSections.find((item) => item.name === layout)

    const newSection: SectionOptionType = {
      id,
      name: variantLayout?.name || 'Custom',
      variant: variant || 'Default',
      variantOptions: variantLayout?.variantOptions,
      component: variantLayout?.component || CustomVariants,
      content: variantLayout?.content || {},
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

  function handleSave() {
    console.log(sections)
    let contentEdited = {}

    sections.map((section, index) => {
      let sectionContent = {}

      section.contentList.map((content) => {
        console.log(content)
        const value = document.getElementById(content)?.textContent
        sectionContent = {
          ...sectionContent,
          [content]: value,
          position: index + 1,
        }
      })

      contentEdited = {
        ...contentEdited,
        [section.id]: sectionContent,
      }
    })

    console.log(contentEdited)
  }

  function handleSectionFocus(id: string) {
    setFocusedSection(id)
  }

  function handleSectionBlur() {
    setFocusedSection(null)
  }

  return {
    sections,
    focusedSection,
    setFocusedSection,
    handleSave,
    addNewSection,
    removeFocusedSection,
    handleVariantChange,
    handleSectionFocus,
    handleSectionBlur,
  }
}
