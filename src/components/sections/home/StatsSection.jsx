'use client';

import { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import styles from './style/statsSection.module.css';

// Animated Counter Sub-Component
function AnimatedCounter({ value, isInView }) {
    // Parse the number and the suffix (e.g. "150" and "+")
    const numericValue = parseInt(value, 10);
    const suffix = value.toString().replace(numericValue.toString(), '');

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 20,
        duration: 2
    });

    const nodeRef = useRef(null);

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue);
        }
    }, [isInView, numericValue, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (nodeRef.current) {
                nodeRef.current.textContent = Math.floor(latest) + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={nodeRef}>0{suffix}</span>;
}

export default function StatsSection({ data }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    if (!data || data.length === 0) return null;

    return (
        <section className={styles.statsSection} ref={ref}>
            <div className={styles.grid}>
                {data.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`${styles.statCard} ${isInView ? styles.visible : ''}`}
                        style={{ transitionDelay: `${idx * 0.15}s` }}
                    >
                        <div className={styles.number}>
                            <AnimatedCounter value={stat.value} isInView={isInView} />
                        </div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
