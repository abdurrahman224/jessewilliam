import React from 'react';
import { ArrowRight, CheckCircle2, Settings, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Public_HelpSupport = () => {
  const steps = [
    {
      icon: Settings,
      title: 'Create an account and log in',
      content:
        'Visit our website and sign up with your email address. Verify your email to activate your account.',
    },
    {
      icon: Zap,
      title: 'Set your deal preferences',
      content:
        "Customize your deal preferences by selecting categories, brands, and price ranges you're interested in.",
    },
    {
      icon: CheckCircle2,
      title: 'Start Discovering',
      content:
        'Browse deals directly or enable notifications to receive alerts when offers match your interests.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
            <ArrowRight className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-4  text-4xl font-bold sm:text-5xl  text-gray-600">
            Getting Started
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Get up and running with Deal Hunter in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm "
              >
                {/* Step Number Badge */}
                <div className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {idx + 1}
                </div>

                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 transition-all group-hover:from-blue-500 group-hover:to-blue-600 group-hover:shadow-lg">
                    <Icon className="h-7 w-7 text-blue-600 transition-colors group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="mb-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                      {step.content}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-16 space-y-6 text-center">
      

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            
            
            
            <Link to="/auth/register"  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-base font-semibold text-white shadow-lg transition-all duration-300  sm:text-lg">
              <Sparkles className="h-5 w-5" />
              <span>Join Free</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link to='/pricing' className="flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-4 py-2.5 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 sm:text-lg">
              <span>View Pricing</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Public_HelpSupport;