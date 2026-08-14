import React from 'react';
import Container from '../../../../components/ui/Container';

const IconWrap = ({ children }) => <span className="text-[#4c6aff]">{children}</span>;

const FeatureItem = ({ icon, title, desc }) => (
  <li className="flex items-center gap-4">
    <IconWrap>{icon}</IconWrap>
    <div className="leading-7">
      <span className="font-semibold text-[#111b2b]">{title}</span>
      <span className="text-[#4c5370]">{desc ? `: ${desc}` : ''}</span>
    </div>
  </li>
);

const Card = ({ category, heading, summary, items }) => (
  <div className="rounded-2xl border border-[#CFE0FF] bg-[#f6f8fc] p-6 shadow-lg">
    <a className="mb-3 inline-block text-[13px] font-medium text-[#3b66ff] underline underline-offset-2">
      {category}
    </a>
    <h3 className="mb-2 text-[1.6rem] leading-8 font-semibold text-[#111b2b]">{heading}</h3>
    <p className="mb-5 text-[15px] leading-7 text-[#4c5370]">{summary}</p>
    <ul className="flex flex-col gap-4">
      {items.map((i, idx) => (
        <FeatureItem key={idx} {...i} />
      ))}
    </ul>
  </div>
);

const RealEstateSection = () => {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-[2.25rem] leading-tight font-semibold text-[#111b2b] md:text-[2.75rem]">
            Real Estate AI for Every Investor.
          </h2>
          <p className="mx-auto max-w-[900px] text-[17px] leading-8 text-[#4c5370]">
            From land subdivision to commercial intelligence, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            category="Deal Sourcing & ROI Analysis"
            heading={'Find the "Diamonds in the Rough.'}
            summary="We use machine learning to scan on-market and off-market deals."
            items={[
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 7h8M8 12h8M8 17h5" />
                  </svg>
                ),
                title: 'Financial Calculators',
                desc: 'Instant Cash Flow and ROI projections .',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M10.5 17.5L4 21l3.5-6.5" />
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.5 11.5L20 16" />
                  </svg>
                ),
                title: 'Foreclosure Factor',
                desc: 'Identify properties likely to sell before they hit the market.',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                ),
                title: '60-Second Underwriting',
                desc: 'Full financial modeling at lightning speed.',
              },
            ]}
          />

          <Card
            category="Land Subdivision & Feasibility"
            heading="Your Development Potential."
            summary="Don't buy land without knowing the rules. Our AI analyzes zoning laws instantly."
            items={[
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 3v18M3 8h18" />
                  </svg>
                ),
                title: 'Zoning Intelligence',
                desc: 'Visual subdivision potential and building.',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M7 9h10M7 13h6" />
                  </svg>
                ),
                title: 'Automated Site Plans',
                desc: 'Generate instant site and cash flow models.',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 17h4V7H3v10zm7 0h4V3h-4v14zm7 0h4v-8h-4v8z" />
                  </svg>
                ),
                title: 'Maximizing Density',
                desc: 'AI-driven calculations for maximum dwelling units.',
              },
            ]}
          />

          <Card
            category="Commercial Property Intelligence"
            heading="Institutional Data for All"
            summary="Access the same data as the top 1% of commercial firms."
            items={[
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="16" cy="8" r="3" />
                    <path d="M2 21a6 6 0 0 1 12 0M10 21a6 6 0 0 1 12 0" />
                  </svg>
                ),
                title: 'Ownership Insights',
                desc: 'Find true owners of any commercial asset instantly.',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                ),
                title: 'Smart Extractions',
                desc: 'Auto-build models from property brochures.',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 17l5-5 4 4 6-6 3 3" />
                    <path d="M3 3v18h18" />
                  </svg>
                ),
                title: 'Market Intelligence',
                desc: 'Track real-time trends and transaction history.',
              },
            ]}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <button className="rounded-xl bg-[#2f66ff] px-6 py-3 font-semibold text-white hover:bg-[#1f4fe0]">
            Start Analyzing Deals
          </button>
        </div>
      </Container>
    </section>
  );
};

export default RealEstateSection;
