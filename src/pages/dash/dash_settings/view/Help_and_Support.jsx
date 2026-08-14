import { useState } from 'react';
import {
  ChevronDown,
  Mail,
  MessageCircle,
  Book,
  CreditCard,
  FileText,
  ArrowRight,
  Menu,
  Search,
} from 'lucide-react';
import { toggleMobileMenu } from '../../../../features/common/commonSlice';
import { useDispatch } from 'react-redux';

export default function HelpSupport() {
  const [openSection, setOpenSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const sections = [
    {
      id: 'about',
      title: 'About Deal Hunter',
      icon: Book,
      content:
        'Deal Hunter helps users discover and track deals, discounts, and offers from third-party sources, helping you save time and money.',
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: ArrowRight,
      content: 'Get up and running with Deal Hunter in just a few simple steps.',
      subsections: [
        {
          title: 'Create an account and log in',
          content:
            'Visit our website and sign up with your email address. Verify your email to activate your account.',
        },
        {
          title: 'Set your deal preferences',
          content:
            "Customize your deal preferences by selecting categories, brands, and price ranges you're interested in.",
        },
        {
          title: 'Start Discovering',
          content:
            'Browse deals directly or enable notifications to receive alerts when offers match your interests.',
        },
      ],
    },
    {
      id: 'payments',
      title: 'Payments & Billing (Summary)',
      icon: CreditCard,
      content: 'Secure payment processing and flexible subscription management.',
      subsections: [
        {
          title: 'Payment Processing',
          content:
            'Payments are securely processed by Stripe. Deal Hunter does not store your payment details.',
        },
        {
          title: 'Subscriptions',
          content:
            'Subscriptions renew automatically unless canceled. Fees are generally non-refundable except where required by law. By subscribing, you authorize recurring charges for subscription fees, applicable taxes, and disclosed charges.',
        },
        {
          title: 'Cancellations & Refunds',
          content:
            'Subscriptions may be canceled at any time. Payments are generally non-refundable except where required by law or in cases of billing errors.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact Support',
      icon: Mail,
      content: 'For all questions, billing issues, or feedback, contact us by email:',
      subsections: [
        { title: '', content: 'support@addvancedai.com' },
        { title: '', content: 'Typical response time : within 24 hours.' },
      ],
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: FileText,
      content: 'Important legal information about using Deal Hunter.',
      subsections: [
        {
          title: 'Agreement to Terms',
          content:
            'These Terms & Conditions govern your access to and use of Deal Hunter. By accessing or using the Service, you agree to be bound by these Terms.',
        },
        {
          title: '',
          content: `Last Updated: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`,
        },
      ],
    },
    {
      id: 'Limitation-of-Liability',
      title: 'Limitation of Liability',
      icon: FileText,
      content: 'Important legal information about using Deal Hunter.',
      subsections: [
        {
          title: '',
          content:
            'To the maximum extent permitted by law, Deal Hunter shall not be liable for indirect, incidental, or consequential damages.',
        },
      ],
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (section.subsections || []).some(
        (sub) =>
          sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="mt-0 flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 md:mt-0">
      {/* Fixed Header - No Scroll */}
      <header className="flex-shrink-0 border-b border-slate-200/60 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl font-bold text-transparent">
                Help & Support
              </h1>
              <p className="mt-1 text-sm text-slate-500">Find answers to your questions</p>
            </div>
          </div>
          <div>
            <button
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200/60 bg-slate-50/80 py-3 pr-4 pl-12 text-slate-700 transition-all duration-200 ease-out placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Scrollable Content Area - Only This Section Scrolls */}
      <div className="flex-1 overflow-hidden">
        <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 h-full overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Welcome Section */}
            <div className="rounded-2xl border border-blue-200/40 bg-gradient-to-r from-blue-600 to-blue-500 p-8 shadow-lg">
              <h2 className="mb-3 text-2xl font-bold text-white md:text-4xl">
                Welcome to Deal Hunter Help & Support
              </h2>
              <p className="leading-relaxed text-blue-50">
                We're here to help you get the most out of Deal Hunter and answer any questions you
                may have.
              </p>
            </div>

            {filteredSections.length === 0 ? (
              <div className="">
                <div className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-8 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-700">No results found</h3>
                  <p className="mb-4 text-slate-500">
                    We couldn't find anything matching "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex transform items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-blue-700 hover:shadow-md"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSections.map((section, sectionIndex) => {
                  const Icon = section.icon;
                  const isOpen = openSection === section.id;
                  const hasSubsections = section.subsections && section.subsections.length > 0;

                  return (
                    <div
                      key={section.id}
                      className=""
                      style={{ animationDelay: `${sectionIndex * 100}ms` }}
                    >
                      <button
                        onClick={() => hasSubsections && setOpenSection(isOpen ? null : section.id)}
                        className="flex w-full items-start gap-4 rounded-2xl border border-slate-200/60 bg-white/80 p-4 text-left backdrop-blur-sm transition-all duration-300 ease-out group-hover:-translate-y-1 hover:border-blue-300/60 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 md:gap-5 md:p-6"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/30 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 group-hover:shadow-md">
                          <Icon className="h-6 w-6 text-blue-600 transition-colors duration-200 group-hover:text-blue-700" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="mb-2 text-xl font-bold text-slate-600 transition-colors duration-200 group-hover:text-blue-700">
                            {section.title}
                          </h2>
                          <p className="leading-relaxed text-slate-500">{section.content}</p>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200">
                          {hasSubsections ? (
                            <ChevronDown
                              className={`h-4 w-4 text-slate-500 transition-all duration-300 ease-out group-hover:text-blue-600 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          ) : null}
                        </div>
                      </button>

                      {/* Expanded Content with Smooth Animation */}
                      {hasSubsections && (
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-out ${
                            isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="rounded-2xl border border-t-0 border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-white/90 backdrop-blur-sm">
                            <div className="mt-4 space-y-6 p-6">
                              {(section.subsections || []).map((subsection, idx) => (
                                <div
                                  key={idx}
                                  className="transform transition-all duration-300 ease-out"
                                  style={{
                                    animationDelay: `${idx * 150}ms`,
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                                  }}
                                >
                                  <div className="flex items-start gap-4">
                                    {['getting-started', 'payments'].includes(section.id) && (
                                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-sm">
                                        <span className="text-xs font-bold text-white">
                                          {idx + 1}
                                        </span>
                                      </div>
                                    )}

                                    <div className="flex-1">
                                      <h3 className="mb-3 text-lg leading-tight font-semibold text-slate-700">
                                        {subsection.title}
                                      </h3>
                                      <p className="text-base leading-relaxed text-slate-500">
                                        {subsection.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Enhanced Contact CTA */}
            <div className="mt-12 rounded-2xl border border-slate-200/60 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">Still need help?</h3>
                  <p className="mb-6 leading-relaxed text-slate-700">
                    Our dedicated support team is ready to assist you with any questions, billing
                    concerns, or feedback you may have.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="mailto:support@addvancedai.com"
                      className="inline-flex transform items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 ease-out hover:scale-105 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg"
                    >
                      <Mail className="h-4 w-4" />
                      Contact Support
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                      <span>Typically responds within 24 hours</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-200/40 bg-white/60 p-3">
                    <p className="text-sm text-slate-600">
                      <strong>support@addvancedai.com</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="mt-12 border-t border-slate-200/60 pt-8">
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm font-medium text-slate-700">
                    Last Updated:{' '}
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  © 2024 Deal Hunter. All rights reserved. • Made with for our users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* moved custom keyframes and scrollbar CSS into src/index.css; removed inline style block */}
    </div>
  );
}
