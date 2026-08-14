import Container from '../../../../components/ui/Container';
import PlanCard from '../components/PlanCard';

const PLANS = [
  {
    id: '709f651e-b0fc-41e1-a0ca-6a61cddb55e7',
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
    button: 'Free Plan',
  },
  {
    id: '0a76455b-e66e-49a6-8d08-87e17ece385d',
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
    button: 'Upgrade',
  },

  {
    id: '4eeb02ce-9a2b-4121-ab3f-befce96531e8',
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
    button: 'Upgrade',
  },
];

const SubscriptionView = () => {
  return (
    <section className="w-full max-w-none overflow-x-hidden py-4 sm:py-6 lg:py-10">
      <Container>
        <div className="mb-6 px-3 text-center sm:mb-8 sm:px-4 lg:mb-12 lg:px-0">
          <h2 className="mb-2 text-xl leading-tight font-bold text-[#111b2b] sm:text-2xl lg:text-4xl">
            Pricing
          </h2>
          <p className="text-sm text-[#4c5370] sm:text-base lg:text-lg">
            You are currently on the plan
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:px-6">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SubscriptionView;
