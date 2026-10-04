'use client';

import { motion, AnimatePresence } from 'framer-motion';
import InstagramCTA from '../InstagramCTA/InstagramCTA';
import styles from './videoModal.module.css';

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default function VideoModal({ isOpen, onClose, videoSrc, posterSrc, instagramUrl }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modalContainer}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeModalBtn}
                            onClick={onClose}
                            aria-label="Close Video"
                            type="button"
                        >
                            <CloseIcon />
                        </button>

                        <div className={styles.videoPlayerContainer}>
                            <video
                                src={videoSrc}
                                controls
                                autoPlay
                                playsInline
                                poster={posterSrc || "/images/portfolio/image1.png"}
                                className={styles.modalVideo}
                            >
                                Your browser does not support video play.
                            </video>
                        </div>
                        <div className={styles.modalActions}>
                            <InstagramCTA href={instagramUrl} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
