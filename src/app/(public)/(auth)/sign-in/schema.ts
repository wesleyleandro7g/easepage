import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(2, 'Informe o seu email')
    .max(50, 'Tamanho máximo excedido'),
})

export type signInFormSchemaType = z.infer<typeof signInFormSchema>
