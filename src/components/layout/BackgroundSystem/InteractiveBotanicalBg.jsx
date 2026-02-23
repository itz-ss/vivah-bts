"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function InteractiveBotanicalBg() {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 1000], [1, 0.4]);
  const scale = useTransform(scrollY, [0, 2000], [1, 1.15]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const particleCount = 40;
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

        // 🌿 Earth-tone palette selection
        const roll = Math.random();
        if (roll > 0.66) this.color = "sage";
        else if (roll > 0.33) this.color = "text";
        else this.color = "matte";

        this.opacity = Math.random() * 0.25 + 0.12;
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

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
            this.size = this.baseSize + Math.sin(this.pulse) * 1.2;
          }
        } else {
          this.size = this.baseSize + Math.sin(this.pulse) * 1.2;
        }

        if (
          this.x < -100 ||
          this.x > canvas.width + 100 ||
          this.y < -100 ||
          this.y > canvas.height + 100
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 4
        );

        if (this.color === "sage") {
          gradient.addColorStop(0, `rgba(122,129,108,${this.opacity})`);
          gradient.addColorStop(0.4, `rgba(122,129,108,${this.opacity * 0.45})`);
        } else if (this.color === "text") {
          gradient.addColorStop(0, `rgba(42,38,36,${this.opacity * 0.7})`);
          gradient.addColorStop(0.4, `rgba(42,38,36,${this.opacity * 0.3})`);
        } else {
          gradient.addColorStop(0, `rgba(18,18,18,${this.opacity * 0.8})`);
          gradient.addColorStop(0.4, `rgba(18,18,18,${this.opacity * 0.25})`);
        }

        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // highlight core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);

        if (this.color === "sage") {
          ctx.fillStyle = `rgba(122,129,108,${this.opacity + 0.25})`;
        } else if (this.color === "text") {
          ctx.fillStyle = `rgba(42,38,36,${this.opacity + 0.2})`;
        } else {
          ctx.fillStyle = `rgba(30,30,30,${this.opacity + 0.2})`;
        }

        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMove = (e) => {
      mouse.active = true;
      const clientX = e.clientX || e.touches?.[0].clientX;
      const clientY = e.clientY || e.touches?.[0].clientY;
      mouse.x = clientX;
      mouse.y = clientY;
    };

    const handleLeave = () => (mouse.active = false);

    const handleClick = (e) => {
      const clientX = e.clientX || e.touches?.[0].clientX;
      const clientY = e.clientY || e.touches?.[0].clientY;

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
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🌿 sage connective threads
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.08;
            ctx.strokeStyle = `rgba(122,129,108,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
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
        pointerEvents: "auto",
      }}
    />
  );
}