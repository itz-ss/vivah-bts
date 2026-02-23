import Link from 'next/link';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/heroCinematic.module.css';

export default function HeroCinematic({ data }) {
    if (!data) return null;

    return (
        <section className={styles.heroSection}>
            {/* Background Video Layer */}
            <div className={styles.videoWrapper}>
                <div className={styles.videoOverlay}></div>
                {/* Placeholder logic for video if url isn't perfect, using a subtle gradient placeholder if video fails */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.heroVideo}
                    aria-hidden="true"
                >
                    <source src={data.videoUrl || '/videos/herovideo.mp4'} type="video/mp4" />
                </video>
            </div>

            {/* Content Layer */}
            <div className={styles.contentContainer}>
                {/* Subtitle / Overline */}
                <PremiumTextReveal
                    text={data.subtitle || "Luxury Cinematic Wedding Stories"}
                    type="subheading"
                    delay={0.6}
                    className={styles.subtitle}
                />

                {/* Main Title */}
                <PremiumTextReveal
                    text={data.title || "Vivah BTS"}
                    type="heading"
                    delay={0.2}
                    className={styles.title}
                />

                {/* CTA Button */}
                <div className={styles.ctaWrapper}>
                    <Link href={data.ctaLink || '/portfolio'} className={styles.primaryCta}>
                        <span className={styles.ctaText}>{data.ctaText || 'Explore Films'}</span>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <span className={styles.scrollText}>Scroll</span>
                <div className={styles.scrollLine}>
                    <div className={styles.scrollDot}></div>
                </div>
            </div>
        </section>
    );
}
