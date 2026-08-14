import React from 'react';
import Container from '../../../../components/ui/Container';
import { FileText, Handshake, HouseHeart, TreePalm } from 'lucide-react';

const TargetIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 5V3M5 12H3M21 12h-2M12 21v-2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const features = [
  {
    title: 'Smart Deal Discovery',
    desc: ' Searches real markets and outputs specific property addresses',
    Icon: Handshake,
  },
  {
    title: 'Rental Analysis',
    desc: ' Analyzes strategies based on your capital, timeline, and goals',
    Icon: HouseHeart,
  },
  {
    title: 'Fix & Flip Insights',
    desc: 'Compares land, residential, and commercial opportunities',
    Icon: TargetIcon,
  },
  {
    title: 'Land Feasibility',
    desc: 'Uses structured artificial intelligence to reduce bias and improve clarity',
    Icon: TreePalm,
  },
  {
    title: 'Investment Reports',
    desc: 'Built for planning and evaluation — not sales or brokerage',
    Icon: FileText,
  },
];

const Card = ({ title, desc, Icon }) => (
  <div className="rounded-2xl bg-[#f7f9ff] p-5 shadow-sm transition hover:shadow-md md:p-8">
    <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full text-blue-500">
      {Icon && <Icon className="h-8 w-8" />}
    </div>
    <h3 className="text-center text-2xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-3 text-center text-gray-600">{desc}</p>
  </div>
);

const SmartSection = () => {
  return (
    <section className="bg-white px-4 py-14 md:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {/* CTA / Intro Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-blue-200 p-5 md:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                With Deal Hunter, You Can Make Smarter AI-Powered Decisions
              </h2>
              <p className="mt-3 text-gray-600">
                Every insight is designed to help you move faster and invest smarter.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-blue-700"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          {features.map((f) => (
            <Card key={f.title} title={f.title} desc={f.desc} Icon={f.Icon} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SmartSection;
