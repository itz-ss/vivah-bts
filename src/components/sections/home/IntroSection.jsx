'use client';

import { motion } from 'framer-motion';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GlassCard from '../../ui/GlassCard/GlassCard';
import styles from './style/introSection.module.css';

const FilmIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
        <line x1="7" y1="2" x2="7" y2="22"></line>
        <line x1="17" y1="2" x2="17" y2="22"></line>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <line x1="2" y1="7" x2="7" y2="7"></line>
        <line x1="2" y1="17" x2="7" y2="17"></line>
        <line x1="17" y1="17" x2="22" y2="17"></line>
        <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
);

const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

export default function IntroSection({ data }) {
    if (!data) return null;

    return (
        <section className={styles.introSection}>
            <div className={styles.container}>
                <SectionHeader
                    badge={data.overline || "India's Premier Wedding Creator"}
                    title="Crafting Romantic"
                    highlight="Behind-The-Scenes"
                    titleEnd="Stories"
                    description={data.description}
                />

                <div className={styles.grid}>
                    {/* Story Feature 1 */}
                    <GlassCard className={styles.featureCard}>
                        <div className={styles.cardIconBubble}>
                            <FilmIcon />
                        </div>
                        <h3 className={styles.cardTitle}>Cinematic Wedding Reels</h3>
                        <p className={styles.cardDesc}>
                            Short-form vertical video stories designed for Instagram & modern screens, capturing high-energy sangeet performances, royal entries, and joyful wedding vows.
                        </p>
                    </GlassCard>

                    {/* Story Feature 2 */}
                    <GlassCard className={styles.featureCard}>
                        <div className={`${styles.cardIconBubble} ${styles.goldBubble}`}>
                            <HeartIcon />
                        </div>
                        <h3 className={styles.cardTitle}>Same-Day Real-Time Edits</h3>
                        <p className={styles.cardDesc}>
                            While your guests celebrate, our team edits and renders trending BTS clips ready to share live on your social feeds on your actual wedding night.
                        </p>
                    </GlassCard>

                    {/* Story Feature 3 */}
                    <GlassCard className={styles.featureCard}>
                        <div className={styles.cardIconBubble}>
                            <FilmIcon />
                        </div>
                        <h3 className={styles.cardTitle}>Authentic Candid Emotions</h3>
                        <p className={styles.cardDesc}>
                            No awkward poses — just pure candid laughter, tears of joy, family blessings, and the unscripted magic that makes your love story truly timeless.
                        </p>
                    </GlassCard>
                </div>

                <div className={styles.footerQuote}>
                    <p className={styles.quoteText}>
                        "{data.footerText || 'Let your love story trend forever.'}"
                    </p>
                </div>
            </div>
        </section>
    );
}
