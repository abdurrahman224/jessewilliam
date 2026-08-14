import { Bot, Sparkles, ArrowRight, TrendingUp, MapPin, Calculator, FileText, Download } from 'lucide-react';
import { useSelector } from 'react-redux';

const SUGGESTED_PROMPTS = [
  {
    text: 'Starting $5,000. Search Travis County. Build a low-capital flip plan.',
    icon: MapPin,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    text: 'Compare Plan A (TX) and Plan B (FL). Recommend optimal solution.',
    icon: TrendingUp,
    color: 'bg-green-50 text-green-600',
  },
  {
    text: 'Run Addvanced analysis with tax and survey insights.',
    icon: Calculator,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    text: 'Generate plan and include sensitivity table.',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    text: 'Download excel file early to maintain momentum',
    icon: Download,
    color: 'bg-orange-50 text-orange-600',
  },
];

const EmptyState = ({ onPromptClick }) => {
  const { currentPlan, activePlan } = useSelector((state) => state.subscription || {});

  const planName = currentPlan || activePlan?.plan?.name || '';
  const isFreePlan = planName.toLowerCase() === 'free';

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* Animated icon container */}
      <div className="group relative mb-6 md:mb-8">
        <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 blur-lg group-hover:opacity-30"></div>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg md:h-20 md:w-20">
          <Bot className="h-6 w-6 md:h-10 md:w-10" />
        </div>
      </div>

      {/* Headline with gradient */}
      <h1 className="mb-3 text-center text-lg leading-tight font-bold tracking-tight md:mb-4 md:text-4xl lg:text-5xl">
        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Deal Hunter
        </span>
        <span className="block text-gray-700">Real-Estate Investor Assistant</span>
      </h1>

      {/* Description with better readability */}
      <p className="mb-8 max-w-2xl text-center text-sm leading-relaxed text-gray-600 md:mb-10 md:text-base lg:text-lg">
        Your AI-powered real estate coach for data-driven investment decisions. Get detailed ROI
        analysis, market insights, and personalized strategies.
      </p>

      {isFreePlan && (
        <div className="mb-4 w-full max-w-4xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 sm:text-sm">
          Recommended to prompt the AI coach to download an excel after initial conversation and
          property queries.
        </div>
      )}

      {/* Prompt label with sparkle effect */}
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-700 md:text-base">
          Try these popular prompts
        </span>
        <Sparkles className="h-4 w-4 text-blue-500" />
      </div>

      {/* Prompt grid - completely responsive */}
      <div className="mb-8 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
        {SUGGESTED_PROMPTS.map((prompt, idx) => {
          const Icon = prompt.icon;
          return (
            <button
              key={idx}
              onClick={() => onPromptClick(prompt.text)}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 active:scale-[0.98] md:p-5"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>

              {/* Content */}
              <div className="relative flex items-start gap-3">
                {/* Icon with consistent sizing */}
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${prompt.color} md:h-10 md:w-10`}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>

                {/* Prompt text */}
                <div className="flex-1">
                  <p className="line-clamp-2 text-xs text-gray-800 md:text-sm lg:text-base">
                    {prompt.text}
                  </p>
                </div>

                {/* Arrow indicator on hover */}
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-blue-500 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmptyState;
