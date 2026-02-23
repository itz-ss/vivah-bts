import AboutSection from '../../components/sections/about/AboutSection';
import aboutData from '../../data/about.json';

export const metadata = {
    title: 'About Vivah BTS | The Team Behind the Magic',
    description: 'Discover the passionate cinematographers, storytellers, and visual artists behind Vivah BTS.',
};

export default function AboutPage() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <AboutSection data={aboutData} />
        </main>
    );
}
