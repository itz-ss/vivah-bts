'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/gearSection.module.css';

export default function GearSection({ data }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    if (!data || !data.items) return null;

    return (
        <section className={styles.gearSection} ref={ref}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <PremiumTextReveal text={data.title} type="heading" delay={0.1} />
                    <PremiumTextReveal text={data.subtitle} type="subheading" delay={0.3} className={styles.subtitle} />
                </div>

                <div className={styles.grid}>
                    {data.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`${styles.card} ${isInView ? styles.visible : ''}`}
                            style={{ transitionDelay: `${0.2 + idx * 0.1}s` }}
                        >
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.image} loading="lazy" />
                            </div>
                            <h4 className={styles.gearName}>{item.name}</h4>
                            {/* Subtle line under text for elegance */}
                            <div className={styles.aestheticLine}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}