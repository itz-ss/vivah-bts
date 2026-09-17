'use client';

import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../ui/GlassCard/GlassCard';
import styles from './style/portfolioGrid.module.css';

const PlayIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
);

export default function PortfolioGrid({
    posts = [],
    loading,
    initialLoading,
    skeletonCount = 6,
    cleanCaption,
    onSelect,
}) {
    return (
        <div className={styles.grid}>
            {/* Skeletons on initial load */}
            {initialLoading &&
                Array.from({ length: skeletonCount }).map((_, i) => (
                    <div key={`skeleton-${i}`} className={styles.skeleton} />
                ))}

            {/* Real portfolio items */}
            <AnimatePresence mode="popLayout">
                {posts.length > 0 &&
                    posts.map((post, idx) => (
                        <GlassCard
                            key={post.id || idx}
                            className={styles.portfolioGlassCard}
                            onClick={() => onSelect(post)}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={
                                        post.media_type === "VIDEO"
                                            ? (post.thumbnail_url || post.media_url)
                                            : post.media_url
                                    }
                                    alt={post.caption || "Vivah BTS Portfolio Work"}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/portfolio/portfolio1.jpg";
                                    }}
                                    className={styles.image}
                                />
                                <div className={styles.overlayGradient} />

                                <div className={styles.playBubbleWrapper}>
                                    <div className={styles.playBubble}>
                                        <PlayIcon />
                                    </div>
                                </div>

                                <span className={styles.mediaTag}>
                                    {post.media_type === "VIDEO" ? "🎬 Wedding Reel" : "📸 Photo Story"}
                                </span>
                            </div>

                            <div className={styles.cardInfo}>
                                <span className={styles.dateStamp}>
                                    {post.timestamp
                                        ? new Date(post.timestamp).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
                                        : "Cinematic Highlight"}
                                </span>
                                <p className={styles.captionText}>{cleanCaption?.(post.caption) || "Vivah BTS Wedding Moment"}</p>
                            </div>
                        </GlassCard>
                    ))}
            </AnimatePresence>

            {/* Loading skeletons for load more */}
            {loading && !initialLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                    <div key={`load-${i}`} className={styles.skeleton} />
                ))}
        </div>
    );
}