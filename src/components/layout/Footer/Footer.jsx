'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './style/footer.module.css';
import siteData from '../../../data/site.json';

const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

const LocationPinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* Top Soft Romantic Divider Glow */}
            <div className={styles.topDividerGlow} />

            <div className={styles.footerContainer}>
                {/* Brand & Mission Column */}
                <div className={styles.brandColumn}>
                    <Link href="/" className={styles.logoGroup}>
                        <div className={styles.logoBadge}>
                            <Image
                                src="/tradmark/android-chrome-512x512.png"
                                alt="Vivah BTS Logo"
                                width={44}
                                height={44}
                            />
                        </div>
                        <span className={styles.brandTitle}>Vivah BTS</span>
                    </Link>

                    <p className={styles.brandDescription}>
                        Crafting timeless cinematic wedding films, aesthetic reels, and real-time edits that capture authentic laughter, tears, and eternal love stories across Pan-India.
                    </p>

                    <div className={styles.coverageBadge}>
                        <span className={styles.locationIcon}><LocationPinIcon /></span>
                        <span>Based in Delhi/Lucknow · Serving pan-India</span>
                    </div>
                </div>

                {/* Navigation Links Columns */}
                <div className={styles.linksGrid}>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Explore</h4>
                        <Link href="/" className={styles.footerLink}>Home</Link>
                        <Link href="/about" className={styles.footerLink}>About Us</Link>
                        <Link href="/portfolio" className={styles.footerLink}>Films & Portfolio</Link>
                        <Link href="/faq" className={styles.footerLink}>FAQ & Pricing</Link>
                        <Link href="/contact" className={styles.footerLink}>Book Enquiry</Link>
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Services</h4>
                        <span className={styles.serviceTag}>Cinematic Feature Films</span>
                        <span className={styles.serviceTag}>Real-Time Event Reels</span>
                        <span className={styles.serviceTag}>Pre-Wedding Aesthetics</span>
                        <span className={styles.serviceTag}>Behind-The-Scenes BTS</span>
                        <span className={styles.serviceTag}>Drone & 4K Master Shots</span>
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Get In Touch</h4>
                        <a href={`tel:${siteData.phone?.replace(/\s+/g, '') || '+918299399871'}`} className={styles.contactItem}>
                            📞 {siteData.phone || '+91 82993 99871'}
                        </a>
                        <a href={`mailto:${siteData.email || 'vivahbts.co@gmail.com'}`} className={styles.contactItem}>
                            ✉️ {siteData.email || 'vivahbts.co@gmail.com'}
                        </a>
                        <p className={styles.addressText}>
                            📍 Delhi/Lucknow, India
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.bottomContainer}>
                    <p className={styles.copyright}>
                        &copy; {currentYear} <strong>Vivah BTS</strong>. Crafted with <SparkleIcon /> for Indian Love Stories.
                    </p>
                    <div className={styles.socialPills}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialPill}>
                            Instagram
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialPill}>
                            YouTube
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialPill}>
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
