"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { hslToRgbString, luxuryPalette } from "@/lib/colorUtils";

export default function InteractiveBotanicalBg() {
    const canvasRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax and scroll effects
    const opacity = useTransform(scrollY, [0, 1000], [1, 0.4]);
    const scale = useTransform(scrollY, [0, 2000], [1, 1.15]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Ultra-Luxury Configuration
        const particles = [];
        const particleCount = 60; // Increased for richer atmosphere
        const mouse = { x: -1000, y: -1000, active: false };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseSize = Math.random() * 3 + 1.5;
                this.size = this.baseSize;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;

                // Luxury Palette: Gold, Emerald, Soft Sage (RGB-based)
                const rolls = Math.random();
                if (rolls > 0.8) {
                    // Golden
                    this.color = { h: 45, s: 60, l: 80 };
                } else if (rolls > 0.4) {
                    // Emerald/Sage
                    this.color = { h: 150, s: 50, l: 70 };
                } else {
                    // Forest
                    this.color = { h: 120, s: 50, l: 70 };
                }

                this.opacity = Math.random() * 0.4 + 0.1;
                this.pulse = Math.random() * Math.PI;
                this.pulseSpeed = 0.01 + Math.random() * 0.02;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += this.pulseSpeed;

                // Smooth Fluid-like mouse interaction
                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 250) {
                        const force = (250 - distance) / 250;
                        const angle = Math.atan2(dy, dx);
                        this.x -= Math.cos(angle) * force * 1.5;
                        this.y -= Math.sin(angle) * force * 1.5;
                        this.size = this.baseSize * (1 + force * 2.5);
                    } else {
                        this.size = this.baseSize + Math.sin(this.pulse) * 1.5;
                    }
                } else {
                    this.size = this.baseSize + Math.sin(this.pulse) * 1.5;
                }

                if (this.x < -100 || this.x > canvas.width + 100 || this.y < -100 || this.y > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);

                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 4
                );

                // Use RGB color system for gradients
                const { h, s, l } = this.color;
                gradient.addColorStop(0, hslToRgbString(h, s, l, this.opacity));
                gradient.addColorStop(0.4, hslToRgbString(h, s - 10, l - 10, this.opacity * 0.5));
                gradient.addColorStop(1, hslToRgbString(h, s - 10, l - 10, 0));

                ctx.fillStyle = gradient;
                ctx.fill();

                // Bright highlight core (RGB-based)
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = hslToRgbString(h, 90, 95, this.opacity + 0.2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const handleMove = (e) => {
            mouse.active = true;
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            mouse.x = clientX;
            mouse.y = clientY;
        };

        const handleLeave = () => { mouse.active = false; };

        const handleClick = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            for (let i = 0; i < 8; i++) {
                const p = new Particle();
                p.x = clientX;
                p.y = clientY;
                const angle = Math.random() * Math.PI * 2;
                const force = Math.random() * 8 + 4;
                p.speedX = Math.cos(angle) * force;
                p.speedY = Math.sin(angle) * force;
                particles.push(p);
                if (particles.length > 150) particles.shift();
            }
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchstart", handleMove);
        window.addEventListener("mousedown", handleClick); // Use mousedown for faster response
        window.addEventListener("mouseleave", handleLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connective Luxury Threads (RGB color system)
            ctx.lineWidth = 0.6;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        const alpha = (1 - dist / 180) * 0.1;
                        ctx.strokeStyle = hslToRgbString(45, 50, 80, alpha);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchstart", handleMove);
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("mouseleave", handleLeave);
            cancelAnimationFrame(animationFrameId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="interactive-botanical-canvas"
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                opacity,
                scale,
                pointerEvents: "auto", // Ensure canvas gets events
            }}
        />
    );
}
