import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import CommunitySection from '@/components/CommunitySection';
import Benefits from '@/components/Benefits';
import Pricing from '@/components/Pricing';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black pb-32 scroll-smooth">
      <Hero />
      <Courses />
      <Benefits />
      <CommunitySection />
      <Pricing />
      <Features />
      <Footer />
    </div>
  );
}
