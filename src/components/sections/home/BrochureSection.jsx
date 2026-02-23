'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/brochureSection.module.css';

export default function BrochureSection({ data }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    if (!data) return null;

    return (
        <section className={styles.brochureSection} ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.imageColumn} ${isInView ? styles.visible : ''}`}>
                    <img src={data.mockupImage || '/images/demo.jpg'} alt="Brochure Mockup" className={styles.mockupImage} loading="lazy" />
                </div>

                <div className={styles.contentColumn}>
                    <PremiumTextReveal text={data.title} type="heading" delay={0.2} className={styles.title} />
                    <p className={`${styles.description} ${isInView ? styles.fadeUp : ''}`}>
                        {data.description}
                    </p>
                    <div className={`${styles.actionWrapper} ${isInView ? styles.fadeUp : ''}`}>
                        <a href={data.btnLink} className={styles.downloadBtn} target="_blank" rel="noopener noreferrer">
                            {data.btnText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
