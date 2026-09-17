'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style/navbar.module.css';

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+918299399871';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Films & Work', href: '/portfolio' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' }
];

const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const SparkleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    return (
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                {/* Brand Logo & Tag */}
                <Link href="/" className={styles.logoWrapper}>
                    <div className={styles.logoBadge}>
                        <Image
                            src="/tradmark/android-chrome-512x512.png"
                            alt="Vivah BTS Logo"
                            width={42}
                            height={42}
                            className={styles.logoImg}
                        />
                    </div>
                    <div className={styles.brandTitleGroup}>
                        <span className={styles.brandName}>Vivah BTS</span>
                        <span className={styles.brandSub}>Wedding Films & Reels</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <nav className={styles.navLinksWrapper}>
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navActiveGlow"
                                                className={styles.activeIndicator}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Right Action CTA Button */}
                <div className={styles.navActions}>
                    <a
                        href={`tel:${PHONE_NUMBER}`}
                        className={styles.callBtn}
                        aria-label={`Call Vivah BTS`}
                    >
                        <span className={styles.callIconBubble}><PhoneIcon /></span>
                        <span className={styles.callText}>Book Your Date</span>
                    </a>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                        type="button"
                    >
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className={styles.mobileDrawer}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.mobileDrawerContent}>
                            <div className={styles.mobileBadge}>
                                <SparkleIcon />
                                <span>Vivah BTS Wedding Stories</span>
                            </div>

                            <ul className={styles.mobileNavList}>
                                {navLinks.map((link, idx) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * idx }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`${styles.mobileNavLink} ${pathname === link.href ? styles.activeMobileLink : ''}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <a
                                href={`tel:${PHONE_NUMBER}`}
                                className={styles.mobileCallCta}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <PhoneIcon />
                                <span>Call +91 82993 99871</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
