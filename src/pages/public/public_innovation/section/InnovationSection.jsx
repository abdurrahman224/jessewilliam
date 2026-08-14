import React from 'react';
import Container from '../../../../components/ui/Container';

const strategyGroups = [
  {
    title: 'Low-Capital Strategies',
    items: [
      'Wholesaling scenarios',
      'Seller financing structures',
      'Micro-lot and entry-level land opportunities',
    ],
  },
  {
    title: 'Growth Strategies',
    items: [
      'Multi-property planning',
      'Capital deployment sequencing',
      'Portfolio balance considerations',
    ],
  },
  {
    title: 'Addvanced Strategies',
    items: [
      'Tax-aware planning frameworks',
      'Land-focused market insights',
      'Portfolio refinement and optimization',
    ],
  },
];

const FeatureCard = ({ title, desc, items }) => (
  <div className="rounded-3xl border border-[#e4ebff] bg-white p-6 shadow-sm">
    <h3 className="mb-2 text-[1.6rem] text-[#111b2b]">{title}</h3>
    {desc && <p className="text-[16px] leading-8 text-[#4c5370]">{desc}</p>}
    {items && (
      <ul className="mt-4 space-y-3 text-[#4c5370]">
        {items.map((it, i) => (
          <li key={i} className="text-[15px]">
            ● {it}
          </li>
        ))}
      </ul>
    )}
    <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-transparent via-[#e4ebff] to-transparent opacity-70" />
  </div>
);

const InnovationSection = () => {
  return (
    <section className="bg-gray-50 pt-14 md:py-20">
      <Container>
        <div className="px-4 text-center md:px-0">
          <h2 className="mb-4 text-[2rem] leading-tight text-[#111b2b] md:text-[2.5rem]">
            Goal-Aligned Real Estate Strategy{' '}
          </h2>
          <p className="mx-auto max-w-[900px] text-[17px] leading-8 text-[#4c5370]">
            Deal Hunter adapts its analysis based on capital level, asset class, and investor
            objectives, helping investors understand which strategies make the most sense-not just
            which properties exist.{' '}
          </p>
          <p className="mt-4 mb-8 text-blue-500 italic">
            All strategies are generated for planning and comparison purposes only.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {strategyGroups.map((g) => (
            <FeatureCard key={g.title} {...g} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default InnovationSection;
