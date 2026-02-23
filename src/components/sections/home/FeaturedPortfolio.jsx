'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/featuredPortfolio.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedPortfolio({ data }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    if (!data) return null;

    return (
        <section className={styles.portfolioSection} ref={ref}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <PremiumTextReveal text={data.title} type="heading" delay={0.1} />
                    <PremiumTextReveal text={data.subtitle} type="subheading" delay={0.3} className={styles.subtitle} />
                </div>

                <div className={styles.grid}>
                    {data.items.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`${styles.card} ${isInView ? styles.visible : ''}`}
                            style={{ transitionDelay: `${0.2 + idx * 0.15}s` }}
                        >
                            <div className={styles.imageWrapper}>
                                {/* Fallback to simple img if next/image is tricky without domain config, using simple img for safety */}
                                <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
                                <div className={styles.overlay}>
                                    <span className={styles.viewText}>Play Highlight</span>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>{item.category}</span>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <Link href="/portfolio" className={styles.viewAllBtn}>
                        View Full Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
}
