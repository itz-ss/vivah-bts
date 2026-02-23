'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './style/navbar.module.css';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/portfolio' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' }
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                {/* Elegant Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>Vivah BTS</span>
                </Link>

                {/* Desktop Links */}
                <ul className={styles.navLinks}>
                    {navLinks.map((link, idx) => (
                        <li key={idx}>
                            <Link href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger Icon */}
                <button
                    className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>
            </div>

            {/* Mobile Menu Reveal */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    {navLinks.map((link, idx) => (
                        <li key={idx} style={{ transitionDelay: `${0.1 + idx * 0.05}s` }}>
                            <Link href={link.href} className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
