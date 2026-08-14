import React from 'react';
import Container from '../../../../components/ui/Container';

const AnalyzingDeals = () => {
  return (
    <section className="bg-white">
      <Container>
        <div className="flex flex-col items-center rounded-2xl bg-gradient-to-r from-[#f5fafd] to-blue-100 p-8 md:p-12">
          <h3 className="mb-4 text-xl capitalize md:text-4xl">Ready to start analyzing deals?</h3>
          <p className="mb-6 text-gray-600">
            Get intelligent insights for your next real estate investment
          </p>
          <button className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            Try Deal Hunter Free
          </button>
        </div>
      </Container>
    </section>
  );
};

export default AnalyzingDeals;
