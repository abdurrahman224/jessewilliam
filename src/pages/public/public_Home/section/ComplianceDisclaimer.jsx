import React from 'react';
import Container from '../../../../components/ui/Container';
import { AlertTriangle, FileText } from 'lucide-react';

const ComplianceDisclaimer = () => {
  return (
    <section className="bg-white py-16">
      {/* Subtle geometric background pattern */}

      <Container>
        <div className="relative mx-auto max-w-7xl px-4">
          {/* Decorative header element */}

          {/* Main disclaimer card with layered design */}
          <div className="group relative">
            {/* Decorative corner accents */}
            <div className="absolute -top-1 -left-1 h-4 w-4 rounded-tl-lg border-t-2 border-l-2 border-blue-400" />
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-tr-lg border-t-2 border-r-2 border-blue-400" />
            <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-blue-400" />
            <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-br-lg border-r-2 border-b-2 border-blue-400" />

            {/* Main content card */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-white shadow-sm">
              {/* Document icon header */}
              <div className="flex items-center justify-center border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 py-4">
                <div className="flex items-center space-x-2 px-4">
                  <FileText className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span className="text-sm font-medium tracking-wide text-blue-500 uppercase">
                    Legal Notice
                  </span>
                </div>
              </div>

              {/* Disclaimer content */}
              <div className="p-6 md:p-8">
                <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-700">
                  <span className="font-medium text-blue-500">Deal Hunter</span> is not an
                  investment advisor, broker, or listing service. All outputs are provided for
                  planning and comparison purposes only. Users are responsible for independent due
                  diligence and final decisions.
                </p>

                {/* Subtle divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

                {/* Verification badge */}
                <div className="flex items-center justify-center space-x-2 text-sm font-medium text-blue-600">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                  <span>Verified Compliance Statement • Updated Feb 2026</span>
                </div>
              </div>
            </div>

            {/* Floating document effect */}
            <div
              className="absolute -right-4 -bottom-4 h-16 w-16 rotate-3 transform rounded-lg border border-dashed border-blue-300/50 bg-white/80 opacity-70 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6"
              aria-hidden="true"
            >
              <div className="flex h-full w-full items-center justify-center">
                <FileText className="h-6 w-6 text-blue-300/70" />
              </div>
            </div>
          </div>

          {/* Decorative bottom element */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-300 to-blue-400" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ComplianceDisclaimer;
