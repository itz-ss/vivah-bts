'use client';

import dynamic from 'next/dynamic';

const PortfolioSection = dynamic(
  () => import('@/components/sections/portfolio/PortfolioSection'),
  {
    ssr: false,
    loading: () => (
      <div className="portfolio-preload" style={{ textAlign: 'center', padding: '5rem', color: 'rgba(20,20,20,0.5)' }}>
        Loading portfolio...
      </div>
    ),
  }
);

export default function PortfolioWrapper() {
  return <PortfolioSection />;
}
