import React from 'react';

export default function DealHunterWebsite() {
  return (
    <div className="">
      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-center">
            <h2 className="mb-4 text-3xl text-slate-900 capitalize sm:text-4xl lg:text-5xl">
              Propery <span className="bg-blue-500 bg-clip-text text-transparent">Search</span> and
              <span className="bg-blue-500 bg-clip-text text-transparent">
                {' '}
                Strategy Prioritization
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600">
              Properties With Purpose — Not Just Listings
            </p>
          </div>

          <div className="mb-12">
            <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-slate-700">
              Deal Hunter does more than surface properties. Using the Addvanced AI platform, Deal
              Hunter:
            </p>
          </div>

          <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#50a2ff]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Searches selected markets using public data
              </h3>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-blue-50 to-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#50a2ff]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Identifies relevant property references and addresses
              </h3>
            </div>

            <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-blue-50 to-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#50a2ff]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Evaluates how each property fits different strategies
              </h3>
            </div>

            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#50a2ff]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Prioritizes strategies based on how well they support the investor's stated goals
              </h3>
            </div>
          </div>

          <div className="mx-auto mt-8 rounded-2xl bg-blue-50 p-6 text-center">
            <p className="text-blue-400">
              This ensures investors focus on the right strategies first, supported by real market
              data.
            </p>
          </div>
        </div>
      </section>

      {/* Why Deal Hunter Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Why <span className="text-blue-500">Deal Hunter?</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600">
              Find Properties. Prioritize Strategies. Decide With Clarity.
            </p>
            <p className="text-center text-lg leading-relaxed text-slate-700">
              Most real estate platforms stop at property discovery. Deal Hunter goes further by
              helping investors:
            </p>
          </div>

          {/* Enhanced step container with visual flow */}
          <div className="relative">
            {/* Subtle connecting path for desktop */}
            <div className="absolute top-1/2 left-0 hidden h-1 w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 lg:block" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: '1',
                  title: 'Find relevant properties',
                  color: 'from-blue-500 to-blue-600',
                  glow: 'shadow-[0_0_15px_rgba(59,130,246,0.25)]',
                },
                {
                  number: '2',
                  title: 'Understand which strategies fit those properties',
                  color: 'from-blue-500 to-blue-600',
                  glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
                },
                {
                  number: '3',
                  title: 'Prioritize strategies aligned with their goals',
                  color: 'from-blue-500 to-blue-600',
                  glow: 'shadow-[0_0_15px_rgba(59,130,246,0.25)]',
                },
                {
                  number: '4',
                  title: 'Reduce emotional and inconsistent decision-making',
                  color: 'from-blue-500 to-blue-600',
                  glow: 'shadow-md',
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-7 text-center"
                >
                  {/* Number badge with depth */}
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white ${step.glow} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>

                  {/* Title with subtle underline on hover */}
                  <h3 className="text-lg font-bold text-slate-900 transition-all duration-300 group-hover:text-slate-800">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Approach Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column - AI Approach Content */}
            <div className="space-y-8">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-blue-700">
                    Powered by Explainable AI
                  </span>
                </div>
                <h2 className="mb-4 text-3xl sm:text-4xl">
                  Artificial Intelligence <span className="text-blue-500">Approach</span>
                </h2>
                <p className="text-xl leading-tight">Explainable AI Focused on Decision Quality</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-6 shadow">
                <p className="mb-6 text-lg">Addvanced AI is used to:</p>

                <div className="space-y-5">
                  {[
                    {
                      title: 'Interpret investor goals',
                      color: 'bg-blue-50 text-blue-600 border-blue-200',
                      iconBg: 'bg-blue-100',
                    },
                    {
                      title: 'Analyze real market signals',
                      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                      iconBg: 'bg-emerald-100',
                    },
                    {
                      title: 'Evaluate and prioritize strategies objectively',
                      color: 'bg-purple-50 text-purple-600 border-purple-200',
                      iconBg: 'bg-purple-100',
                    },
                    {
                      title: 'Present results in a clear, explainable format',
                      color: 'bg-orange-50 text-orange-600 border-orange-200',
                      iconBg: 'bg-orange-100',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 rounded-lg border border-slate-100 p-4 transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                    >
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <svg
                          className={`h-6 w-6 ${item.color.split(' ')[1]}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Value Proposition Cards */}
            <div className="relative space-y-6">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-400 p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Clarity Over Prediction</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-blue-100">
                    The platform emphasizes clarity over prediction and structure over speculation.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-400 p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">You Stay In Control</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-blue-100">
                    Final investment decisions always remain with the user.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
