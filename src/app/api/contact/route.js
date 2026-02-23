export async function POST(request) {
  // Contact form submission endpoint
  const data = await request.json();
  return Response.json({ success: true, data });
}
