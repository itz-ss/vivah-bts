import LandingPage from '../components/sections/home/landingPage';
import homeData from '../data/home.json';

export const metadata = {
  title: 'Vivah BTS | Luxury Cinematic Wedding Stories',
  description: 'India’s Premium Wedding Content Creator. We capture your wedding as it happens with cinematic reels, aesthetic stories, and real-time edits.',
};

export default function Home() {
  return (
    <LandingPage data={homeData} />
  );
}
