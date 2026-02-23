'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './style/portfolioModal.module.css';

export default function PortfolioModal({ item, cleanCaption, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <span className={styles.closeLine}></span>
              <span className={styles.closeLine}></span>
            </button>

            <div className={styles.mediaContainer}>
              {item.media_type === "VIDEO" ? (
                <video
                  src={item.media_url}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.videoPlayer}
                />
              ) : (
                <div className={styles.imgWrapper}>
                  <Image
                    src={item.media_url}
                    alt="Portfolio Detail"
                    width={600}
                    height={1067}
                    className={styles.imagePlayer}
                    priority
                  />
                </div>
              )}
            </div>

            <div className={styles.detailsContainer}>
              <span className={styles.category}>
                {new Date(item.timestamp).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <h2 className={styles.title}>Instagram Post</h2>
              <p className={styles.description}>{cleanCaption?.(item.caption)}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}