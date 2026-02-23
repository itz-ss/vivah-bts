'use client';

import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import PremiumTextReveal from '../../motion/PremiumText/PremiumTextReveal';
import styles from './style/aboutSection.module.css';
import Image from 'next/image';

export default function AboutSection({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (!data) return null;

  return (
    <section className={styles.aboutPageWrapper} ref={ref}>

      {/* 1. Intro & Thesis */}
      <div className={styles.introContainer}>
        <div className={styles.introTextColumn}>
          <PremiumTextReveal text={data.company.title} type="heading" delay={0.1} className={styles.title} />
          <PremiumTextReveal text={data.company.subtitle} type="subheading" delay={0.3} className={styles.subtitle} />

          <div className={styles.descriptionBlock}>
            {data.company.description.map((paragraph, idx) => (
              <p
                key={idx}
                className={`${styles.paragraph} ${isInView ? styles.visible : ''}`}
                style={{ transitionDelay: `${0.4 + idx * 0.1}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={`${styles.introImageColumn} ${isInView ? styles.visible : ''}`}>
          <div className={styles.imageCard}>
            <img src={data.company.teamPhoto || '/images/team/team-group.jpg'} alt="Vivah BTS Team" className={styles.mainImage} loading="lazy" />
          </div>
        </div>
      </div>

      {/* 2. Services Outline */}
      <div className={styles.servicesContainer}>
        <PremiumTextReveal text={data.services.title} type="heading" delay={0.1} className={styles.sectionTitleCenter} />

        <div className={styles.servicesGrid}>
          {data.services.mainServices.map((service, idx) => (
            <div
              key={idx}
              className={`${styles.serviceCard} ${isInView ? styles.visible : ''}`}
              style={{ transitionDelay: `${0.2 + idx * 0.15}s` }}
            >
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceDesc}>{service.description}</p>
              <div className={styles.serviceLine}></div>
            </div>
          ))}
        </div>

        <div className={`${styles.addonsWrapper} ${isInView ? styles.visible : ''}`}>
          <h4 className={styles.addonsTitle}>{data.services.addonsTitle}</h4>
          <div className={styles.addonsList}>
            {data.services.addons.map((addon, idx) => (
              <span key={idx} className={styles.addonTag}>{addon}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Team Roster */}
      <div className={styles.teamContainer}>
        <PremiumTextReveal text={data.teamTitle} type="heading" delay={0.1} className={styles.sectionTitleCenter} />

        <div className={styles.teamGrid}>
          {data.members.map((member, idx) => (
            <div
              key={member.id}
              className={`${styles.teamCard} ${isInView ? styles.visible : ''}`}
              style={{ transitionDelay: `${0.3 + idx * 0.2}s` }}
            >
              <div className={styles.memberImageWrapper}>
                <img src={member.image} alt={member.name} className={styles.memberImage} loading="lazy" />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <span className={styles.memberRole}>{member.role}</span>
                <p className={styles.memberBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
