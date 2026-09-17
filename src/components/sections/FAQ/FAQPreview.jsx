'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GlassCard from '../../ui/GlassCard/GlassCard';
import faqs from '@/data/faqs.json';
import styles from './style/faqPreview.module.css';

export default function FAQPreview() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <SectionHeader
                    badge="Wedding Cinema FAQ"
                    title="Frequently Asked"
                    highlight="Questions"
                    titleEnd=""
                    description="Everything you need to know about our videography packages, booking process, real-time edits, and delivery."
                />

                <div className={styles.faqList}>
                    {faqs.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <GlassCard key={item.id || index} className={styles.faqCard} hoverEffect={false}>
                                <button
                                    className={styles.faqQuestionBtn}
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    type="button"
                                >
                                    <span className={styles.questionText}>{item.question}</span>
                                    <span className={`${styles.toggleIcon} ${isOpen ? styles.iconOpen : ''}`}>
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className={styles.answerWrapper}
                                        >
                                            <p className={styles.answerText}>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* Bottom Callout Banner */}
                <div className={styles.helpCallout}>
                    <p>Have more questions about your wedding dates or custom requirements?</p>
                    <a
                        href="https://wa.me/918299399871?text=Hi%20Vivah%20BTS!%20I%20have%20a%20question%20about%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappHelpBtn}
                    >
                        Chat Directly on WhatsApp →
                    </a>
                </div>
            </div>
        </section>
    );
}