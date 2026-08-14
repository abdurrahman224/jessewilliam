import React from 'react';
import Container from '../../../components/ui/Container';

const PlatformArchitectureSection = () => {
  return (
    <section className="bg-white px-4 py-14 md:py-20">
      <Container>
        <div className="text-center">
          <h2 className="mb-4 text-3xl text-[#111b2b] md:text-4xl">
            <span className="text-blue-500"> Addvanced AI</span> Platform
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-[#4c5370]">
            Addvanced AI is an artificial intelligence platform built for structured decision-making
            in complex, high-stakes environments. Deal Hunter is a real estate strategy and analysis
            product built on the Addvanced AI platform.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-3 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 p-4">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#111b2b]">
              Structured Logic Over Speculation
            </h3>
            <p className="text-[#4c5370]">
              Every recommendation is backed by clear, logical reasoning rather than speculative
              predictions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 p-4">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#111b2b]">Explainable Outputs</h3>
            <p className="text-[#4c5370]">
              Transparent analysis over black-box predictions. Understand exactly why strategies are
              recommended.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 p-4">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#111b2b]">Decision Support Focus</h3>
            <p className="text-[#4c5370]">
              Empowering your decisions with intelligent insights, not replacing human judgment with
              automation.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PlatformArchitectureSection;
