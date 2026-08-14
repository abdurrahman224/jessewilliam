import React, { useState } from 'react';
import SuccessMessage from '../../components/common/SuccessMessage';
import { useDispatch, useSelector } from 'react-redux';
import { authMultiStepPlan } from '../../features/auth/authAPI';

const StepView = () => {
  const { loading } = useSelector((state) => state.auth);
  const investmentPlan = JSON.parse(localStorage.getItem('investmentPlan'));

  const [isSubmitted, setIsSubmitted] = useState(investmentPlan ? true : false);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    investmentStrategy: '',
    startingCapital: '',
    targetGeography: '',
    investmentTimeline: '',
    profitGoal: '',
  });

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
        investmentStrategy: formData.investmentStrategy,
        startingCapital: formData.startingCapital,
        targetGeography: formData.targetGeography,
        investmentTimeline: formData.investmentTimeline,
        profitGoal: formData.profitGoal,
      },
    };
    dispatch(authMultiStepPlan(payload));
    localStorage.setItem('investmentPlan', JSON.stringify(payload));
    setIsSubmitted(true);
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
                  className={`cursor-pointer rounded-lg border-2 md:p-6 ${
                    formData.propertyType === option
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('propertyType', option)}
                >
                  <div className="text-center md:text-base font-medium text-gray-800">{option}</div>
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
                    formData.investmentStrategy === option
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('investmentStrategy', option)}
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

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-8">
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

        {/* Summary Card */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Current Summary</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(formData).map(
              ([key, value]) =>
                value && (
                  <div key={key} className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-1 text-sm font-medium text-gray-500">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="font-semibold text-gray-800">{value}</div>
                  </div>
                )
            )}
          </div>

          {Object.values(formData).every((value) => !value) && (
            <div className="py-8 text-center text-gray-500">
              Complete the steps above to see your investment summary
            </div>
          )}
        </div>

        {/* Quick Stats (Optional) */}
        {Object.values(formData).some((value) => value) && (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm text-blue-600">
                {Object.values(formData).filter((value) => value).length} Steps Completed
              </p>
            </div>
            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
              <p className="text-sm text-green-600">Current step {currentStep}</p>
            </div>
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
              <div className="text-lg font-bold text-purple-700">
                {formData.startingCapital
                  ? `$${parseInt(formData.startingCapital).toLocaleString()}`
                  : '--'}
              </div>
              <div className="text-sm text-purple-600">Total Investment</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepView;
