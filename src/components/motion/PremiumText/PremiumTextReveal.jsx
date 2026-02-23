'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './style/PremiumTextReveal.css';

/**
 * PremiumTextReveal
 * 
 * Provides a modular, cinematic text reveal following the AGENTS.md guidelines.
 * Features: Mask reveals, staggered character entrance, soft blur fade-ins.
 * 
 * @param {string} text - The text to animate.
 * @param {string} type - 'heading' | 'subheading' | 'body' (Determines HTML tag and default style).
 * @param {number} delay - Base delay before animation starts.
 * @param {boolean} once - Should animate only once when intersecting.
 * @param {string} className - Additional CSS classes.
 */
export default function PremiumTextReveal({
    text,
    type = 'heading',
    delay = 0,
    once = true,
    className = ''
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-10% 0px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            if (!once) {
                controls.start("hidden");
            }
        }
    }, [isInView, controls, once]);

    // Framer motion variants for cinematic, non-bouncy reveals
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: delay,
            }
        }
    };

    const childVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
            rotateX: 10 // Very soft tilt for 3D feel
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // easeOutQuint equivalent, perfectly smooth, no bounce
            }
        }
    };

    const words = text.split(" ");

    const Tag = type === 'heading' ? 'h2' : type === 'subheading' ? 'h3' : 'p';
    const baseClass = `premium-text ${type} ${className}`;

    return (
        <Tag className={baseClass} ref={ref}>
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                aria-hidden="true"
                className="text-container-mask"
            >
                {words.map((word, wordIndex) => (
                    <span className="word-wrapper" key={wordIndex}>
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                variants={childVariants}
                                className="char-element"
                                key={`${wordIndex}-${charIndex}`}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <span className="whitespace">&nbsp;</span>
                    </span>
                ))}
            </motion.span>
            {/* Screen reader only text */}
            <span className="sr-only">{text}</span>
        </Tag>
    );
}
