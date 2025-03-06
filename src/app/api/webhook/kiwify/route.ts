import { createServer } from '@/db/supabase/server'
// import twilio from 'twilio'

import { WebhookEventType } from './type'

export async function POST(request: Request) {
  const data = (await request.json()) as WebhookEventType

  try {
    //   const twilioClient = twilio(
    //     process.env.TWILIO_ACCOUNT_SID,
    //     process.env.TWILIO_AUTH_TOKEN
    //   )

    console.log('Webhook received:', data)

    const clientServer = createServer()

    if (data.webhook_event_type === 'order_approved') {
      if (data.TrackingParameters.src) {
        await clientServer
          .from('pages')
          .update({
            is_active: true,
          })
          .eq('id', data.TrackingParameters.src)
      } else {
        console.log('No data.TrackingParameters.src received')
      }
      //   if (data.webhook_event_type === 'order_approved') {
      //     const costumerName = data.Customer.first_name
      //     const phoneNumber = data.Customer.mobile

      //     const message = `Olá ${costumerName}, sua compra foi aprovada com sucesso! Obrigado por confiar em nós.`

      //     await twilioClient.messages.create({
      //       from: 'whatsapp:+14155238886', // Número WhatsApp do Twilio
      //       to: `whatsapp:${phoneNumber}`, // Número do cliente
      //       body: message,
      //     })

      //     console.log('Mensagem enviada com sucesso!')
      //     console.log(`Order approved for ${name} with phone ${phoneNumber}`)
      //   }
    }

    return Response.json({ received: true }, { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 400 })
  }
}
