'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './style/portfolioGrid.module.css';

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
      {/* Skeletons on first load */}
      {initialLoading &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={`skeleton-${i}`} className={styles.skeleton} />
        ))}

      {/* Real posts */}
      <AnimatePresence mode="popLayout">
        {posts.length > 0 &&
          posts.map((post, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              key={post.id || idx}
              className={styles.card}
              onClick={() => onSelect(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(post)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={
                    post.media_type === "VIDEO"
                      ? post.thumbnail_url
                      : post.media_url
                  }
                  alt={post.caption || "Portfolio item"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/image.png";
                  }}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <span className={styles.playText}>
                    {post.media_type === "VIDEO" ? "Play Reel" : "View Photo"}
                  </span>
                </div>
              </div>

              <div className={styles.info}>
                <span className={styles.category}>
                  {new Date(post.timestamp).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <p className={styles.title}>{cleanCaption?.(post.caption)}</p>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Skeletons while loading more */}
      {loading && !initialLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div key={`load-${i}`} className={styles.skeleton} />
        ))}
    </div>
  );
}