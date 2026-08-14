import React from 'react';
import HeroSection from './section/HeroSection';
import OnePlatformSection from './section/OnePlatformSection';
import OurPlatformSection from './section/OurPlatformSection';
import ReadySection from '../public_Home/section/ReadySection';
import PlatformArchitectureSection from './PlatformArchitectureSection';
import DealHunterOverviewSection from './section/DealHunterOverviewSection';
import HowItWorksSection from './HowItWorksSection';

const PlatformView = () => {
  return (
    <>
      <HeroSection />
      <PlatformArchitectureSection />
      <OnePlatformSection />
      <DealHunterOverviewSection />
      <HowItWorksSection />
      <OurPlatformSection />
      <ReadySection />
    </>
  );
};

export default PlatformView;
