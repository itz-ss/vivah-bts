'use client';

import BadgePill from '../BadgePill/BadgePill';
import styles from './sectionHeader.module.css';

const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
);

export default function SectionHeader({
    badge,
    title,
    highlight,
    titleEnd,
    description,
    centered = true,
    className = ''
}) {
    return (
        <div className={`${styles.sectionHeader} ${centered ? styles.centered : ''} ${className}`}>
            {badge && (
                <BadgePill icon={<SparkleIcon />}>{badge}</BadgePill>
            )}

            <h2 className={styles.sectionTitle}>
                {title} {highlight && <span className={styles.highlightText}><em>{highlight}</em></span>} {titleEnd}
            </h2>

            {description && (
                <p className={styles.sectionDescription}>{description}</p>
            )}
        </div>
    );
}
