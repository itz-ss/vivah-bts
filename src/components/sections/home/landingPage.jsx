import HeroCinematic from './HeroCinematic';
import IntroSection from './IntroSection';
import StatsSection from './StatsSection';
import FeaturedPortfolio from './FeaturedPortfolio';
import BrochureSection from './BrochureSection';
import GearSection from './GearSection';

export default function LandingPage({ data }) {
    if (!data) return null;

    return (
        <main>
            <HeroCinematic data={data.hero} />
            <IntroSection data={data.intro} />
            <StatsSection data={data.stats} />
            <FeaturedPortfolio data={data.featuredPortfolio} />
            <BrochureSection data={data.brochure} />
            <GearSection data={data.gear} />
        </main>
    );
}
