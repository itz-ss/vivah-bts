"use client";

import React from "react";
import InteractiveBotanicalBg from "./InteractiveBotanicalBg";
import FloatingAtmosphere from "./FloatingAtmosphere";
import GardenLightBloom from "./GardenLightBloom";
import DepthHaze from "./DepthHaze";

/**
 * GlobalLuxuryBg - The ultra-premium background system.
 * Combines generative canvas particles with multi-layered environmental effects.
 * Designed to be globally persistent in layout.js.
 */
export default function GlobalLuxuryBg() {
    return (
        <div
            className="global-luxury-bg-system"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                overflow: "hidden",
                pointerEvents: "none", // Allows clicks to pass through to content, but canvas has its own listeners
                background: "var(--color-background, #0B120E)",
            }}
        >
            {/* Layer 1: Base Dark Atmosphere */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 50% 50%, var(--color-parchment) 0%, var( --color-espresso) 100%)",
                }}
            />

            {/* Layer 2: Interactive Generative Canvas (Pollen/Petals) */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                <InteractiveBotanicalBg />
            </div>

            {/* Layer 3: Floating Botanical Particles */}
            <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                <FloatingAtmosphere />
            </div>

            {/* Layer 4: Cinematic Bloom and Haze */}
            <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
                <GardenLightBloom />
                <DepthHaze />
            </div>

            {/* Layer 5: Subtle Grain/Texture Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 4,
                    opacity: 0.03,
                    pointerEvents: "none",
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
                }}
            />
        </div>
    );
}
