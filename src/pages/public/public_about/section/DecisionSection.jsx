import React from 'react';
import Container from '../../../../components/ui/Container';
import { Link } from 'react-router-dom';

const DecisionSection = () => {
  return (
  <div className="bg-white px-4 py-14 md:py-20">
      <Container>
        <div className="flex flex-col items-start gap-20 lg:flex-row lg:gap-16 ">
          {/* Left Column - Headline & Description */}
          <div className="space-y-6 lg:w-1/2">
            <h2 className="l text-3xl font-light tracking-tight md:text-4xl">
              Better decisions come from better tools.
            </h2>
            <p className="leading-relaxed text-gray-600">
              Real estate investing is full of complexity—data overload, uncertain assumptions, and
              time-consuming analysis. We created Deal Hunter to remove these barriers using
              intelligent automation and AI-driven insights.
            </p>


 <Link
  to="/pricing"
  className="mt-4 inline-flex items-center justify-center rounded-lg 
             bg-blue-500 px-5 py-3 text-sm font-medium text-white 
             transition-all duration-200 
             hover:bg-blue-700 hover:shadow-md active:scale-95
             sm:px-6 sm:py-3 sm:text-base
             w-full sm:w-auto"
>
  Get Started
</Link> 


          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:w-1/2">
            {/* Stat 1 */}
            <div className="space-y-3">
              <div className="text-4xl font-light tracking-tight text-gray-900 md:text-4xl">5k</div>
              <div className="text-sm tracking-wide text-gray-600 uppercase">
                Real estate listings processed
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-3">
              <div className="text-4xl font-light tracking-tight text-gray-900 md:text-4xl">
                AI-Powered
              </div>
              <div className="text-sm tracking-wide text-gray-600 uppercase">
                Smart price & market prediction
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-3">
              <div className="text-4xl font-light tracking-tight text-gray-900 md:text-4xl">1k</div>
              <div className="text-sm tracking-wide text-gray-600 uppercase">
                Qualified leads generated
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-3">
              <div className="text-4xl font-light tracking-tight text-gray-900 md:text-4xl">
                Real-Time
              </div>
              <div className="text-sm tracking-wide text-gray-600 uppercase">
                Buyer & seller matching
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DecisionSection;
