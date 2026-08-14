import React from 'react';
import Container from '../../../../components/ui/Container';
import PlanCard from '../components/PlanCard';

const PLANS = {
  FREE: {
    title: 'Free',
    price: '$0',
    period: 'month',
    subtitle: 'Perfect for new investors and small portfolios.',
    items: [
      { text: 'Credits', extra: '2.5' },
      { text: 'Core AI deal analysis' },
      { text: 'Hard allocation, no rollover.' },
      { text: 'Limited deal pulls and short summaries.' },
      { text: 'Residential property evaluation' },
      { text: 'Basic rent & return estimates' },
      { text: 'Limited AI-generated reports' },
      { text: 'Free trial included' },
    ],
    button: 'Purchase',
    highlight: true,
  },

  PRO: {
    title: 'Pro',
    price: '$29',
    period: 'month',
    subtitle: 'Built for active investors who need deeper insights.',
    items: [
      { text: 'Credits', extra: '15' },
      { text: 'Basic ROI and comps.' },
      { text: 'Single-deal analysis.' },
      { text: 'Priority AI processing' },
      { text: 'Addvanced property & land analysis' },
      { text: 'Fix & flip profitability evaluation' },
      { text: 'Long-term & short-term rental insights' },
      { text: 'Downloadable Excel & document reports' },
      { text: 'Limited CSV exports with soft throttling near allocation.' },
      { text: 'Free trial included' },
    ],
    button: 'Purchase',
  },

  PRO_PLUS: {
    title: 'Pro Plus',
    price: '$59',
    period: 'month',
    subtitle: 'Designed for serious investors and professionals.',
    items: [
      { text: 'Credits', extra: '50' },
      { text: 'Profitable tier.' },
      { text: 'Bulk deal analysis.' },
      { text: 'Land and residential logic.' },
      { text: 'Full AI investment toolkit' },
      { text: 'High-volume deal analysis' },
      { text: 'Addvanced scenario modeling' },
      { text: 'Sensitivity analysis and large CSV exports.' },
      { text: 'Land subdivision & utility planning support' },
      { text: 'Maximum report generation limits' },
      { text: 'Free trial included' },
      { text: 'Upgrade, downgrade, or cancel anytime.' },
      { text: 'Pricing visible. No commitments. No friction.' },
    ],
    button: 'Purchase',
  },
};

const PricingSection = () => {
  return (
    <section className="bg-accent py-14 md:py-20">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-[2.5rem] leading-tight font-bold text-[#111b2b]">Pricing</h2>
          <p className="text-[16px] text-[#4c5370]">You are currently on the plan</p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-8">
          <PlanCard plan={PLANS.FREE} />
          <PlanCard plan={PLANS.PRO} />
          <PlanCard plan={PLANS.PRO_PLUS} />
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;
