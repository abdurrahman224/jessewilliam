import React from 'react';
import Container from '../../../../components/ui/Container';

const DealHunterOverviewSection = () => {
  return (
    <section className="bg-white px-4 py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl text-[#111b2b] md:text-4xl">
              A Real Estate Decision Platform Built on{' '}
              <span className="text-blue-500">Addvanced AI</span>
            </h2>
            <p className="mx-auto max-w-5xl text-lg leading-relaxed text-[#4c5370]">
              Deal Hunter helps investors find real properties and prioritize investment strategies
              based on their stated goals — before deploying capital.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-blue-100 bg-white p-8 text-center shadow-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold text-[#111b2b]">Searches Real Markets</h3>
                <p className="text-[#4c5370]">
                  Comprehensive market scanning to identify opportunities across your target areas.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-8 text-center shadow-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold text-[#111b2b]">
                  Identifies Relevant Properties
                </h3>
                <p className="text-[#4c5370]">
                  Pinpoints properties that match your investment criteria and strategic objectives.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-8 text-center shadow-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold text-[#111b2b]">
                  Analyzes & Prioritizes Strategies
                </h3>
                <p className="text-[#4c5370]">
                  Evaluates multiple approaches aligned to your goals, presenting the most promising
                  strategies first.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-green-50 p-8 text-center">
            <p className="text-lg text-[#0b2b5f]">
              Unlike listing services or brokerage tools, Deal Hunter focuses on{' '}
              <span className="text-blue-500">strategy clarity and decision intelligence</span>, not
              transactions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DealHunterOverviewSection;
