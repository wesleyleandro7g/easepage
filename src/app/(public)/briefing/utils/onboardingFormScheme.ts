import { z } from 'zod'

export const onboardingFormScheme = z
  .object({
    type: z.string(),
    customType: z.string().optional(),
    style: z.string(),
    customStyle: z.string().optional(),
    theme: z.string(),
    title: z.string().min(3, 'Digite um título').max(40, 'Título muito longo'),
    description: z
      .string()
      .min(40, 'Escreva pelo menos 40 caracteres')
      .max(280, 'Descrição muito longa'),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.type === 'other' &&
        (!data.customType ||
          data.customType === '' ||
          data.customType === undefined)
      ) {
        return false
      }

      return true
    },
    { message: 'Digite o tipo de produto', path: ['customType'] }
  )
  .refine(
    (data) => {
      if (
        data.style === 'other' &&
        (!data.customStyle ||
          data.customStyle === '' ||
          data.customStyle === undefined)
      ) {
        return false
      }

      return true
    },
    { message: 'Digite o tipo de estilo', path: ['customStyle'] }
  )
