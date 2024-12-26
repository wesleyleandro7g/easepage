import { z } from 'zod'

export const briefingFormScheme = z.object({
  type: z.string(),
  style: z.string(),
  model: z.string(),
  title: z.string().min(3, 'Digite um título').max(40, 'Título muito longo'),
  description: z
    .string()
    .min(40, 'Escreva pelo menos 40 caracteres')
    .max(280, 'Descrição muito longa'),
  name: z.string().min(3, 'Digite seu nome').max(40, 'Nome muito longo'),
  email: z
    .string()
    .email('Digite um e-mail válido')
    .max(60, 'E-mail muito longo')
    .refine((val) => !val.includes('+'), {
      message: 'O e-mail não pode conter o caractere "+"',
    }),
  phone: z
    .string()
    .min(3, 'Digite seu telefone')
    .max(20, 'Telefone muito longo'),
})
