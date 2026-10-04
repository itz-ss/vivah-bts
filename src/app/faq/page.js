import FAQPreview from "@/components/sections/FAQ/FAQPreview";
import siteData from "../../data/site.json";

export const metadata = {
  title: "Wedding Content Creation FAQ | Delhi & Lucknow – Vivah BTS",
  description: "Answers about wedding content creation in Delhi NCR and Lucknow, including reels, BTS coverage, editing, packages, booking, and same-day delivery.",
  keywords: [
    "wedding content creation FAQ Delhi",
    "wedding content creator questions Lucknow",
    "wedding reel editor FAQ",
    "wedding content creator packages India",
    "same day wedding reel editing questions",
    "wedding film booking FAQ Delhi NCR",
    "wedding reel package pricing Lucknow",
  ],
  openGraph: {
    title: "FAQ | Vivah BTS – Wedding Content Creation in Delhi & Lucknow",
    description: "Learn about wedding reels, content packages, booking, and same-day edits in Delhi NCR and Lucknow.",
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
      question: "Do you create wedding content in Delhi NCR and Lucknow?",
      answer: "Yes. Vivah BTS provides wedding content creation in Delhi NCR and Lucknow, and travels across India for destination weddings. Our coverage includes candid moments, behind-the-scenes clips, Instagram reels, and cinematic edits."
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