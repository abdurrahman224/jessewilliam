import React from 'react';
import Container from '../../../../components/ui/Container';

const features = [
  {
    title: 'Smarter Investment Decisions',
    desc: 'Data-driven insights that help you invest with confidence.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-8 w-8"
      >
        <path d="M4 18V6" />
        <path d="M10 18V10" />
        <path d="M16 18V4" />
        <path d="M22 18H2" />
      </svg>
    ),
  },
  {
    title: 'End-to-End Portfolio Control',
    desc: 'Manage properties, cash flow, and performance in one system.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-8 w-8"
      >
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M7 7V5a5 5 0 0 1 10 0v2" />
      </svg>
    ),
  },
  {
    title: 'Automation at Scale',
    desc: 'AI-powered workflows that reduce manual work and increase speed.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-8 w-8"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M9 6h6M6 9v6M12 9l3 3-3 3" />
      </svg>
    ),
  },
  {
    title: 'Built for Trust',
    desc: 'Enterprise-grade security, compliance, and governance.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-8 w-8"
      >
        <path d="M12 3l8 4v6c0 5-8 8-8 8s-8-3-8-8V7l8-4z" />
        <path d="M9.5 12l2 2 3.5-3.5" />
      </svg>
    ),
  },
];

const FeatureCard = ({ title, desc, icon }) => (
  <div className="rounded-3xl border border-[#e9efff] bg-white p-6 shadow-sm">
    <div className="mb-5 inline-flex items-center justify-center rounded-full bg-[#EAF0FF] p-3 text-[#4c6aff]">
      {icon}
    </div>
    <h3 className="mb-2 text-[1.6rem] text-[#111b2b]">{title}</h3>
    <p className="text-[16px] leading-8 text-[#4c5370]">{desc}</p>
  </div>
);

const OurPlatformSection = () => {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="px-4 text-center md:px-0">
          <h2 className="mb-4 text-[2rem] leading-tight text-[#111b2b] capitalize md:text-[2.5rem]">
            Our platform is built to <span className="text-blue-500">support you</span>:
          </h2>
          <p className="mx-auto mb-12 max-w-[900px] text-[17px] leading-8 text-[#4c5370]">
            With intelligent automation and data-driven insights, Deal Hunter helps reduce risk,
            save time, and uncover deals others miss. This platform is not about overwhelming data;
            it's about clear decisions, faster execution, and smarter investments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurPlatformSection;
