"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./style/luxury-garden.module.css";

const COUNT = 15;

export default function FloatingAtmosphere() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={styles.atmosphere}>
      {[...Array(COUNT)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </div>
  );
}

function Particle({ index }) {
  const [cfg] = useState(() => {
    const r = Math.random();
    const tone = r > 0.66 ? "sage" : r > 0.33 ? "text" : "matte";

    return {
      tone,
      size: Math.random() * 4 + 2,
      speed: 18 + Math.random() * 20,
      x: Math.random() * 100,
      sway: 20 + Math.random() * 40,
      delay: Math.random() * 20,
    };
  });

 const colors = {
  sage: "rgba(122,129,108,0.42)",
  text: "rgba(42,38,36,0.38)",
  matte: "rgba(18,18,18,0.35)"
};

  const glow = {
  sage: "0 0 6px rgba(122,129,108,0.35)",
  text: "0 0 5px rgba(42,38,36,0.25)",
  matte: "0 0 4px rgba(0,0,0,0.35)"
};

  return (
    <motion.div
      className={styles.particle}
      style={{
        width: cfg.size,
        height: cfg.size,
        left: `${cfg.x}%`,
        bottom: "-10%",
        backgroundColor: colors[cfg.tone],
        boxShadow: glow[cfg.tone],
        opacity: cfg.size > 4 ? 0.55 : 0.35,
      }}
      animate={{
        y: ["0vh", "-120vh"],
        x: [
          `${cfg.x}%`,
          `${cfg.x + (index % 2 === 0 ? cfg.sway : -cfg.sway)}px`,
        ],
        opacity: [0, 0.45, 0.45, 0],
      }}
      transition={{
        duration: cfg.speed,
        repeat: Infinity,
        ease: "linear",
        delay: cfg.delay,
      }}
    />
  );
}