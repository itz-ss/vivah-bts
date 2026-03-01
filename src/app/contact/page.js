import ContactSection from '../../components/sections/contact/ContactSection';
import contactData from '../../data/contact.json';
import siteData from '../../data/site.json';

export const metadata = {
    title: 'Book Wedding Videographer in Kanpur | Vivah BTS',
    description: "Book Vivah BTS — Kanpur's top wedding videographers. Cinematic films, BTS reels & real-time edits for weddings across Kanpur, Lucknow, UP & India. WhatsApp us today.",
    keywords: [
        "book wedding videographer Kanpur",
        "wedding videography booking Kanpur UP",
        "contact wedding cinematographer Kanpur",
        "hire wedding BTS videographer Kanpur",
        "wedding content creator contact Kanpur",
        "wedding reel booking Uttar Pradesh",
        "wedding film inquiry Kanpur",
        "same day edit wedding Kanpur inquiry",
    ],
    openGraph: {
        title: "Book Your Wedding Film | Vivah BTS – Kanpur",
        description: "Kanpur's leading wedding videographers. WhatsApp us or fill the form to check availability.",
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
                        "name": "Contact Vivah BTS – Wedding Videographer Kanpur",
                        "description": "Book Vivah BTS for cinematic wedding films in Kanpur, UP and across India.",
                        "url": `${siteData.url}/contact`,
                        "mainEntity": {
                            "@type": "LocalBusiness",
                            "name": siteData.author,
                            "telephone": siteData.phone,
                            "email": siteData.email,
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Kanpur",
                                "addressRegion": "Uttar Pradesh",
                                "addressCountry": "IN",
                            },
                        },
                    }),
                }}
            />
        </>
    );
}
