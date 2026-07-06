'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './style/heroCinematic.module.css';

export default function HeroCinematic({ data }) {
    const containerRef = useRef(null);
    
    // Parallax scrolling hooks using Framer Motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    
    // Transform values for editorial parallax effect
    const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const mediaY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    if (!data) return null;

    return (
        <section className={styles.heroSection} ref={containerRef}>
            <div className={styles.container}>
                {/* Text / Typography Column */}
                <motion.div 
                    className={styles.textColumn}
                    style={{ y: textY, opacity: opacityFade }}
                >
                    <span className={styles.overline}>
                        {data.subtitle || "Cinematic Wedding Stories"}
                    </span>
                    
                    <h1 className={styles.editorialTitle}>
                        <span className={styles.titleLine}>Capturing the</span>
                        <span className={`${styles.titleLine} ${styles.italic}`}>Authentic</span>
                        <span className={styles.titleLine}>Stories of Love.</span>
                    </h1>
                    
                    <p className={styles.description}>
                        We capture real connections, candid laughter, tears, and raw human emotions in premium, cinematic detail. Styled like the stories you read, crafted for the screen.
                    </p>
                    
                    <div className={styles.ctaWrapper}>
                        <Link href={data.ctaLink || '/portfolio'} className={styles.primaryCta}>
                            <span className={styles.ctaText}>{data.ctaText || 'Explore Films'}</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Media / Video Frame Column */}
                <motion.div 
                    className={styles.mediaColumn}
                    style={{ y: mediaY, opacity: opacityFade }}
                >
                    <div className={styles.frameWrapper}>
                        {/* Inner elegant gold/accent line border */}
                        <div className={styles.innerAccentFrame} />
                        
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
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <span className={styles.scrollText}>Scroll Down</span>
                <div className={styles.scrollLine}>
                    <div className={styles.scrollDot}></div>
                </div>
            </div>
        </section>
    );
}
