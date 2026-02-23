"use client";

import InteractiveBotanicalBg from "./InteractiveBotanicalBg";
import FloatingAtmosphere from "./FloatingAtmosphere";
import GardenLightBloom from "./GardenLightBloom";
import DepthHaze from "./DepthHaze";

export default function GlobalLuxuryBg() {
  return (
    <div
      className="global-luxury-bg-system"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Base romantic gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, var(--color-faded-rust) 0%, var(--color-dusty-rose) 100%)",
        }}
      />

      {/* Layer 1 — deep atmospheric particles */}
      <InteractiveBotanicalBg />

      {/* Layer 2 — drifting highlights */}
      <FloatingAtmosphere />

      {/* Layer 3 — cinematic bloom */}
      <GardenLightBloom />

      {/* Layer 4 — depth haze */}
      <DepthHaze />

      {/* Film grain */}
      <div className="luxury-grain" />
    </div>
  );
}