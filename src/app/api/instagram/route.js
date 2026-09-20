import { normalizeInstagramData } from "../../../lib/instagramNormalizer";

const MEDIA_FIELDS = [
  "id",
  "media_type",
  "media_product_type",
  "media_url",
  "thumbnail_url",
  "views",
  "permalink",
  "caption",
  "timestamp",
  "like_count",
  "comments_count",
].join(",");

async function getMediaInsights(media, accessToken) {
  if (!media.media_product_type || media.media_product_type !== "REELS") {
    return media;
  }

  try {
    const url = new URL(`https://graph.instagram.com/${media.id}/insights`);
    url.searchParams.set("metric", "views,plays,reach");
    url.searchParams.set("access_token", accessToken);
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return media;

    const insights = await response.json();
    const values = Object.fromEntries(
      (insights.data || []).map((metric) => [metric.name, metric.values?.[0]?.value || 0])
    );

    const viewCount = Number(media.views || values.views || values.plays || values.reach || 0);
    return { ...media, plays: values.plays || 0, reach: values.reach || 0, views: viewCount, viewCount };
  } catch {
    return media;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedLimit = Number(searchParams.get("limit") || "3");
    const limit = Math.min(Math.max(requestedLimit, 3), 50);
    const after = searchParams.get("after");

    const ACCESS_TOKEN = process.env.INSTAGRAM_TOKEN;

    if (!ACCESS_TOKEN) {
      return Response.json({ error: "No token configured" }, { status: 400 });
    }

    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set("fields", MEDIA_FIELDS);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", ACCESS_TOKEN);

    if (after) {
      url.searchParams.set("after", after);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      const errData = await res.json();
      return Response.json({ error: errData.error?.message || "Instagram API error" }, { status: res.status });
    }

    const rawData = await res.json();
    const normalized = normalizeInstagramData({
      ...rawData,
      data: await Promise.all((rawData.data || []).map((media) => getMediaInsights(media, ACCESS_TOKEN))),
    });

    const allReels = normalized.data.filter((media) => media.isReel);
    const recentReels = allReels
      .filter((media) => media.isReel)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 6);

    const configuredPinnedIds = (process.env.INSTAGRAM_PINNED_REEL_IDS || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const pinnedReels = configuredPinnedIds.length
      ? configuredPinnedIds.map((id) => allReels.find((media) => media.id === id)).filter(Boolean)
      : [...recentReels].sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);

    return Response.json({
      ...normalized,
      pinnedReels,
      heroReel: [...recentReels].sort((a, b) => b.viewCount - a.viewCount)[0] || null,
      selection: configuredPinnedIds.length ? "configured-pinned-reels" : "top-reels-from-latest-six",
    });

  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
