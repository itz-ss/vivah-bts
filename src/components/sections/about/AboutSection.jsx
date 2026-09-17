'use client';

import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GlassCard from '../../ui/GlassCard/GlassCard';
import BadgePill from '../../ui/BadgePill/BadgePill';
import styles from './style/aboutSection.module.css';

const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
);

export default function AboutSection({ data }) {
    if (!data) return null;

    const company = data.company || {};
    const services = data.services || {};
    const members = data.members || [];

    return (
        <section className={styles.aboutPageWrapper}>
            {/* Header Hero */}
            <div className={styles.headerContainer}>
                <SectionHeader
                    badge="Behind The Scenes & Cinema"
                    title={company.title || "The Story Behind"}
                    highlight="Vivah BTS"
                    titleEnd=""
                    description={company.subtitle || "We blend cinematic storytelling with real-time digital content creation for modern Indian weddings."}
                />
            </div>

            {/* Vision & Story Grid */}
            <div className={styles.container}>
                <div className={styles.storyGrid}>
                    <div className={styles.textContent}>
                        <BadgePill icon={<SparkleIcon />}>Our Philosophy</BadgePill>
                        <h2 className={styles.storyTitle}>Capturing Moments As They Unfold Naturally</h2>
                        {Array.isArray(company.description) ? (
                            company.description.map((p, i) => (
                                <p key={i} className={styles.storyParagraph}>{p}</p>
                            ))
                        ) : (
                            <p className={styles.storyParagraph}>{company.description}</p>
                        )}
                    </div>

                    <GlassCard className={styles.teamImageCard} hoverEffect={false}>
                        <img
                            src={company.teamPhoto || '/images/portfolio/image1.png'}
                            alt="Vivah BTS Story"
                            className={styles.teamImg}
                        />
                        <div className={styles.imageBadge}>
                            <span>🎬 Based in Kanpur · Pan-India Coverage</span>
                        </div>
                    </GlassCard>
                </div>

                {/* Services Section */}
                <div className={styles.servicesSection}>
                    <SectionHeader
                        badge="What We Do Best"
                        title={services.title || "Our Wedding Film"}
                        highlight="Services"
                        titleEnd=""
                        description="From full 4K cinema films to instant sangeet reels, we cover every angle."
                    />

                    <div className={styles.servicesGrid}>
                        {services.mainServices?.map((service, idx) => (
                            <GlassCard key={idx} className={styles.serviceCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.serviceNumber}>0{idx + 1}</span>
                                    <h3 className={styles.serviceName}>{service.name}</h3>
                                </div>
                                <p className={styles.serviceDesc}>{service.description}</p>
                            </GlassCard>
                        ))}
                    </div>

                    {services.addons && (
                        <div className={styles.addonsWrapper}>
                            <h4 className={styles.addonsTitle}>{services.addonsTitle || "Special Add-ons & Coverage"}</h4>
                            <div className={styles.addonsList}>
                                {services.addons.map((addon, idx) => (
                                    <span key={idx} className={styles.addonTag}>✨ {addon}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Team Section */}
                {members.length > 0 && (
                    <div className={styles.teamSection}>
                        <SectionHeader
                            badge="Meet The Crew"
                            title={data.teamTitle || "Creators Behind The"}
                            highlight="Camera"
                            titleEnd=""
                            description="Dedicated cinematographers, editors, and BTS artists crafting your memories."
                        />

                        <div className={styles.teamGrid}>
                            {members.map((member) => (
                                <GlassCard key={member.id} className={styles.teamCard}>
                                    <div className={styles.memberImgWrapper}>
                                        <img src={member.image || '/images/portfolio/portfolio1.jpg'} alt={member.name} className={styles.memberImg} />
                                    </div>
                                    <div className={styles.memberInfo}>
                                        <h3 className={styles.memberName}>{member.name}</h3>
                                        <span className={styles.memberRole}>{member.role}</span>
                                        <p className={styles.memberBio}>{member.bio}</p>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
