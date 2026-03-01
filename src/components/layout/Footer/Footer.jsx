import Link from 'next/link';
import styles from './style/footer.module.css';
import siteData from '../../../data/site.json';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* Decorative top soft divider */}
            <div className={styles.topDivider}></div>

            <div className={styles.footerContainer}>
                {/* Brand Section */}
                <div className={styles.brandSection}>
                    <h2 className={styles.brandLogo}>Vivah BTS</h2>
                    <p className={styles.brandTagline}>
                        Cinematic wedding stories,<br />
                        captured authentically.
                    </p>
                </div>

                {/* Links Section */}
                <div className={styles.linksSection}>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Explore</h4>
                        <Link href="/" className={styles.footerLink}>Home</Link>
                        <Link href="/about" className={styles.footerLink}>About</Link>
                        <Link href="/portfolio" className={styles.footerLink}>Portfolio</Link>
                        <Link href="/contact" className={styles.footerLink}>Contact</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Contact</h4>
                        <a href={`mailto:${siteData.email}`} className={styles.footerLink}>{siteData.email}</a>
                        <a href={`tel:${siteData.phone.replace(/\s+/g, '')}`} className={styles.footerLink}>{siteData.phone}</a>
                        <p className={styles.footerLink}>{siteData.location.city}, {siteData.location.state}, India</p>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Social</h4>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>YouTube</a>
                        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Vimeo</a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <p className={styles.copyright}>
                    &copy; {currentYear} Vivah BTS. All rights reserved.
                </p>
                <div className={styles.legalLinks}>
                    <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
                    <span className={styles.separator}>|</span>
                    <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
