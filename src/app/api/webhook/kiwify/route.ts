export async function POST(request: Request) {
  const { event } = await request.json()

  console.log('Received event:', event)

  return Response.json({ received: true }, { status: 200 })
}
