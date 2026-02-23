"use client";

import React, { createContext, useContext } from "react";
import FloatingAtmosphere from "./FloatingAtmosphere";
import GardenLightBloom from "./GardenLightBloom";
import DepthHaze from "./DepthHaze";

const AtmosphereContext = createContext(null);

export function AtmosphereProvider({
    children,
    showAtmosphere = true,
    showBloom = true,
    showHaze = true
}) {
    return (
        <AtmosphereContext.Provider value={{}}>
            {/* Environmental Layers */}
            {showAtmosphere && <FloatingAtmosphere />}
            {showBloom && <GardenLightBloom />}
            {showHaze && <DepthHaze />}

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {children}
            </div>
        </AtmosphereContext.Provider>
    );
}

export const useAtmosphere = () => useContext(AtmosphereContext);
