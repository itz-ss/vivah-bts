'use client';

import { motion } from 'framer-motion';
import GlassCard from '../../ui/GlassCard/GlassCard';
import styles from './style/statsSection.module.css';

const SparkleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

export default function StatsSection({ data }) {
    if (!data || !Array.isArray(data)) return null;

    return (
        <section className={styles.statsSection}>
            <div className={styles.container}>
                <div className={styles.statsGrid}>
                    {data.map((stat, idx) => (
                        <GlassCard key={idx} className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statIcon}><SparkleIcon /></span>
                            </div>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
