import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authMultiStepPlan } from '../../../../features/auth/authAPI';
import SuccessModal from '../../../../components/common/SuccsesModal';
import {
  Building2,
  Calendar,
  Check,
  DollarSign,
  MapPin,
  PenBox,
  Target,
  TrendingUp,
} from 'lucide-react';

const DealHunterView = () => {
  const { loading, onboarding } = useSelector((state) => state.auth);

  const [isSubmitted, setIsSubmitted] = useState(true); // Always show plan view first
  const [showForm, setShowForm] = useState(false); // Start with summary view
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(onboarding);

  const propertyOptions = [
    'Residential',
    'Commercial',
    'Industrial',
    'Mixed-Use',
    'Vacation Rentals',
    'Land',
  ];

  const strategyOptions = [
    'Fix and Flip',
    'Buy and Hold',
    'Rental Income',
    'REIT Investment',
    'Commercial Leasing',
    'Development',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const payload = {
      step: 2,
      profile: {
        propertyType: formData.propertyType,
        strategy: formData.investmentStrategy,
        rentalType: 'Long-term',
        startingCapital: parseFloat(formData.startingCapital),
        targetGeography: formData.targetGeography,
        investmentTimeline: formData.investmentTimeline,
        profitGoal: parseFloat(formData.profitGoal),
      },
    };

    dispatch(authMultiStepPlan(payload));
    setIsSubmitted(true);
    setModalOpen(true);
  };

  const calculateROI = (capital, profit) => {
    if (!capital || !profit || parseFloat(capital) === 0) return '0';
    return ((parseFloat(profit) / parseFloat(capital)) * 100).toFixed(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Step 1: What type of properties are you seeking?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Select the property type that matches your investment goals
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {propertyOptions.map((option) => (
                <div
                  key={option}
                  className={`cursor-pointer rounded-lg border-2 p-6 ${
                    formData.propertyType === option
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('propertyType', option)}
                >
                  <div className="text-center font-medium text-gray-800">{option}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Step 2: What's your investment strategy?
            </h2>
            <p className="mb-8 text-lg text-gray-600">Choose your preferred investment approach</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {strategyOptions.map((option) => (
                <div
                  key={option}
                  className={`cursor-pointer rounded-lg border-2 p-6 ${
                    formData.strategy === option
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('strategy', option)}
                >
                  <div className="text-center font-medium text-gray-800">{option}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Step 3: Starting Capital ($)
            </h2>
            <p className="mb-8 text-lg text-gray-600">Enter your initial investment amount</p>
            <input
              type="number"
              value={formData.startingCapital}
              onChange={(e) => handleInputChange('startingCapital', e.target.value)}
              placeholder="Enter amount in USD"
              min="0"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            <p className="mt-2 text-sm text-gray-500">Minimum recommended: $10,000</p>
          </div>
        );
      case 4:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Step 4: Target Geography
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Specify your preferred investment location(s)
            </p>
            <input
              type="text"
              value={formData.targetGeography}
              onChange={(e) => handleInputChange('targetGeography', e.target.value)}
              placeholder="e.g., 'New York, NY' or 'Metro areas in Texas'"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            <p className="mt-2 text-sm text-gray-500">Enter city, state, or region</p>
          </div>
        );
      case 5:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Step 5: Investment Timeline (Years)
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              How long do you plan to hold your investment?
            </p>
            <input
              type="number"
              value={formData.investmentTimeline}
              onChange={(e) => handleInputChange('investmentTimeline', e.target.value)}
              placeholder="Enter number of years"
              min="1"
              max="30"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            <div className="mt-8 max-w-2xl">
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>1 yr</span>
                <span>5 yrs</span>
                <span>10 yrs</span>
                <span>20 yrs</span>
                <span>30 yrs</span>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Step 6: Profit Goal ($)
            </h2>
            <p className="mb-8 text-lg text-gray-600">What's your target return on investment?</p>
            <input
              type="number"
              value={formData.profitGoal}
              onChange={(e) => handleInputChange('profitGoal', e.target.value)}
              placeholder="Enter target profit amount"
              min="0"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            {formData.startingCapital && formData.profitGoal && (
              <div className="mt-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                <p className="font-medium text-green-700">
                  Target ROI: {calculateROI(formData.startingCapital, formData.profitGoal)}%
                </p>
                <p className="mt-1 font-medium text-green-700">
                  Annual Target: $
                  {(
                    parseFloat(formData.profitGoal) / (parseFloat(formData.investmentTimeline) || 1)
                  ).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted && !modalOpen && !showForm) {
    return (
      <div className="p-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Investment Plan</h1>
            <p className="text-lg text-gray-600">
              Review your current real estate investment preferences
            </p>
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowForm(true);
                setCurrentStep(1);
              }}
              className="rounded-lg border border-gray-300 bg-blue-400 px-3 py-2 font-medium text-white transition-colors hover:bg-blue-600"
            >
              <PenBox className="mr-1 inline-block h-5 w-5" /> Edit Plan
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 text-left md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <p className="text-md text-gray-500">Property Type</p>
            </div>
            <p className="text-gray-700">{formData.propertyType || 'Not set'}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <p className="text-md text-gray-500">Investment Strategy</p>
            </div>
            <p className="text-gray-700">{formData.strategy || 'Not set'}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <p className="text-md text-gray-500">Starting Capital</p>
            </div>
            <p className="text-gray-700">
              $
              {formData.startingCapital
                ? parseFloat(formData.startingCapital).toLocaleString()
                : '0'}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-md text-gray-500">Target Geography</p>
            </div>
            <p className="text-gray-700">{formData.targetGeography || 'Not set'}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <p className="text-md text-gray-500">Investment Timeline</p>
            </div>
            <p className="text-gray-700">
              {formData.investmentTimeline ? `${formData.investmentTimeline} years` : 'Not set'}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center gap-2">
              <Target className="h-5 w-5 text-gray-500" />
              <p className="text-md text-gray-500">Profit Goal</p>
            </div>
            <p className="text-gray-700">
              ${formData.profitGoal ? parseFloat(formData.profitGoal).toLocaleString() : '0'}
            </p>
          </div>
        </div>

        {formData.startingCapital && formData.profitGoal && (
          <div className="mb-8 flex items-center gap-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 shadow">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-700">
                Target ROI: {calculateROI(formData.startingCapital, formData.profitGoal)}%
              </p>
              <p className="mt-1 font-medium text-green-700">
                Annual Target: $
                {(
                  parseFloat(formData.profitGoal) / (parseFloat(formData.investmentTimeline) || 1)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setShowForm(false);
        }}
        title="Submission Completed 🎉"
        message="Your real estate investment plan has been saved!"
        actionText="Great!"
        onAction={() => {
          setModalOpen(false);
          setShowForm(false);
        }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-800 md:text-4xl">
            Real Estate Investment Planner
          </h1>
          <p className="text-lg text-gray-600">
            Complete all 6 steps to get your personalized investment plan
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 h-1 w-full bg-gray-200" />
          <div
            className="absolute top-4 left-0 h-1 bg-green-400 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          />

          {/* Step Indicators */}
          <div className="relative mb-2 flex justify-between">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-green-400 text-white shadow-lg ring-4 ring-green-100'
                      : 'bg-gray-200 text-gray-500 '
                  } ${step === currentStep ? 'scale-110 ' : ''}`}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8 rounded-2xl bg-white p-6 md:p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="flex items-center rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:-translate-x-1 hover:bg-gray-200"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={currentStep === 1 && !formData.propertyType}
              className={`ml-auto rounded-lg px-8 py-3 font-medium transition-all duration-200 ${
                currentStep === 1 && !formData.propertyType
                  ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                  : ' text-white hover:translate-x-1 hover:shadow-lg'
              } flex items-center ${currentStep === 6 ? 'bg-green-500' : 'bg-blue-400'}`}
            >
              {currentStep === 6 ? (
                <div className="flex items-center">
                  {loading ? 'Loading...' : 'Submit Plan'}
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <>
                  Next
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealHunterView;
