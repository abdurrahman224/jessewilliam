import ReadySection from '../public_Home/section/ReadySection';
import AboutAddvancedAI from './section/AboutAddvancedAI';
import DealHunterSection from './section/DealHunterSection';
import DecisionSection from './section/DecisionSection';
import HeroSection from './section/HeroSection';

const AboutView = () => {
  return (
    <>
      <HeroSection />
      <DecisionSection />
      <DealHunterSection />
      <AboutAddvancedAI />
      <ReadySection />
    </>
  );
};

export default AboutView;
