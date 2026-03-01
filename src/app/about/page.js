import AboutSection from '../../components/sections/about/AboutSection';
import aboutData from '../../data/about.json';
import siteData from '../../data/site.json';

export const metadata = {
    title: 'About Vivah BTS | Wedding Videographers in Kanpur, Uttar Pradesh',
    description: "Meet the team behind Vivah BTS — passionate wedding cinematographers based in Kanpur, UP. We've captured 300+ weddings with cinematic excellence across Uttar Pradesh & India.",
    keywords: [
        "about Vivah BTS",
        "wedding videography team Kanpur",
        "wedding cinematographers Kanpur UP",
        "luxury wedding filmmakers Uttar Pradesh",
        "professional wedding content creators Kanpur",
        "best wedding BTS team India",
        "cinematic storytellers Kanpur",
    ],
    openGraph: {
        title: "About Vivah BTS | Wedding Videographers in Kanpur",
        description: "Kanpur's passionate wedding cinematographers capturing love stories across Uttar Pradesh & India.",
        type: "website",
        locale: "en_IN",
        images: [
            { url: siteData.image, width: 1200, height: 630, alt: "Vivah BTS Team – Kanpur" },
        ],
    },
    alternates: {
        canonical: `${siteData.url}/about`,
    },
};

export default function AboutPage() {
    return (
        <>
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
                <AboutSection data={aboutData} />
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
                            { "@type": "ListItem", "position": 2, "name": "About", "item": `${siteData.url}/about` },
                        ],
                    }),
                }}
            />

            {/* AboutPage schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "About Vivah BTS",
                        "description": "Vivah BTS is a luxury wedding content creation studio based in Kanpur, Uttar Pradesh, India.",
                        "url": `${siteData.url}/about`,
                        "mainEntity": {
                            "@type": "Organization",
                            "name": siteData.author,
                            "url": siteData.url,
                            "foundingLocation": { "@type": "Place", "name": "Kanpur, Uttar Pradesh, India" },
                            "description": siteData.longDescription,
                            "sameAs": [siteData.social.instagram, siteData.social.youtube],
                        },
                    }),
                }}
            />
        </>
    );
}
