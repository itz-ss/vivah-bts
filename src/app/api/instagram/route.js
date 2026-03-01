export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "3";
    const after = searchParams.get("after");

    const ACCESS_TOKEN = process.env.INSTAGRAM_TOKEN;

    if (!ACCESS_TOKEN) {
      return Response.json({ error: "No token configured" }, { status: 400 });
    }

    let url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp&limit=${limit}&access_token=${ACCESS_TOKEN}`;

    if (after) {
      url += `&after=${after}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      const errData = await res.json();
      return Response.json({ error: errData.error?.message || "Instagram API error" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    console.error("Instagram API Route error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
