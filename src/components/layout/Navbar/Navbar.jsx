'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './style/navbar.module.css';
import Image from 'next/image';

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+918299399871'; // Fallback to provided number

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/portfolio' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' }
];

// Phone SVG icon inline
function PhoneIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
        </svg>
    );
}

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
        document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    {/* <span className={styles.logoText}>Vivah BTS</span> */}
                    <Image src="/tradmark/android-chrome-512x512.png" alt="Vivah BTS" width={100} height={100} />
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

                {/* Desktop Call CTA */}
                <a
                    href={`tel:${PHONE_NUMBER}`}
                    className={styles.callBtn}
                    aria-label={`Call Vivah BTS at ${PHONE_NUMBER}`}
                    title="Call Us"
                >
                    <PhoneIcon className={styles.callIcon} />
                    <span className={styles.callLabel}>Call Us</span>
                </a>

                {/* Mobile Hamburger */}
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

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    {navLinks.map((link, idx) => (
                        <li key={idx} style={{ transitionDelay: `${0.1 + idx * 0.05}s` }}>
                            <Link href={link.href} className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {/* Mobile Call CTA */}
                    <li style={{ transitionDelay: '0.4s' }}>
                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            className={styles.mobileCallBtn}
                            onClick={toggleMobileMenu}
                            aria-label="Call Vivah BTS"
                        >
                            <PhoneIcon className={styles.mobileCallIcon} />
                            <span>Call Us Now</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
