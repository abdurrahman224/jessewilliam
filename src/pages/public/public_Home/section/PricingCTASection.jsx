import React from 'react';
import Container from '../../../../components/ui/Container';
import { Check, Sparkles, Zap, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingCard = ({ plan, isPopular = false }) => {
  const getIcon = () => {
    switch (plan.tier) {
      case 'free':
        return <Star className="h-6 w-6 text-blue-500" />;
      case 'core':
        return <Zap className="h-6 w-6 text-blue-500" />;
      case 'pro':
        return <TrendingUp className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  const cardStyles = {
    free: {
      border: 'border-blue-200',
      bgHover: 'hover:border-blue-300',
      buttonBg:
        'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200',
      popularBadge: 'bg-blue-500',
    },
    core: {
      border: 'border-blue-100',
      bgHover: 'hover:border-blue-600',
      buttonBg:
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
      popularBadge: 'bg-blue-600',
    },
    pro: {
      border: 'border-blue-200',
      bgHover: 'hover:border-blue-500',
      buttonBg:
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
      popularBadge: 'bg-blue-600',
    },
  };

  const style = cardStyles[plan.tier];

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 ${style.border} ${style.bgHover} bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${isPopular ? 'scale-105 shadow-xl ring-2 ring-blue-500 ring-offset-2' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-1.5 text-xs font-semibold text-white shadow-md md:text-sm">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </span>
        </div>
      )}

      <div className="flex h-full flex-col p-6 md:p-8">
        {/* Icon and Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-lg bg-blue-50 p-2">{getIcon()}</div>
          {plan.tier !== 'free' && (
            <div className="text-right">
              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                Best Value
              </span>
            </div>
          )}
        </div>

        <div className="text-left">
          <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>

          <div className="mt-3 flex items-baseline">
            {plan.price === 'Free' ? (
              <span className="text-4xl font-bold text-gray-900">Free</span>
            ) : (
              <>
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="ml-1.5 text-base font-medium text-gray-500">/month</span>
              </>
            )}
          </div>

          {plan.tier === 'free' && (
            <p className="mt-2 text-xs text-gray-500">No credit card required</p>
          )}
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="group flex items-start">
              <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-0.5 transition-colors group-hover:bg-blue-200">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <span className="ml-3 text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="mt-auto pt-8">
          <Link to={'/auth/register'}>
            <button
              className={`w-full rounded-xl px-6 py-3 text-center font-semibold transition-all duration-300 ${style.buttonBg} transform shadow-md hover:scale-[1.02] hover:shadow-lg active:scale-100`}
            >
              Get Started
            </button>
          </Link>

          {/* Additional info */}
          {plan.tier !== 'free' && (
            <p className="mt-3 text-center text-xs text-gray-500">
              Cancel anytime • No long-term contracts
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const PricingCTASection = () => {
  const plans = [
    {
      tier: 'free',
      name: 'Start Free',
      price: 'Free',
      features: ['Basic strategy generation', 'Introductory property searches'],
    },
    {
      tier: 'core',
      name: 'Core',
      price: '29',
      features: ['Strategy comparison', 'Deeper analysis', 'Expanded property searches'],
    },
    {
      tier: 'pro',
      name: 'Pro',
      price: '59',
      features: [
        'Addvanced insights',
        'Land & portfolio analysis',
        'Access to specific property addresses',
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 via-gray-50 to-blue-50 px-2 py-12 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="mb-4 text-xl text-gray-800 capitalize md:text-2xl lg:text-4xl">
            Start planning <span className="text-blue-500"> in minutes</span>.<br />
            {/* Upgrade only if you need deeper insight. */}
            Upgrade to receive expanded insights.
          </h2>
          {/* Trust Disclaimer */}

          <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">
            Deal Hunter is a decision support and property search platform
          </p>

          {/* Pricing Cards */}
          <div className="mt-4 grid items-stretch gap-8 p-4 md:pt-8 lg:mt-20 lg:grid-cols-3 lg:gap-12">
            {plans.map((plan, index) => (
              <PricingCard key={plan.tier} plan={plan} isPopular={index === 1} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PricingCTASection;
