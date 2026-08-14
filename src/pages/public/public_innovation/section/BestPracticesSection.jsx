import React from 'react';
import Container from '../../../../components/ui/Container';
import { ChevronRight } from 'lucide-react';

const BestPracticesSection = ({ bestPractices }) => {
  return (
    <section className="bg-white px-4 py-14 md:py-20">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">
            <span className="">Best Practices</span>
          </h2>
          <p className="text-xl">Maximize your success with these proven strategies</p>
        </div>

        <div className="grid gap-8 px-4 md:grid-cols-3">
          {bestPractices.map((practice, index) => (
            <div key={index} className="group rounded-2xl border border-slate-200 p-8">
              <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-4">
                <practice.icon className="h-8 w-8 text-blue-400" />
              </div>

              <h3 className="mb-3 text-xl">{practice.title}</h3>
              <p className="mb-4 text-slate-500">{practice.description}</p>

              <div className="space-y-2">
                {['Be specific', 'Set realistic goals', 'Review regularly'].map((tip, idx) => (
                  <div key={idx} className="flex items-center text-slate-600">
                    <ChevronRight className="mr-2 h-4 w-4 shrink-0 text-blue-400" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BestPracticesSection;
