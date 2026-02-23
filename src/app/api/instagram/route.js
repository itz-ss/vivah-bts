export async function GET(request) {

  try {
    const { searchParams } = new URL(request.url);
    const after = searchParams.get("after");

    const ACCESS_TOKEN = process.env.INSTAGRAM_TOKEN;

    let url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp&limit=3&access_token=${ACCESS_TOKEN}`;

    if (after) url += `&after=${after}`;

    const res = await fetch(url, {
      next: { revalidate: 300 }
    });

    const data = await res.json();

    return Response.json(data);

  } catch {
    return Response.json({ error: "Instagram error" }, { status: 500 });
  }
}
