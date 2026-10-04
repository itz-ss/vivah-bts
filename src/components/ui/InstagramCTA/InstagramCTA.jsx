'use client';

import siteData from '../../../data/site.json';
import styles from './instagramCTA.module.css';

export default function InstagramCTA({ href = siteData.social.instagram }) {
    return (
        <a
            className={styles.instagramCta}
            href={href || siteData.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Instagram"
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle className={styles.iconDot} cx="17.5" cy="6.5" r="1" />
            </svg>
            <span>View on Instagram</span>
        </a>
    );
}