'use client';

import GlassCard from '../../ui/GlassCard/GlassCard';
import styles from './style/brochureSection.module.css';

const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

export default function BrochureSection({ data }) {
    if (!data) return null;

    return (
        <section className={styles.brochureSection}>
            <div className={styles.container}>
                <GlassCard className={styles.bannerCard} hoverEffect={false}>
                    <div className={styles.bannerGrid}>
                        {/* Text Content */}
                        <div className={styles.textContent}>
                            <div className={styles.badgePill}>
                                <SparkleIcon />
                                <span>2026-2027 Wedding Cinema Pricing & Packages</span>
                            </div>

                            <h2 className={styles.title}>
                                {data.title || "Download Our Wedding Film Brochure"}
                            </h2>

                            <p className={styles.description}>
                                {data.description || "Explore our cinematic wedding packages, storytelling approach, real-time edit options, and transparent pricing in one beautifully designed brochure."}
                            </p>

                            <div className={styles.ctaWrapper}>
                                <a
                                    href={data.btnLink || '/VivahBTSBrochure.pdf'}
                                    download
                                    className={styles.downloadBtn}
                                >
                                    <DownloadIcon />
                                    <span>{data.btnText || 'Download Film Brochure'}</span>
                                </a>
                            </div>
                        </div>

                        {/* Interactive Visual Mockup */}
                        <div className={styles.mockupWrapper}>
                            <div className={styles.mockupCard}>
                                <div className={styles.mockupHeader}>
                                    <SparkleIcon />
                                    <span>Vivah BTS Brochure</span>
                                </div>
                                <h3 className={styles.mockupTitle}>Cinematic Stories</h3>
                                <p className={styles.mockupSub}>Kanpur · Pan-India</p>
                                <div className={styles.mockupPill}>PDF • 2026 Edition</div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
