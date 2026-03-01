export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /.next/
Disallow: /admin/

# Crawl delay
Crawl-delay: 1

# Sitemaps
Sitemap: https://vivadbts.com/sitemap.xml

# Google-specific
User-agent: Googlebot
Allow: /

# Bing-specific
User-agent: Bingbot
Allow: /

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: Slurp
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
