'use client';

import { useState } from 'react';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GlassCard from '../../ui/GlassCard/GlassCard';
import BadgePill from '../../ui/BadgePill/BadgePill';
import styles from './style/contactSection.module.css';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918299399871';

const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

export default function ContactSection({ data }) {
    const [submitted, setSubmitted] = useState(false);

    if (!data) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.querySelector('#name')?.value?.trim() || '';
        const email = form.querySelector('#email')?.value?.trim() || '';
        const date = form.querySelector('#date')?.value || '';
        const location = form.querySelector('#location')?.value?.trim() || '';
        const message = form.querySelector('#message')?.value?.trim() || '';

        const formattedDate = date
            ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
            : 'Not specified';

        const text = [
            `👋 Hi Vivah BTS!`,
            ``,
            `I found your website and I'm interested in booking wedding videography services.`,
            ``,
            `📋 *My Wedding Details:*`,
            `• Name: ${name}`,
            `• Email: ${email}`,
            `• Wedding Date: ${formattedDate}`,
            `• Venue / City: ${location || 'Not specified'}`,
            ``,
            `💬 *Message:*`,
            message || 'Please share more details about your packages and availability.',
            ``,
            `Looking forward to connecting! 🎬`
        ].join('\n');

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setSubmitted(true);

        setTimeout(() => {
            form.reset();
            setSubmitted(false);
        }, 3000);
    };

    return (
        <section className={styles.contactSection}>
            <div className={styles.container}>
                <SectionHeader
                    badge="Get In Touch"
                    title={data.title || "Let's Talk About Your"}
                    highlight="Special Day"
                    titleEnd=""
                    description={data.subtitle || "We usually respond within 1 hour. Reach out directly or fill out the booking enquiry form."}
                />

                <div className={styles.grid}>
                    {/* Left Info Column */}
                    <div className={styles.infoColumn}>
                        <GlassCard className={styles.infoCard} hoverEffect={false}>
                            <BadgePill icon={<SparkleIcon />}>Kanpur Studio & Pan-India</BadgePill>
                            <h3 className={styles.infoTitle}>Direct Contact Details</h3>

                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>📞 Call / WhatsApp</span>
                                <a href={`tel:${data.contactInfo?.phone?.replace(/\s+/g, '') || '+918299399871'}`} className={styles.detailValue}>
                                    {data.contactInfo?.phone || '+91 82993 99871'}
                                </a>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>✉️ Direct Email</span>
                                <a href={`mailto:${data.contactInfo?.email || 'contact@vivahbts.com'}`} className={styles.detailValue}>
                                    {data.contactInfo?.email || 'contact@vivahbts.com'}
                                </a>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>📍 Base Location</span>
                                <span className={styles.detailValue}>{data.contactInfo?.location || 'Kanpur, Uttar Pradesh, India'}</span>
                            </div>

                            <div className={styles.trustSignals}>
                                <span>⚡ Same-Day Edit Delivery</span>
                                <span>🏆 250+ Weddings Covered</span>
                                <span>💖 100% Guaranteed Smiles</span>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Form Column */}
                    <div className={styles.formColumn}>
                        <GlassCard className={styles.formCard} hoverEffect={false}>
                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name" className={styles.label}>{data.formLabels?.name || 'Your Full Name'}</label>
                                    <input type="text" id="name" className={styles.input} required placeholder="e.g. Ananya & Rahul" />
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email" className={styles.label}>{data.formLabels?.email || 'Email Address'}</label>
                                        <input type="email" id="email" className={styles.input} required placeholder="ananya@example.com" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="date" className={styles.label}>{data.formLabels?.date || 'Wedding Date'}</label>
                                        <input type="date" id="date" className={styles.input} />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="location" className={styles.label}>{data.formLabels?.location || 'Venue / City'}</label>
                                    <input type="text" id="location" className={styles.input} placeholder="e.g. Kanpur, Lucknow, Udaipur..." />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="message" className={styles.label}>{data.formLabels?.message || 'Tell us about your wedding vision'}</label>
                                    <textarea id="message" rows="4" className={styles.textarea} required placeholder="Share your wedding events, venue details, or questions..."></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
                                    disabled={submitted}
                                >
                                    {submitted ? '✓ Opening WhatsApp...' : (data.formLabels?.submit || 'Send Instant WhatsApp Booking')}
                                </button>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
