"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import styles from "../../styles/luxury-garden.module.css";
import styles from "./styles/luxury-garden.module.css";

const PARTICLE_COUNT = 15;

export default function FloatingAtmosphere() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={styles.atmosphereContainer}>
            {[...Array(PARTICLE_COUNT)].map((_, i) => (
                <Particle key={i} index={i} />
            ))}
        </div>
    );
}

function Particle({ index }) {
    const [config] = useState(() => ({
        size: Math.random() * 4 + 2,
        depthSpeed: 15 + Math.random() * 20,
        initialX: Math.random() * 100,
        lateralSway: 20 + Math.random() * 40,
        delay: Math.random() * 20
    }));

    return (
        <motion.div
            className={styles.particle}
            style={{
                width: config.size,
                height: config.size,
                left: `${config.initialX}%`,
                bottom: "-10%",
                opacity: 0.1 + (config.size / 10),
            }}
            animate={{
                y: ["0vh", "-120vh"],
                x: [`${config.initialX}%`, `${config.initialX + (index % 2 === 0 ? config.lateralSway : -config.lateralSway)}px`],
                opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
                duration: config.depthSpeed,
                repeat: Infinity,
                ease: "linear",
                delay: config.delay,
            }}
        />
    );
}
