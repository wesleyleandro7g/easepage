export type PageDataType = {
  id?: string
  title?: string
  description?: string
  slogan?: string
  slug?: string
  theme?: string
  style?: string
  type?: string
  is_active?: boolean
  user_id?: string
  whatsapp?: string
  whatsapp_message?: string
}

export type PageType = {
  id: string
  created_at: string
  title: string
  description: string
  domain: string | null
  slug: string
  theme: string
  font: string | null
  user_id: string
  is_active: boolean
  page_structure: Record<string, unknown>
  style: string
  type: string
  slogan: string
  whatsapp: string
  whatsapp_message: string
}
