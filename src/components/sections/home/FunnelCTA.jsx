'use client';

import Link from 'next/link';
import GlassCard from '../../ui/GlassCard/GlassCard';
import styles from './style/funnelCta.module.css';

const WhatsAppIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.555 4.109 1.525 5.836L0 24l6.304-1.497A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.831 0-3.548-.488-5.034-1.338l-.361-.205-3.743.889.914-3.647-.236-.375C2.613 15.82 2 13.978 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
);

const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

export default function FunnelCTA({ data }) {
    if (!data) return null;

    const whatsappNumber = "918299399871";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Vivah%20BTS!%20I%20would%20like%20to%20enquire%20about%20wedding%20videography.`;

    return (
        <section className={styles.ctaSection}>
            <div className={styles.container}>
                <GlassCard className={styles.ctaCard} hoverEffect={false}>
                    <div className={styles.badgePill}>
                        <SparkleIcon />
                        <span>{data.overline || "Based in Kanpur · Serving Across India"}</span>
                    </div>

                    <h2 className={styles.title}>
                        {data.title || "Ready to Make Your Wedding Unforgettable?"}
                    </h2>

                    <p className={styles.subtitle}>
                        {data.subtitle || "Let's talk about your special day. We respond within the hour."}
                    </p>

                    <div className={styles.buttonGroup}>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappBtn}
                        >
                            <WhatsAppIcon />
                            <span>{data.primaryCta?.text || "WhatsApp Us Now"}</span>
                        </a>

                        <Link href={data.secondaryCta?.href || "/contact"} className={styles.enquiryBtn}>
                            <span>{data.secondaryCta?.text || "Send an Enquiry"}</span>
                        </Link>
                    </div>

                    <span className={styles.trustLine}>
                        💖 {data.trustLine || "300+ happy couples · Kanpur, UP & Pan-India"}
                    </span>
                </GlassCard>
            </div>
        </section>
    );
}
