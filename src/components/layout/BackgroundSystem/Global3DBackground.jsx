'use client';

import { useEffect, useRef, useState } from 'react';
import './style/Global3DBackground.css';

export default function Global3DBackground() {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device supports hover/desktop interaction
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || !window.matchMedia('(hover: hover)').matches);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e) => {
            if (isMobile) return;

            // Calculate normalized mouse coordinates (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            setMousePosition({ x, y });
        };

        const handleDeviceOrientation = (e) => {
            if (!isMobile || !e.gamma || !e.beta) return;

            // Normalize tilt values
            // gamma is the left-to-right tilt in degrees, where right is positive
            // beta is the front-to-back tilt in degrees, where front is positive
            const x = Math.max(-1, Math.min(1, e.gamma / 45));
            const y = Math.max(-1, Math.min(1, (e.beta - 45) / 45));

            setMousePosition({ x, y });
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            // Note: iOS requires explicit permission for DeviceOrientation event, 
            // which we're skipping here for simplicity, but it's good practice to ask.
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, [isMobile]);

    // Calculate parallax Aurora 3D tilt transforms based on pointer/device
    // Multipliers dictate how heavily the background swings.
    const auroraStyle = {
        transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`,
    };

    return (
        <div className="global-3d-bg" ref={containerRef}>
            {/* The 3D transformed container */}
            <div className="aurora-container" style={auroraStyle}>
                <div className="layer-base" />

                {/* Flowing animated gradient mesh mapping the Earth-Tone tokens */}
                <div className="layer-aurora">
                    <div className="aurora-gradient aurora-1" /> {/* Dusty Rose */}
                    <div className="aurora-gradient aurora-2" /> {/* Dried Sage */}
                    <div className="aurora-gradient aurora-3" /> {/* Faded Rust */}
                    <div className="aurora-gradient aurora-4" /> {/* Warm Oak */}
                </div>

                {/* Foreground glass/noise for depth tracking over the mesh */}
                <div className="layer-glass">
                    <div className="noise-texture" />
                </div>
            </div>
        </div>
    );
}
