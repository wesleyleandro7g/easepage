/* eslint-disable @typescript-eslint/no-explicit-any */
export type ContentType = { [x: string]: string | null | undefined }

export type SectionOptionType = {
  id: string
  name: string
  variant: string
  variantOptions?: string[]
  description: string
  image: string
  focused?: boolean
  content: ContentType
  contentList: string[]
  component: any
  variants: {
    id: string
    name: string
    description: string
    component: any
    image: string
  }[]
  ai_prompt_properties?: {
    [key: string]: {
      description: string
      type: string
    }
  }
}
