'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GlassCard from '../../ui/GlassCard/GlassCard';
import VideoModal from '../../ui/VideoModal/VideoModal';
import styles from './style/featuredPortfolio.module.css';

const PlayIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
);

export default function FeaturedPortfolio({ data }) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [instagramReels, setInstagramReels] = useState(null);

    useEffect(() => {
        let isActive = true;

        fetch('/api/instagram?limit=10')
            .then((response) => response.ok ? response.json() : null)
            .then((result) => {
                if (!isActive || !result?.pinnedReels?.length) return;

                setInstagramReels(result.pinnedReels.slice(0, 3).map((reel) => ({
                    id: reel.id,
                    title: reel.caption?.split('\n')[0]?.trim() || 'Instagram Wedding Reel',
                    category: 'Instagram Reel',
                    image: reel.thumbnail_url || reel.media_url,
                    video: reel.media_url,
                    permalink: reel.permalink,
                })));
            })
            .catch(() => undefined);

        return () => {
            isActive = false;
        };
    }, []);

    if (!data) return null;

    const items = instagramReels || (data.items || []).slice(0, 3);

    return (
        <section className={styles.portfolioSection}>
            <div className={styles.container}>
                <SectionHeader
                    badge="Wedding Cinema Highlights"
                    title="Timeless Love"
                    highlight="Stories Captured"
                    titleEnd="Live"
                    description={data.subtitle || "A glimpse into raw human emotions, royal celebrations, and cinematic moments."}
                />

                <div className={styles.grid}>
                    {items.map((item, idx) => (
                        <GlassCard
                            key={item.id || idx}
                            className={styles.portfolioCard}
                            onClick={() => setSelectedVideo(item)}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={item.image || '/images/portfolio/portfolio1.jpg'}
                                    alt={item.title}
                                    className={styles.portfolioImg}
                                    onError={(event) => {
                                        event.currentTarget.src = '/images/portfolio/portfolio1.jpg';
                                    }}
                                />
                                <div className={styles.cardOverlay} />

                                <div className={styles.playButtonWrapper}>
                                    <div className={styles.playBubble}>
                                        <PlayIcon />
                                    </div>
                                </div>

                                <span className={styles.categoryBadge}>{item.category}</span>
                            </div>

                            <div className={styles.cardBody}>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                                <span className={styles.watchTrigger}>Watch Film Teaser →</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Reusable Video Modal */}
            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoSrc={selectedVideo?.video || '/videos/herovideo.mp4'}
                posterSrc={selectedVideo?.image}
                instagramUrl={selectedVideo?.permalink}
            />
        </section>
    );
}