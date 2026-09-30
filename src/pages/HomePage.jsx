import { useEffect } from 'react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { HeroSection } from '../components/home/HeroSection';
import { TeamSection } from '../components/home/TeamSection';
import { OfferSection } from '../components/home/OfferSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { WorkSection } from '../components/home/WorkSection';
import { FaqSection } from '../components/home/FaqSection';
import { VisitSection } from '../components/home/VisitSection';
import { HomeFooter } from '../components/home/HomeFooter';
import { useRouter } from '../hooks/useRouter';

export function HomePage() {
  const { search } = useRouter();

  useEffect(() => {
    const section = new URLSearchParams(search).get('section');
    if (!section) return;
    const timer = window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [search]);

  return (
    <div className="overflow-x-clip">
      <GlobalHeader />
      <main id="top">
        <HeroSection />
        <TeamSection />
        <OfferSection />
        <ServicesSection />
        <WorkSection />
        <FaqSection />
        <VisitSection />
      </main>
      <HomeFooter />
    </div>
  );
}
