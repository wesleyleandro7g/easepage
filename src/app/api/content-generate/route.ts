import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type BodyRequestType = {
  context: string
  properties: object
}

export async function POST(request: Request) {
  try {
    const { context, properties } = (await request.json()) as BodyRequestType

    // return NextResponse.json({
    //   hero: {
    //     'title-hero': 'Climatize Seu Espaço com Conforto e Eficiência',
    //     'description-hero':
    //       'Somos especialistas em instalação e manutenção de ar condicionado, garantindo um clima perfeito em qualquer estação. Com anos de experiência, oferecemos serviços personalizáveis para residências e empresas, assegurando a máxima eficiência e economia de energia.',
    //     'cta-hero': 'Solicite Seu Orçamento',
    //   },
    //   features: {
    //     'title-features':
    //       'Por Que Escolher Nossos Serviços de Ar Condicionado?',
    //     'description-features':
    //       'Nossos técnicos certificados oferecem uma combinação exclusiva de expertise e atenção aos detalhes em cada instalação e serviço de manutenção. Usamos apenas equipamentos de alta qualidade e oferecemos suporte pós-instalação para garantir satisfação total. Descubra soluções eficazes e sustentáveis que melhoram o ar que você respira.',
    //   },
    // })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especilista em marketing digital e sua função será gerar o conteúdo de uma landing page.',
        },
        {
          role: 'user',
          content: context,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'sections_content',
          schema: {
            type: 'object',
            properties,
            additionalProperties: false,
          },
        },
      },
      store: true,
    })

    const reponseContent = completion.choices[0].message.content

    if (!reponseContent) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 400 }
      )
    }

    const sectionsContent = JSON.parse(reponseContent)

    return NextResponse.json(sectionsContent)
  } catch (error) {
    console.log(error)
    return Response.json({ error }, { status: 400 })
  }
}
