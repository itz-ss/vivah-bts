"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroller({ children }) {
    useEffect(() => {
        // Initialize Lenis for buttery smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Setup the animation loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Clean up on unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
