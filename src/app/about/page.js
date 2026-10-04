import AboutSection from '../../components/sections/about/AboutSection';
import aboutData from '../../data/about.json';
import siteData from '../../data/site.json';

export const metadata = {
    title: 'About Vivah BTS | Wedding Content Creators in Delhi & Lucknow',
    description: "Meet Vivah BTS, a wedding content creation team serving Delhi NCR, Lucknow, and destination celebrations across India with candid reels, BTS coverage, and cinematic edits.",
    keywords: [
        "about Vivah BTS",
        "wedding content creators Delhi NCR",
        "wedding content creators Lucknow",
        "wedding reel editing team Delhi",
        "wedding cinematography team Lucknow",
        "wedding BTS content creation",
        "cinematic wedding storytellers India",
    ],
    openGraph: {
        title: "About Vivah BTS | Wedding Content Creators in Delhi & Lucknow",
        description: "A wedding content creation team serving Delhi NCR, Lucknow, and celebrations across India.",
        type: "website",
        locale: "en_IN",
        images: [
            { url: siteData.image, width: 1200, height: 630, alt: "Vivah BTS Wedding Content Team" },
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
                        "description": siteData.longDescription,
                        "url": `${siteData.url}/about`,
                        "mainEntity": {
                            "@type": "Organization",
                            "name": siteData.author,
                            "url": siteData.url,
                            "areaServed": siteData.business.serviceArea,
                            "description": siteData.longDescription,
                            "sameAs": [siteData.social.instagram, siteData.social.youtube],
                        },
                    }),
                }}
            />
        </>
    );
}
