// import { createServer } from '@/db/supabase/server'

import { WebhookEventType } from './type'

export async function POST(request: Request) {
  const data = (await request.json()) as WebhookEventType

  console.log('Webhook received:', data)
  try {
    // const clientServer = createServer()

    // if (data.webhook_event_type === 'order_approved') {
    //   if (data.TrackingParameters.src) {
    //     await clientServer
    //       .from('pages')
    //       .update({
    //         is_active: true,
    //       })
    //       .eq('id', data.TrackingParameters.src)
    //   } else {
    //     console.log('No data.TrackingParameters.src received')
    //   }

    // }

    return Response.json({ received: true }, { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 400 })
  }
}
