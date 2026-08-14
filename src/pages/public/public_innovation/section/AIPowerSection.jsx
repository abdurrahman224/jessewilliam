import React from 'react';
import Container from '../../../../components/ui/Container';
import { Brain } from 'lucide-react';

const AIPowerSection = ({ aiFeatures }) => {
  return (
    <section className="bg-slate-50 px-4 py-14 md:py-20">
      <Container>
        <div className="mb-14 flex flex-col items-center text-center">
          <h2 className="max-w-4xl text-4xl md:text-5xl">
            <span className="bg-blue-500 bg-clip-text text-transparent">AI-Powered </span>
            <span className="">Decision Making</span>
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-slate-400">
            Addvanced artificial intelligence provides consistent, data-driven advantages for
            smarter real estate investment decisions.
          </p>
        </div>

        <div className="grid gap-12 px-4 lg:grid-cols-3 lg:items-center">
          <div className="col-span-2 space-y-4 lg:space-y-6">
            {aiFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-400"
              >
                <div className="shrink-0 rounded-lg bg-blue-500/10 p-3">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>

                <div>
                  <h4 className="mb-1 font-bold">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-2 lg:col-span-1">
            <div className="h-[450px] w-full rounded-3xl border border-slate-100 bg-white p-8 shadow">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex rounded-2xl bg-blue-400 p-4">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">AI Analysis Engine</h3>
                <p className="text-slate-400">Real-time intelligence processing</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Market Data Processing', value: 95 },
                  { label: 'Strategy Accuracy', value: 92 },
                  { label: 'Risk Assessment', value: 88 },
                ].map((metric, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{metric.label}</span>
                      <span className="font-bold text-blue-500">{metric.value}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AIPowerSection;
