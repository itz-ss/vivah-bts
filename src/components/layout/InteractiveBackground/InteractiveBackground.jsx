"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import styles from "./interactiveBackground.module.css";

const backgrounds = {
    "/": "/backgrounds/landscape8.jpg",          // Home
    "/portfolio": "/backgrounds/landscape2.jpg",   // Portfolio
    "/about": "/backgrounds/landscape3.jpg",       // About
    "/faq": "/backgrounds/landscape4.jpg",         // FAQ
    "/contact": "/backgrounds/landscape9.jpg",     // Contact
};

export default function InteractiveBackground() {
    const pathname = usePathname();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const currentBg = backgrounds[pathname] || backgrounds["/"];

    // Spring configuration for liquid-smooth motion
    const springConfig = { damping: 40, stiffness: 200, mass: 1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 40; // Reduced intensity for subtleness
            const y = (clientY / window.innerHeight - 0.5) * 40;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className={styles.container}>
            {/* 1. Dynamic Atmosphere Layer (Lucid Dream Atmosphere) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentBg}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.35, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className={styles.atmosphere}
                    style={{
                        backgroundImage: `url(${currentBg})`,
                        x: springX,
                        y: springY,
                    }}
                />
            </AnimatePresence>

            {/* 2. Cinematic Light Leaks (Floating Romance) */}
            <motion.div
                className={`${styles.lightLeak} ${styles.leak1}`}
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -40, 60, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            <motion.div
                className={`${styles.lightLeak} ${styles.leak2}`}
                animate={{
                    x: [0, -60, 40, 0],
                    y: [0, 50, -40, 0],
                    opacity: [0.08, 0.15, 0.08],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            {/* 3. Film Grain / Noise Overlay */}
            <div className={styles.grain} />

            {/* 4. Vignette / Haze for focused lucid feel */}
            <div className={styles.haze} />
            <div className={styles.vignette} />
        </div>
    );
}
