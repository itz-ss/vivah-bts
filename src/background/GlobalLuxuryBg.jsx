"use client";

import styles from "./style/globalBg.module.css";

export default function GlobalLuxuryBg() {
    return (
        <div className={styles.globalBgContainer}>
            {/* Base Background Color (from theme) */}
            <div className={styles.baseColor} />
            
            {/* SVG Noise / Rough Paper Texture */}
            <svg
                className={styles.paperTextureSvg}
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="roughpaper">
                    {/* Generates fractal noise for a rough, grainy feel */}
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.04"
                        numOctaves="5"
                        result="noise"
                    />
                    {/* Desaturates the noise to make it greyscale */}
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0
                                1 0 0 0 0
                                1 0 0 0 0
                                0 0 0 0.15 0"
                        in="noise"
                        result="coloredNoise"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#roughpaper)" />
            </svg>
            
            {/* Vignette Overlay for cinematic depth */}
            <div className={styles.vignetteOverlay} />
        </div>
    );
}
