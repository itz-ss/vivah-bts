'use client';

import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GlassCard from '../../ui/GlassCard/GlassCard';
import styles from './style/gearSection.module.css';

const CameraIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
    </svg>
);

export default function GearSection({ data }) {
    if (!data) return null;

    const items = data.items || [];

    return (
        <section className={styles.gearSection}>
            <div className={styles.container}>
                <SectionHeader
                    badge="Cinema Technology"
                    title="Precision Gear &"
                    highlight="4K Technology"
                    titleEnd=""
                    description={data.subtitle || "We use industry-leading equipment to capture your wedding with cinematic brilliance."}
                />

                <div className={styles.grid}>
                    {items.map((item, idx) => (
                        <GlassCard key={idx} className={styles.gearCard}>
                            <div className={styles.gearIconBubble}>
                                <CameraIcon />
                            </div>
                            <h3 className={styles.gearName}>{item.name}</h3>
                            <span className={styles.gearTag}>4K Cinema Standard</span>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}