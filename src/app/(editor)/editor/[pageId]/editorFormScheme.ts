import { z } from 'zod'

export const editorFormScheme = z.object({
  // title: z
  //   .string()
  //   .min(5, 'O título do seu site deve ter no mínimo 5 caracteres.'),
  // description: z
  //   .string()
  //   .min(10, 'A descrição do seu site deve ter no mínimo 10 caracteres.'),
  theme: z.string(),
  headline: z
    .string()
    .min(
      30,
      'A sua HEADLINE está muito curta! Fale sobre o resultado imediato que você irá gerar.'
    )
    .max(
      80,
      'A sua HEADLINE está muito grande! Mantenha ela um pouco menor e mais direta.'
    ),
  subheadline: z
    .string()
    .min(
      30,
      'A sua SUBHEADLINE está muito curta! Fale sobre o resultado imediato que você irá gerar.'
    )
    .max(
      240,
      'A sua SUBHEADLINE está muito grande! Mantenha ela um pouco menor e mais direta.'
    ),
  heroButtonText: z.string().min(10, 'O texto do botão não pode estar vazio.'),
  heroButtonLink: z
    .string({ required_error: 'O link do botão é obrigatório.' })
    .url('O link do botão deve ser uma URL válida.'),
})

export type EditorFormSchemeType = z.infer<typeof editorFormScheme>
