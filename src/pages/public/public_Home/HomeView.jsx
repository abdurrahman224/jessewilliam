import GuessworkSection from './section/GuessworkSection';
import HeroSection from './section/HeroSection';
import InvestorSection from './section/InvestorSection';
import ReadySection from './section/ReadySection';
import SmartSection from './section/SmartSection';
import PricingCTASection from './section/PricingCTASection';
import HowItWorksSection from './section/HowItWorksSection';
import ComplianceDisclaimer from './section/ComplianceDisclaimer';
import AnalyzingDeals from './section/AnalyzingDeals';
import './home.css';

const HomeView = () => {
  return (
    <>
      <HeroSection />
      <PricingCTASection />
      <HowItWorksSection />
      <AnalyzingDeals />
      <SmartSection />
      <GuessworkSection />
      <InvestorSection />
      <ReadySection />
      <ComplianceDisclaimer />
    </>
  );
};

export default HomeView;
