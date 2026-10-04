'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import InstagramCTA from '../../ui/InstagramCTA/InstagramCTA';
import styles from './style/heroCinematic.module.css';

// SVG Micro Icons for rich visual polish
const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
);

const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const CheckBadgeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

// Floating Particles generator for celebratory festival vibe
const FloatingParticles = () => {
    const particles = [
        { id: 1, top: '15%', left: '8%', size: '12px', delay: 0 },
        { id: 2, top: '25%', left: '48%', size: '16px', delay: 1.2 },
        { id: 3, top: '70%', left: '12%', size: '10px', delay: 2.1 },
        { id: 4, top: '80%', left: '85%', size: '18px', delay: 0.7 },
        { id: 5, top: '35%', left: '92%', size: '14px', delay: 1.8 },
        { id: 6, top: '60%', left: '52%', size: '8px', delay: 2.5 }
    ];

    return (
        <div className={styles.particlesContainer} aria-hidden="true">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={styles.particle}
                    style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
                    animate={{
                        y: [0, -25, 0],
                        opacity: [0.3, 0.9, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 4 + p.id,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay
                    }}
                >
                    <SparkleIcon />
                </motion.div>
            ))}
        </div>
    );
};

export default function HeroCinematic({ data }) {
    const containerRef = useRef(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [heroReel, setHeroReel] = useState(null);

    useEffect(() => {
        let active = true;
        fetch('/api/instagram?limit=3')
            .then((response) => response.ok ? response.json() : null)
            .then((result) => {
                if (active && result?.heroReel) setHeroReel(result.heroReel);
            })
            .catch(() => undefined);
        return () => { active = false; };
    }, []);

    // Parallax scrolling
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const mediaY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

    if (!data) return null;

    const subtitleText = data.subtitle || "India's Premier Wedding BTS & Cinematic Films";
    const videoSource = heroReel?.media_url || data.videoUrl;
    const heroPoster = heroReel?.thumbnail_url || heroReel?.media_url ;
    const ctaLinkTarget = data.ctaLink || "/portfolio";
    const ctaButtonText = data.ctaText || "Explore Wedding Films";

    return (
        <>
            <section className={styles.heroSection} ref={containerRef}>
                {/* Ambient Glowing Joyful Background Highlights */}
                <div className={styles.glowOrbTopLeft} />
                <div className={styles.glowOrbBottomRight} />
                <FloatingParticles />

                <div className={styles.container}>
                    {/* Left Column: Joyful Editorial Typography & Actions */}
                    <motion.div
                        className={styles.textColumn}
                        style={{ y: textY, opacity: opacityFade }}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Joyful Tag Pill */}
                        <div className={styles.badgePill}>
                            <span className={styles.badgeIcon}><SparkleIcon /></span>
                            <span className={styles.badgeText}>{subtitleText}</span>
                        </div>

                        {/* Main Joyful Headline */}
                        <h1 className={styles.editorialTitle}>
                            <span className={styles.titleLine}>Capturing Pure</span>
                            <span className={styles.highlightLine}>
                                <em>Joy & Laughter</em>
                            </span>
                            <span className={styles.titleLine}>In Timeless Reels.</span>
                        </h1>

                        {/* Engaging Subtitle Description */}
                        <p className={styles.description}>
                            We capture the real heartbeat of your wedding — candid laughs, tears of happiness, royal rituals, and high-energy BTS moments. Delivered with real-time edits for your special day.
                        </p>

                        {/* Dual Action Buttons */}
                        <div className={styles.ctaGroup}>
                            <Link href={ctaLinkTarget} className={styles.primaryCta}>
                                <span>{ctaButtonText}</span>
                                <span className={styles.ctaArrow}><ArrowRightIcon /></span>
                            </Link>

                            <button
                                className={styles.secondaryCta}
                                onClick={() => setIsVideoOpen(true)}
                                type="button"
                                aria-label="Watch Teaser Reel"
                            >
                                <span className={styles.playBubble}>
                                    <PlayIcon />
                                </span>
                                <span>Watch Teaser</span>
                            </button>
                        </div>

                        {/* Quick Trust & Highlight Strip */}
                        <div className={styles.trustHighlights}>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}><CheckBadgeIcon /></span>
                                <div className={styles.trustText}>
                                    <strong>100+</strong>
                                    <span>Grand Weddings</span>
                                </div>
                            </div>
                            <div className={styles.trustDivider} />
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}><SparkleIcon /></span>
                                <div className={styles.trustText}>
                                    <strong>Same-Day</strong>
                                    <span>Real-Time Edits</span>
                                </div>
                            </div>
                            <div className={styles.trustDivider} />
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}><CheckBadgeIcon /></span>
                                <div className={styles.trustText}>
                                    <strong>100%</strong>
                                    <span>Candid Emotions</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Multi-Layered Interactive Wedding Media Deck */}
                    <motion.div
                        className={styles.mediaColumn}
                        style={{ y: mediaY }}
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.mediaCardWrapper}>
                            {/* Decorative Outer Frame Glow */}
                            <div className={styles.frameBorderGlow} />

                            {/* Main Media Visual Container */}
                            <div
                                className={styles.mediaFrame}
                                onClick={() => setIsVideoOpen(true)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setIsVideoOpen(true)}
                                aria-label="Open wedding highlight video"
                            >
                                <img
                                    src={heroPoster}
                                    alt="Joyful Wedding Celebration"
                                    className={styles.heroMediaImage}
                                />
                                <div className={styles.mediaOverlayGradient} />

                                {/* Central Glowing Play Button Overlay */}
                                <div className={styles.centerPlayWrapper}>
                                    <motion.div
                                        className={styles.centerPlayButton}
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <PlayIcon />
                                    </motion.div>
                                    <span className={styles.playHintText}>Click to Play Teaser</span>
                                </div>
                            </div>

                            {/* Floating Badge 1: Top Right Reel Popularity Badge */}
                            <motion.div
                                className={`${styles.floatingCard} ${styles.topRightCard}`}
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className={styles.equalizerBars}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div className={styles.floatingCardContent}>
                                    <span className={styles.floatingTitle}>Sangeet Night Reel</span>
                                    <span className={styles.floatingSub}>🔥 1.2M+ Views on Instagram</span>
                                </div>
                            </motion.div>

                            {/* Floating Badge 2: Bottom Left Real-Time Delivery Badge */}
                            <motion.div
                                className={`${styles.floatingCard} ${styles.bottomLeftCard}`}
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className={styles.instantBadgeIcon}>
                                    <SparkleIcon />
                                </div>
                                <div className={styles.floatingCardContent}>
                                    <span className={styles.floatingTitle}>Real-Time BTS Edits</span>
                                    <span className={styles.floatingSub}>Ready during your event ⚡</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Scroll Indicator */}
                <div className={styles.scrollIndicator}>
                    <span className={styles.scrollText}>Discover The Magic</span>
                    <div className={styles.scrollLine}>
                        <div className={styles.scrollDot} />
                    </div>
                </div>
            </section>

            {/* Interactive Fullscreen Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            className={styles.modalContainer}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeModalBtn}
                                onClick={() => setIsVideoOpen(false)}
                                aria-label="Close Video"
                                type="button"
                            >
                                <CloseIcon />
                            </button>

                            <div className={styles.videoPlayerContainer}>
                                <video
                                    src={videoSource}
                                    controls
                                    autoPlay
                                    playsInline
                                    poster={heroPoster}
                                    className={styles.modalVideo}
                                >
                                    Your browser does not support video play.
                                </video>
                            </div>
                            <div className={styles.modalActions}>
                                <InstagramCTA />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
