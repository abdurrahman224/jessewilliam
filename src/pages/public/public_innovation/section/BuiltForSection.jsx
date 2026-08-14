import React from 'react';
import Container from '../../../../components/ui/Container';

const IconCircle = ({ children }) => (
  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#4c6aff] text-[#4c6aff]">
    {children}
  </div>
);

const FeatureCard = ({ icon, title, desc, cta }) => (
  <div className="rounded-3xl border border-[#CFE0FF] bg-white p-8 shadow-md">
    <IconCircle>{icon}</IconCircle>
    <h3 className="mb-3 text-center text-[1.6rem] font-semibold text-[#111b2b]">{title}</h3>
    <p className="mx-auto mb-6 max-w-[520px] text-center text-[15px] leading-7 text-[#4c5370]">
      {desc}
    </p>
    <div className="mt-6 flex justify-center">
      <button className="w-full max-w-[280px] rounded-xl bg-[#2f66ff] px-6 py-3 font-semibold text-white hover:bg-[#1f4fe0]">
        {cta}
      </button>
    </div>
  </div>
);

const BuiltForSection = () => {
  return (
    <section className="bg-[#eff2fc] py-24">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-[2.5rem] leading-tight font-bold text-[#111b2b] md:text-[3rem]">
            Built for Winners. Powered by
            <br />
            Innovation.
          </h2>
          <p className="mx-auto max-w-[900px] text-[17px] leading-8 text-[#4c5370]">
            Experience the exclusive tools that turn complex data into simple, high-profit
            decisions. You don't need to be an expert; you just need our AI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 20h18" />
                <path d="M6 16l3-4 4 3 5-7" />
                <circle cx="6" cy="16" r="0.5" />
                <circle cx="9" cy="12" r="0.5" />
                <circle cx="13" cy="15" r="0.5" />
                <circle cx="18" cy="8" r="0.5" />
              </svg>
            }
            title="Property Scoring System"
            desc="Our AI evaluates over 1,000+ data points—including demographic shifts, crime rates, and infrastructure projects—to give every deal a score out of 100."
            cta="Analyze a Deal"
          />

          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 20a8 8 0 1 0-8-8" />
                <path d="M12 12l4-1" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            }
            title="Foreclosure Factor"
            desc="Using machine learning, we identify 'distressed' signals in off-market data, finding opportunities before they ever hit the public market."
            cta="Explore Off-Market"
          />

          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M9 8h6M8 12h8M7 16h10" />
                <path d="M8 4h8l-1 3H9z" />
                <path d="M12 20l6-2 3-4" />
              </svg>
            }
            title="Instant Feasibility"
            desc="Leveraging drone imagery and satellite telemetry to expedite automated site plans and meticulous subdivision layouts in seconds, not weeks."
            cta="Explore Off-Market"
          />
        </div>
      </Container>
    </section>
  );
};

export default BuiltForSection;
