import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Pen,
  StarHalf,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import { authMultiStepPlan } from '../../../features/auth/authAPI';

const DealHunterModal = ({ isOpen, onConfirm, onClose }) => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const investmentPlanData = JSON.parse(localStorage.getItem('investmentPlan')) || null;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: investmentPlanData?.propertyType || '',
    strategy: investmentPlanData?.strategy || '',
    startingCapital: investmentPlanData?.startingCapital || '',
    targetGeography: investmentPlanData?.targetGeography || '',
    investmentTimeline: investmentPlanData?.investmentTimeline || '',
    profitGoal: investmentPlanData?.profitGoal || '',
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
        strategy: formData.strategy,
        rentalType: 'Long-term',
        startingCapital: parseFloat(formData.startingCapital) || 0,
        targetGeography: formData.targetGeography,
        investmentTimeline: formData.investmentTimeline,
        profitGoal: parseFloat(formData.profitGoal) || 0,
      },
    };

    dispatch(authMultiStepPlan(payload));
    setIsSubmitted(true);
    localStorage.setItem('investmentPlan', JSON.stringify(payload));
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
              What type of properties are you seeking?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Select the property type that matches your investment goals
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {propertyOptions.map((option) => (
                <div
                  key={option}
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center ${
                    formData.propertyType === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('propertyType', option)}
                >
                  <div className="font-medium text-gray-800">{option}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              What's your investment strategy?
            </h2>
            <p className="mb-8 text-lg text-gray-600">Choose your preferred investment approach</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {strategyOptions.map((option) => (
                <div
                  key={option}
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center ${
                    formData.strategy === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleInputChange('strategy', option)}
                >
                  <div className="font-medium text-gray-800">{option}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="min-h-[250px] md:min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Starting Capital ($)
            </h2>
            <p className="mb-8 text-lg text-gray-600">Enter your initial investment amount</p>
            <input
              type="number"
              value={formData.startingCapital}
              onChange={(e) => handleInputChange('startingCapital', e.target.value)}
              placeholder="Enter amount in USD"
              min="0"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            <p className="mt-2 text-sm text-gray-500">Minimum recommended: $10,000</p>
          </div>
        );
      case 4:
        return (
          <div className="min-h-[250px] md:min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">Target Geography</h2>
            <p className="mb-8 text-lg text-gray-600">
              Specify your preferred investment location(s)
            </p>
            <input
              type="text"
              value={formData.targetGeography}
              onChange={(e) => handleInputChange('targetGeography', e.target.value)}
              placeholder="e.g., 'New York, NY' or 'Metro areas in Texas'"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            <p className="mt-2 text-sm text-gray-500">Enter city, state, or region</p>
          </div>
        );
      case 5:
        return (
          <div className="min-h-[250px] md:min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              Investment Timeline (Years)
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
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            <div className="mt-8">
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
          <div className="min-h-[250px] md:min-h-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">Profit Goal ($)</h2>
            <p className="mb-8 text-lg text-gray-600">What's your target return on investment?</p>
            <input
              type="number"
              value={formData.profitGoal}
              onChange={(e) => handleInputChange('profitGoal', e.target.value)}
              placeholder="Enter target profit amount"
              min="0"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            {formData.startingCapital && formData.profitGoal && (
              <div className="mt-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                <p className="font-medium text-green-700">
                  Target ROI: {calculateROI(formData.startingCapital, formData.profitGoal)}%
                </p>
                <p className="mt-1 text-sm text-green-700">
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
  const renderSuccessView = () => {
    const investmentPlan = formData;

    return (
      <div>
        <div className="mb-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-500"
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
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Successful! </h2>
          <p className="text-gray-600">
            Your personalized real estate investment plan has been saved.
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Property Type</p>
            </div>
            <p className="font-medium text-gray-800">{investmentPlan.propertyType || 'Not set'}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Strategy</p>
            </div>
            <p className="font-medium text-gray-800">{investmentPlan.strategy || 'Not set'}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Starting Capital</p>
            </div>
            <p className="font-medium text-gray-800">
              $
              {investmentPlan.startingCapital
                ? parseFloat(investmentPlan.startingCapital).toLocaleString()
                : '0'}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Geography</p>
            </div>
            <p className="font-medium text-gray-800">
              {investmentPlan.targetGeography || 'Not set'}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Timeline</p>
            </div>
            <p className="font-medium text-gray-800">
              {investmentPlan.investmentTimeline
                ? `${investmentPlan.investmentTimeline} years`
                : 'Not set'}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-500">Profit Goal</p>
            </div>
            <p className="font-medium text-gray-800">
              $
              {investmentPlan.profitGoal
                ? parseFloat(investmentPlan.profitGoal).toLocaleString()
                : '0'}
            </p>
          </div>
        </div>

        {investmentPlan.startingCapital && investmentPlan.profitGoal && (
          <div className="mb-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
            <p className="font-medium text-green-700">
              Target ROI: {calculateROI(investmentPlan.startingCapital, investmentPlan.profitGoal)}%
            </p>
            <p className="mt-1 text-sm text-green-700">
              Annual Target: $
              {(
                parseFloat(investmentPlan.profitGoal) /
                (parseFloat(investmentPlan.investmentTimeline) || 1)
              ).toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="flex items-center rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <Pen className="mr-2 h-4 w-4" /> Edit Plan
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-blue-500 px-8 py-4">
          <h2 className="text-xl font-bold text-gray-100">
            {isSubmitted ? 'Investment plan completed' : 'Setup investment plan'}
          </h2>
          {!isSubmitted && (
            <button
              onClick={onClose}
              className="rounded-full p-1 text-blue-200 transition-colors hover:bg-blue-600 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="max-h-[70vh] overflow-y-auto p-4 md:p-6">
          {isSubmitted ? (
            renderSuccessView()
          ) : (
            <div className="md:p-4">
              <div className="mb-8">
                <p className="text-gray-600">
                  Complete all 6 steps to get your personalized investment plan
                </p>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="absolute top-4 left-0 h-1 w-full bg-gray-200" />
                <div
                  className="absolute top-4 left-0 h-1 bg-green-400 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          step <= currentStep
                            ? 'bg-green-400 text-white ring-4 ring-green-100'
                            : 'bg-gray-200 text-gray-500'
                        } ${step === currentStep ? 'scale-110' : ''}`}
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="mb-8">{renderStep()}</div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrev}
                      className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      Previous
                    </button>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !formData.propertyType}
                  className={`rounded-lg px-6 py-2 font-medium text-white transition-colors ${
                    currentStep === 1 && !formData.propertyType
                      ? 'cursor-not-allowed bg-gray-400'
                      : currentStep === 6
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {currentStep === 6 ? (loading ? 'Saving...' : 'Complete Setup') : 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealHunterModal;
