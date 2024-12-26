export async function POST(request: Request) {
  //   const { event } = await request.json()
  const data = request.body

  console.log('Received data:', data)

  return Response.json({ received: true }, { status: 200 })
}
