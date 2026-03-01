'use client';

import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/contactSection.module.css';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91XXXXXXXXXX';

export default function ContactSection({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
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
      ? new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      : 'Not specified';

    const text = [
      `👋 Hi Vivah BTS!`,
      ``,
      `I found your website and I'm interested in your wedding videography services.`,
      ``,
      `📋 *My Details:*`,
      `• Name: ${name}`,
      `• Email: ${email}`,
      `• Wedding Date: ${formattedDate}`,
      `• Venue / City: ${location || 'Not specified'}`,
      ``,
      `💬 *Message:*`,
      message || 'Please share more details about your packages.',
      ``,
      `Looking forward to hearing from you! 🎬`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);

    // Reset form after 3s
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 3000);
  };

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
              <a href={`mailto:${data.contactInfo.email}`} className={styles.detailValue}>
                {data.contactInfo.email}
              </a>
            </div>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Phone</span>
              <a
                href={`tel:${data.contactInfo.phone.replace(/\s+/g, '')}`}
                className={styles.detailValue}
              >
                {data.contactInfo.phone}
              </a>
            </div>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{data.contactInfo.location}</span>
            </div>
          </div>

          {/* Trust Signals */}
          {data.trustSignals && (
            <div className={`${styles.trustSignals} ${isInView ? styles.visible : ''}`}>
              {data.trustSignals.map((signal, i) => (
                <div key={i} className={styles.trustSignal}>
                  <span className={styles.trustDot} aria-hidden="true">✦</span>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Glass Form */}
        <div className={`${styles.formColumn} ${isInView ? styles.visible : ''}`}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className={`${styles.submitBtn} ${submitted ? styles.submitBtnSuccess : ''}`}
              disabled={submitted}
            >
              {submitted ? (
                '✓ Opening WhatsApp...'
              ) : (
                <>
                  {/* WhatsApp icon inside button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className={styles.submitIcon}
                    aria-hidden="true"
                  >
                    <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
                  </svg>
                  {data.formLabels.submit}
                </>
              )}
            </button>

            <p className={styles.formNote}>We usually reply within 1 hour ·<span> No spam, ever.</span></p>
          </form>
        </div>

      </div>
    </section>
  );
}
