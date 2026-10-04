import PortfolioWrapper from "./portfolio-wrapper";
import siteData from "../../data/site.json";

export const metadata = {
  title: "Wedding Reels & Films Portfolio | Vivah BTS Delhi & Lucknow",
  description: "Watch wedding reels, candid BTS clips, and cinematic films by Vivah BTS, creating wedding content in Delhi NCR, Lucknow, and destination celebrations across India.",
  keywords: [
    "wedding reels portfolio Delhi NCR",
    "wedding content creator work Lucknow",
    "cinematic wedding videos Delhi",
    "wedding BTS content examples",
    "destination wedding films India",
    "wedding reel editor samples Lucknow",
    "wedding content creation portfolio",
    "cinematic wedding films India",
  ],
  openGraph: {
    title: "Wedding Portfolio | Vivah BTS – Delhi & Lucknow",
    description: "Watch wedding reels, cinematic films, and BTS content created in Delhi NCR, Lucknow, and across India.",
    type: "website",
    locale: "en_IN",
    images: [{ url: siteData.image, width: 1200, height: 630, alt: "Vivah BTS Wedding Portfolio" }],
  },
  alternates: {
    canonical: `${siteData.url}/portfolio`,
  },
};

export default function Portfolio() {
  return (
    <>
      <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '5rem' }}>
        <PortfolioWrapper />
      </main>

      {/* Schema metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": siteData.url },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${siteData.url}/portfolio` },
            ],
          }),
        }}
      />
    </>
  );
}
