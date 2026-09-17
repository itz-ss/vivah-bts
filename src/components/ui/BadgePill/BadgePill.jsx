'use client';

import styles from './badgePill.module.css';

export default function BadgePill({ children, icon, className = '' }) {
    return (
        <div className={`${styles.badgePill} ${className}`}>
            {icon && <span className={styles.badgeIcon}>{icon}</span>}
            <span className={styles.badgeText}>{children}</span>
        </div>
    );
}
