import FAQPreview from "@/components/sections/FAQ/FAQPreview";
import siteData from "../../data/site.json";

export const metadata = {
  title: "FAQ | Wedding Videographer Kanpur – Vivah BTS",
  description: "Frequently asked questions about Vivah BTS — Kanpur's top wedding videographers. Learn about packages, booking, BTS reels, same-day edits & more.",
  keywords: [
    "wedding videography FAQ Kanpur",
    "wedding videographer questions Kanpur UP",
    "cinematic wedding services FAQ",
    "wedding content creator packages India",
    "BTS videography questions Kanpur",
    "wedding film booking FAQ Uttar Pradesh",
    "wedding package pricing Kanpur",
  ],
  openGraph: {
    title: "FAQ | Vivah BTS – Wedding Videographer in Kanpur",
    description: "Learn about our wedding cinematography packages, booking process, and services in Kanpur, UP.",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: `${siteData.url}/faq`,
  },
};

export default function FAQPage() {
  const faqItems = [
    {
      question: "Do you cover weddings in Kanpur, Uttar Pradesh?",
      answer: "Yes! We are based in Kanpur, UP and primarily serve weddings across Kanpur, Lucknow, Prayagraj, Agra, and across Uttar Pradesh. We also travel pan-India for destination weddings."
    },
    {
      question: "What wedding videography services do you offer?",
      answer: "We offer cinematic wedding films, behind-the-scenes (BTS) videos, real-time wedding reels, same-day edits, pre-wedding shoots, and couple aesthetic content for social media."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 3-6 months in advance, especially for peak wedding season (October-March). Contact us via WhatsApp to check your date's availability."
    },
    {
      question: "Do you offer same-day edit videos?",
      answer: "Yes, our same-day edit service delivers a cinematic highlight reel within hours of your wedding reception — perfect for sharing at the wedding itself."
    },
    {
      question: "What is the starting price for your packages?",
      answer: "Our packages are customized for each wedding. Please reach out via WhatsApp or our contact form for a personalized quote based on your event details."
    },
  ];

  return (
    <>
      <FAQPreview />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": siteData.url },
              { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${siteData.url}/faq` },
            ],
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}