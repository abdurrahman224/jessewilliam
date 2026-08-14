import React from 'react';
import Container from '../../../../components/ui/Container';

const OnePlatformSection = () => {
  return (
    <section className="bg-gray-50 px-4 py-14 md:px-16 md:py-20">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-center">
          {/* Left Image */}
          <div className="">
            <img src="/img/platform/platform2.png" alt="Left Side" className="" />
          </div>

          {/* Middle Content */}
          <div className="flex w-full flex-col items-center gap-6 text-center md:w-1/4 md:items-center md:text-center">
            <h2 className="text-3xl md:text-4xl">
              {' '}
              <span className="text-blue-500">One Platform.</span> Total Property Clarity.
            </h2>
            <p className="text-gray-600">
              Deal Hunter brings everything into one unified AI-powered platform. Whether you're
              evaluating residential properties, commercial assets, or raw land, Deal Hunter gives
              you clarity at every step of the decision-making process.
            </p>

            {/* Bottom Full-Width Image */}
            <img src="/img/platform/platform1.png" alt="Bottom Full Width" className="mt-4" />
          </div>

          {/* Right Image */}
          <div className="">
            <img src="/img/platform/platform3.png" alt="Right Side" className="w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OnePlatformSection;
