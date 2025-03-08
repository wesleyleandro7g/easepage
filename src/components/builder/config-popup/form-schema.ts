import { z } from 'zod'

export const configFormSchema = z.object({
  style: z.string(),
  theme: z.string(),
  font: z.string(),
  title: z.string().min(5, 'Título muito curto').max(30, 'Título muito longo'),
  slogan: z.string().min(5, 'Slogan muito curto').max(40, 'Slogan muito longa'),
  whatsapp: z.string().optional(),
  whatsapp_message: z.string().optional(),
})

export type ConfigFormSchemaType = z.infer<typeof configFormSchema>
