import { createServer } from '@/db/supabase/server'

export async function POST(request: Request) {
  const data = await request.json()

  try {
    const clientServer = createServer()

    if (data.type === 'checkout.session.completed') {
      const pageId = data.data.object.client_reference_id

      await clientServer
        .from('pages')
        .update({
          is_active: true,
        })
        .eq('id', pageId)
    } else {
      console.log('PAGE ID NOT FOUND')
    }

    return Response.json({ received: true }, { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 400 })
  }
}
