'use client';

import { motion } from 'framer-motion';
import styles from './glassCard.module.css';

export default function GlassCard({ children, className = '', hoverEffect = true, onClick }) {
    return (
        <motion.div
            className={`${styles.glassCard} ${hoverEffect ? styles.hoverable : ''} ${className}`}
            whileHover={hoverEffect ? { y: -6, transition: { duration: 0.3 } } : {}}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
