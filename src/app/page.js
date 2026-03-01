import LandingPage from '../components/sections/home/landingPage';
import homeData from '../data/home.json';
import siteData from '../data/site.json';

export const metadata = {
  title: siteData.title,
  description: siteData.description,
  keywords: siteData.keywords,
  openGraph: {
    title: siteData.title,
    description: siteData.description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteData.image,
        width: 1200,
        height: 630,
        alt: "Vivah BTS – Wedding Videographer in Kanpur, Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.title,
    description: siteData.description,
    images: [siteData.image],
  },
  alternates: {
    canonical: siteData.url,
  },
};

export default function Home() {
  return (
    <>
      <LandingPage data={homeData} />

      {/* Schema: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": siteData.url },
            ],
          }),
        }}
      />

      {/* Schema: VideoProductionService – Kanpur */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Cinematic Wedding Videography by Vivah BTS",
            "description": siteData.longDescription,
            "serviceType": "Wedding Video Production",
            "provider": {
              "@type": "LocalBusiness",
              "name": siteData.author,
              "url": siteData.url,
              "telephone": siteData.phone,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kanpur",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "208001",
                "addressCountry": "IN",
              },
            },
            "areaServed": [
              { "@type": "City", "name": "Kanpur" },
              { "@type": "City", "name": "Lucknow" },
              { "@type": "City", "name": "Prayagraj" },
              { "@type": "State", "name": "Uttar Pradesh" },
              { "@type": "Country", "name": "India" },
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Wedding Services",
              "itemListElement": siteData.business.services.map((s, i) => ({
                "@type": "Offer",
                "position": i + 1,
                "itemOffered": { "@type": "Service", "name": s },
              })),
            },
          }),
        }}
      />
    </>
  );
}
