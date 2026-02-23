"use client";
import dynamic from "next/dynamic";
import PremiumTextReveal from "@/components/motion/PremiumText/PremiumTextReveal";
import "./style/portfolio.css";

const PortfolioSection = dynamic(
  () => import("@/components/sections/portfolio/PortfolioSection"),
  {
    ssr: false,
    loading: () => (
      <div className="portfolio-preload" style={{ textAlign: 'center', padding: '5rem', color: 'rgba(20,20,20,0.5)' }}>
        Loading portfolio...
      </div>
    ),
  }
);

export default function Portfolio() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <PremiumTextReveal text="Selected Works" type="heading" delay={0.1} />
        <PremiumTextReveal
          text="Follow us on Instagram and stay tuned for our cinematic updates"
          type="subheading"
          delay={0.3}
          style={{ marginTop: '1rem' }}
        />
      </div>
      <PortfolioSection />
    </main>
  );
}
