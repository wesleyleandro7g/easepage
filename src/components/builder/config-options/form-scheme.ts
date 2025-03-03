import { z } from 'zod'

export const configFormScheme = z.object({
  style: z.string(),
  theme: z.string(),
  title: z.string().min(3, 'Digite um título').max(30, 'Título muito longo'),
  slogan: z
    .string()
    .min(5, 'Escreva pelo menos 40 caracteres')
    .max(40, 'Slogan muito longa'),
  whatsapp: z
    .string()
    .min(3, 'Digite o número válido')
    .max(20, 'Digite um número válido')
    .optional(),
  whatsapp_message: z
    .string()
    .min(3, 'Digite uma mensagem inicial')
    .max(80, 'Mensagem muito longa')
    .optional(),
})

export type ConfigFormSchemeType = z.infer<typeof configFormScheme>
