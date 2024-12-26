export async function POST(request: Request) {
  const data = await request.json()

  console.log('Received data:', data)

  return Response.json({ received: true }, { status: 200 })
}
