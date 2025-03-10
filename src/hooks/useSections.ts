import { useState } from 'react'

import { CustomVariants } from '@/components/builder/sections'
import { defaultSections } from '@/components/builder/utils/sections/default'
import { sectionOptions } from '@/components/builder/utils/sections/options'

import { usePageContent } from '@/context/page-context'
import type { SectionOptionType } from '@/types/section'

import { supabase } from '@/db/supabase/client'

type ContentType = {
  [key: string]: {
    id: string
    name: string
    variant: string
    content: { [x: string]: string | null | undefined }
    link?: string
    buttonId?: string
    position: number
  }
}

export function useSections() {
  const { sections, setSections, setPageData } = usePageContent()

  const [focusedSection, setFocusedSection] = useState<string | null>(null)
  const [loadingSections, setLoadingSections] = useState<boolean>(true)
  const [hasSectionError, setHasSectionError] = useState<boolean>(false)

  function addNewSection(layout: string, variant: string) {
    if (focusedSection === null) return

    const hash = crypto.randomUUID().split('-')[0]

    const variantLayout = defaultSections(hash).find(
      (item) => item.name === layout
    )

    const newSection: SectionOptionType = {
      id: `${layout.toLowerCase()}-${hash}`,
      name: variantLayout?.name || 'Custom',
      variant: variant || 'Default',
      variantOptions: variantLayout?.variantOptions,
      component: variantLayout?.component || CustomVariants,
      content: variantLayout?.content || {},
      contentList: variantLayout?.contentList || [],
      description: variantLayout?.description || 'Custom section',
      image: variantLayout?.image || '',
      variants: variantLayout?.variants || [],
      buttonId: variantLayout?.buttonId || '',
    }

    const updatedSections = [...sections]
    const insertIndex =
      sections.findIndex((section) => section.id === focusedSection) + 1
    updatedSections.splice(insertIndex, 0, newSection)
    setSections(updatedSections)
    setFocusedSection(newSection.id)
  }

  function addSectionLink(id: string, link: string) {
    const updatedSections = sections.map((section) => {
      if (section.id === id) {
        return { ...section, link }
      }
      return section
    })
    setSections(updatedSections)
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

  function removeFocusedSection() {
    if (focusedSection === null) return

    const updatedSections = sections.filter(
      (section) => section.id !== focusedSection
    )
    setSections(updatedSections)
    setFocusedSection(null)
  }

  function handleSectionFocus(id: string) {
    setFocusedSection(id)
  }

  function handleSectionBlur() {
    setFocusedSection(null)
  }

  function getSectionsEditedContent() {
    let editedContent: ContentType = {}

    sections.map((section, index) => {
      section.contentList.map((content) => {
        const value = document.getElementById(content)?.textContent
        section.content = {
          ...section.content,
          [content]: value,
        }
      })

      editedContent = {
        ...editedContent,
        [section.id]: {
          id: section.id,
          name: section.name,
          variant: section.variant,
          content: section.content,
          link: section.link,
          buttonId: section.buttonId,
          position: index + 1,
        },
      }
    })

    return editedContent
  }

  function convertSectionsInObject(data: SectionOptionType[]) {
    let dataToSave: ContentType = {}

    data.map((section, index) => {
      dataToSave = {
        ...dataToSave,
        [section.id]: {
          id: section.id,
          name: section.name,
          variant: section.variant,
          content: section.content,
          link: section.link,
          buttonId: section.buttonId,
          position: index + 1,
        },
      }
    })

    return dataToSave
  }

  function convertSectionsInArray(data: ContentType) {
    const dataToSaveArray = Object.values(data)
    return dataToSaveArray
  }

  async function getSectionsFromDB(pageId: string) {
    setLoadingSections(true)

    const { data } = await supabase
      .from('pages')
      .select()
      .eq('id', pageId)
      .single()

    if (!data || !data.page_structure) {
      setLoadingSections(false)
      setHasSectionError(true)
      return console.log('no data')
    }

    const sectionDataValue: SectionOptionType[] = []
    const dataContent = data.page_structure

    Object.keys(dataContent).forEach((sectionId, index) => {
      const section = dataContent[sectionId]
      const sectionOption =
        sectionOptions[section.name as keyof typeof sectionOptions]

      sectionDataValue.push(
        sectionOption({
          id: '',
          variant: section.variant,
          content: {},
        })
      )

      const contentList = Object.keys(section.content)

      sectionDataValue[index].id = sectionId
      sectionDataValue[index].variant = section.variant
      sectionDataValue[index].link = section.link
      sectionDataValue[index].buttonId = section.buttonId
      sectionDataValue[index].content = section.content
      sectionDataValue[index].contentList = contentList
    })

    setPageData({
      title: data.title,
      description: data.description,
      theme: data.theme,
      font: data.font,
      style: data.style,
      slug: data.slug,
      type: data.type,
      slogan: data.slogan,
      is_active: data.is_active,
      id: data.id,
      user_id: data.user_id,
      whatsapp: data.whatsapp,
      whatsapp_message: data.whatsapp_message,
    })
    setSections(sectionDataValue)
    setLoadingSections(false)
  }

  return {
    sections,
    focusedSection,
    setFocusedSection,
    addNewSection,
    addSectionLink,
    getSectionsEditedContent,
    removeFocusedSection,
    handleVariantChange,
    handleSectionFocus,
    handleSectionBlur,
    convertSectionsInObject,
    convertSectionsInArray,
    getSectionsFromDB,
    loadingSections,
    hasSectionError,
  }
}
