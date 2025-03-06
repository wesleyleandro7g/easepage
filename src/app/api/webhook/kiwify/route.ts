// import { createServer } from '@/db/supabase/server'
// import twilio from 'twilio'

import { WebhookEvent } from './type'

export async function POST(request: Request) {
  const data = (await request.json()) as WebhookEvent

  //   const twilioClient = twilio(
  //     process.env.TWILIO_ACCOUNT_SID,
  //     process.env.TWILIO_AUTH_TOKEN
  //   )

  console.log('Webhook received:', data)

  // const clientServer = createServer()

  // await clientServer
  //   .from('service_orders')
  //   .upsert({
  //     status: data.order_status,
  //     method: data.payment_method,
  //     session_id: data.order_id,
  //   })
  //   .eq('email', data.Customer.email)

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

  return Response.json({ received: true }, { status: 200 })
}
