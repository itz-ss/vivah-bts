'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/contactSection.module.css';

export default function ContactSection({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (!data) return null;

  return (
    <section className={styles.contactSection} ref={ref}>
      <div className={styles.container}>

        {/* Left Column: Copy & Info */}
        <div className={styles.infoColumn}>
          <PremiumTextReveal text={data.title} type="heading" delay={0.1} className={styles.title} />
          <PremiumTextReveal text={data.subtitle} type="subheading" delay={0.3} className={styles.subtitle} />

          <div className={`${styles.contactDetails} ${isInView ? styles.visible : ''}`}>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Email</span>
              <a href={`mailto:${data.contactInfo.email}`} className={styles.detailValue}>{data.contactInfo.email}</a>
            </div>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Phone</span>
              <a href={`tel:${data.contactInfo.phone.replace(/\s+/g, '')}`} className={styles.detailValue}>{data.contactInfo.phone}</a>
            </div>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{data.contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Glass Form */}
        <div className={`${styles.formColumn} ${isInView ? styles.visible : ''}`}>
          <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>{data.formLabels.name}</label>
              <input type="text" id="name" className={styles.input} required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>{data.formLabels.email}</label>
                <input type="email" id="email" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="date" className={styles.label}>{data.formLabels.date}</label>
                <input type="date" id="date" className={styles.input} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="location" className={styles.label}>{data.formLabels.location}</label>
              <input type="text" id="location" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>{data.formLabels.message}</label>
              <textarea id="message" rows="4" className={styles.textarea} required></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {data.formLabels.submit}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
