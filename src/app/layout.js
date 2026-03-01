import "../styles/globals.css";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import sitedata from "../data/site.json";
import WhatsAppFloatingButton from "../components/ui/WhatsAppFloatingButton/WhatsAppFloatingButton";
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import InteractiveBackground from "../components/layout/InteractiveBackground/InteractiveBackground";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-heading',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(sitedata.url),
  title: {
    default: sitedata.title,
    template: "%s | Vivah BTS – Wedding Videographer Kanpur",
  },
  description: sitedata.description,
  keywords: sitedata.keywords,
  authors: [{ name: sitedata.author, url: sitedata.url }],
  creator: sitedata.author,
  publisher: sitedata.author,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": "-1",
    "max-video-preview": "-1",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: sitedata.url,
    site_name: sitedata.author,
    title: sitedata.title,
    description: sitedata.description,
    images: [
      {
        url: sitedata.image,
        width: 1200,
        height: 630,
        alt: sitedata.title,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: sitedata.title,
    description: sitedata.description,
    images: [sitedata.image],
    creator: "@vivahbts",
    site: "@vivahbts",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: sitedata.url,
    languages: {
      "en-IN": sitedata.url,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${manrope.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FCF9F2" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Kanpur" />
        <meta name="geo.position" content="26.4499;80.3319" />
        <meta name="ICBM" content="26.4499, 80.3319" />
        <link rel="canonical" href={sitedata.url} />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="alternate" hrefLang="en-IN" href={sitedata.url} />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Schema: LocalBusiness (Kanpur-dominant) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "VideoProductionService"],
              "@id": sitedata.url,
              "name": sitedata.author,
              "url": sitedata.url,
              "telephone": sitedata.phone,
              "email": sitedata.email,
              "description": sitedata.longDescription,
              "image": sitedata.image,
              "logo": sitedata.logo,
              "priceRange": "₹₹₹",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kanpur",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "208001",
                "addressCountry": "IN",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": sitedata.location.geo.latitude,
                "longitude": sitedata.location.geo.longitude,
              },
              "areaServed": [
                { "@type": "City", "name": "Kanpur" },
                { "@type": "City", "name": "Lucknow" },
                { "@type": "City", "name": "Prayagraj" },
                { "@type": "City", "name": "Agra" },
                { "@type": "City", "name": "Delhi" },
                { "@type": "State", "name": "Uttar Pradesh" },
                { "@type": "Country", "name": "India" },
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "20:00",
                },
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": sitedata.business.rating,
                "ratingCount": sitedata.business.ratingCount,
                "bestRating": "5",
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Wedding Videography Services",
                "itemListElement": sitedata.business.services.map((s, i) => ({
                  "@type": "Offer",
                  "position": i + 1,
                  "itemOffered": {
                    "@type": "Service",
                    "name": s,
                  },
                })),
              },
              "sameAs": [
                sitedata.social.instagram,
                sitedata.social.facebook,
                sitedata.social.youtube,
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": sitedata.phone,
                  "contactType": "Customer Service",
                  "email": sitedata.email,
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"],
                },
              ],
            }),
          }}
        />

        {/* ── Schema: Organization ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": sitedata.author,
              "url": sitedata.url,
              "logo": sitedata.logo,
              "description": sitedata.description,
              "foundingLocation": {
                "@type": "Place",
                "name": "Kanpur, Uttar Pradesh, India",
              },
              "sameAs": [
                sitedata.social.instagram,
                sitedata.social.facebook,
                sitedata.social.youtube,
                sitedata.social.linkedIn,
              ],
            }),
          }}
        />
      </head>
      <body>
        <InteractiveBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
