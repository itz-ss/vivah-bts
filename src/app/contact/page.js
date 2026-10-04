import ContactSection from '../../components/sections/contact/ContactSection';
import contactData from '../../data/contact.json';
import siteData from '../../data/site.json';

export const metadata = {
    title: 'Book a Wedding Content Creator in Delhi or Lucknow | Vivah BTS',
    description: "Book wedding content creation in Delhi NCR or Lucknow. Get candid wedding reels, BTS coverage, cinematic films, and fast same-day edits from Vivah BTS.",
    keywords: [
        "book wedding content creator Delhi",
        "book wedding content creator Lucknow",
        "hire wedding reel editor Delhi NCR",
        "wedding content creation booking Lucknow",
        "contact wedding cinematographer Delhi",
        "wedding BTS reels booking",
        "same day wedding video editing inquiry",
        "wedding film and reel package India",
    ],
    openGraph: {
        title: "Book Wedding Content Creation | Vivah BTS Delhi & Lucknow",
        description: "Enquire about wedding reels, BTS coverage, cinematic films, and same-day edits in Delhi NCR or Lucknow.",
        type: "website",
        locale: "en_IN",
    },
    alternates: {
        canonical: `${siteData.url}/contact`,
    },
};

export default function ContactPage() {
    return (
        <>
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
                <ContactSection data={contactData} />
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
                            { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${siteData.url}/contact` },
                        ],
                    }),
                }}
            />

            {/* ContactPage schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "name": "Contact Vivah BTS – Wedding Content Creator Delhi and Lucknow",
                        "description": "Book Vivah BTS for wedding content creation, reels, and cinematic films in Delhi NCR, Lucknow, and across India.",
                        "url": `${siteData.url}/contact`,
                        "mainEntity": {
                            "@type": "LocalBusiness",
                            "name": siteData.author,
                            "telephone": siteData.phone,
                            "email": siteData.email,
                            "areaServed": ["Delhi NCR", "Lucknow", "India"],
                        },
                    }),
                }}
            />
        </>
    );
}
