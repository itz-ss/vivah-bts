import PremiumTextReveal from "@/components/motion/PremiumText/PremiumTextReveal";
import "./style/portfolio.css";
import PortfolioWrapper from "./portfolio-wrapper";
import siteData from "../../data/site.json";

export const metadata = {
  title: "Wedding Films Portfolio | Vivah BTS – Cinematic Videography Kanpur",
  description: "Explore Vivah BTS's cinematic wedding films, BTS reels & behind-the-scenes content captured across Kanpur, Uttar Pradesh, and destination weddings across India.",
  keywords: [
    "wedding films portfolio Kanpur",
    "wedding videography work Kanpur UP",
    "cinematic wedding videos Uttar Pradesh",
    "BTS wedding content examples Kanpur",
    "destination wedding films India",
    "wedding reel samples Kanpur",
    "luxury wedding cinematography portfolio",
    "best wedding films UP India",
  ],
  openGraph: {
    title: "Wedding Portfolio | Vivah BTS – Kanpur",
    description: "Watch our cinematic wedding films and BTS content from weddings across Kanpur, UP and India.",
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
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
          <PremiumTextReveal text="Selected Works" type="heading" delay={0.1} />
          <PremiumTextReveal
            text="Cinematic wedding stories from Kanpur, Uttar Pradesh & across India"
            type="subheading"
            delay={0.3}
            style={{ marginTop: '1rem' }}
          />
        </div>
        <PortfolioWrapper />
      </main>

      {/* Breadcrumb Schema */}
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

      {/* CreativeWork / VideoGallery schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Wedding Films Portfolio – Vivah BTS Kanpur",
            "description": "Cinematic wedding films and BTS content by Vivah BTS, Kanpur's premier wedding videographers.",
            "url": `${siteData.url}/portfolio`,
            "creator": {
              "@type": "Organization",
              "name": siteData.author,
              "url": siteData.url,
            },
          }),
        }}
      />
    </>
  );
}
