import React from 'react';
import Container from '../../../../components/ui/Container';
import { Building, Target, Search, Brain, UserCheck } from 'lucide-react';

const WorkflowStep = ({ step, index, isLast = false }) => {
  const icons = [Building, Target, Search, Brain, UserCheck];
  const IconComponent = icons[index] || Target;

  return (
    <div className="flex flex-col items-center text-center md:flex-1">
      {/* Step Number & Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#bad2f857] text-white shadow-md">
        <IconComponent className="h-8 w-8 text-blue-500" />
      </div>

      {/* Content */}
      <div className="max-w-xs">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">{step.title}</h3>
        <p className="text-base leading-relaxed text-gray-600">{step.description}</p>
        {step.details && <p className="mt-2 text-base text-blue-600">{step.details}</p>}
      </div>

      {/* Connector Arrow - Hidden on mobile, shown on desktop between steps */}
      {!isLast && (
        <div className="absolute top-8 -right-32 hidden h-px w-56 transform bg-gray-200 md:block">
          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gray-200" />
        </div>
      )}
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: 'Select an asset class',
      description: 'Land · Residential · Commercial',
    },
    {
      number: 2,
      title: 'Define your strategy inputs',
      description: 'Budget · Target location · Timeline · Profit goal',
    },
    {
      number: 3,
      title: 'Market search & property identification',
      description:
        'Deal Hunter analyzes public market data and surfaces relevant property references and addresses',
    },
    {
      number: 4,
      title: 'AI-generated strategy analysis',
      description:
        ' Structured strategies are generated and compared based on return potential, risk, and alignment with your goals',
    },
    {
      number: 5,
      title: 'You decide how to proceed',
      description: 'Work with your agent, pursue independently, or refine strategy further',
    },
  ];

  return (
    <section className="bg-white py-12 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="mb-4 text-3xl text-gray-900 md:text-4xl">
            How <span className="text-blue-500">Deal Hunter</span> Works
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-gray-600 md:mb-16">
            A systematic approach to real estate investment decision-making
          </p>

          {/* Workflow Steps */}
          <div className="relative">
            {/* Mobile Layout - Vertical */}
            <div className="space-y-4 md:hidden">
              {steps.map((step, index) => (
                <WorkflowStep
                  key={step.number}
                  step={step}
                  index={index}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>

            {/* Desktop Layout - Horizontal */}
            <div className="hidden md:flex md:items-start md:justify-between md:space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative flex-1">
                  <WorkflowStep step={step} index={index} isLast={index === steps.length - 1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
