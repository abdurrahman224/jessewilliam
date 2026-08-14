import React from 'react';
import Container from '../../../../components/ui/Container';
import { CheckCircle } from 'lucide-react';

const StepsSection = ({ steps }) => {
  return (
    <section className="bg-accent py-14 md:py-20">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-[2.25rem] leading-tight font-semibold text-[#111b2b] md:text-[2.75rem]">
            Real Estate AI for Every Investor.
          </h2>
          <p className="mx-auto max-w-[900px] text-[17px] leading-8 text-[#4c5370] px-4">
            From land subdivision to commercial intelligence, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
          {steps.map((step) => (
            <div key={step.id} className={`group cursor-pointer rounded-2xl border border-slate-200 p-6`}>
              <div className="z-10">
                <div className="mb-4 flex items-center justify-between">
                  <div className={'rounded-xl bg-blue-400 p-3'}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h2 className={'rounded-full px-3 py-1 text-6xl font-bold opacity-5'}>
                      {step.id}
                    </h2>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-bold text-slate-500">{step.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{step.description}</p>

                <ul className="space-y-2">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-500">
                      <CheckCircle className="mr-2 h-4 w-4 shrink-0 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StepsSection;
