import {
  Building,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../../utils/Helper';

const CurrentPlanCard = ({
  activePlan,
  planName,
  planStart,
  planEnd,
  daysRemaining,
  tokensUsed,
  totalTokens,
  tokenPercentage,
  planPrice,
  planFeatures,
  onCancelClick,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Your Active Plan</h2>

                <span
                  className={`rounded-full px-2 py-0.5 text-sm ${
                    activePlan?.status === 'ACTIVE'
                      ? 'bg-green-200 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {planName}
                </span>
              </div>
              <p className="text-sm text-gray-500">Subscription details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Plan Period */}
        <div className="mb-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Current Period</span>
            </div>
            {daysRemaining !== null && (
              <span className="text-sm font-medium text-gray-900">{daysRemaining} days left</span>
            )}
          </div>
          {planStart && planEnd && (
            <div className="text-center text-gray-500">
              {formatDate(planStart)} - {formatDate(planEnd)}
            </div>
          )}
        </div>

        {/* Token Usage */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Token Usage</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {tokensUsed.toLocaleString()} / {totalTokens.toLocaleString()}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                tokenPercentage >= 90
                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                  : tokenPercentage >= 70
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}
              style={{ width: `${tokenPercentage}%` }}
            />
          </div>
          <div
            className={`mt-2 text-right text-xs font-medium ${
              tokenPercentage >= 90
                ? 'text-red-600'
                : tokenPercentage >= 70
                  ? 'text-orange-500'
                  : 'text-gray-500'
            }`}
          >
            {tokenPercentage}% used
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">Plan Features</h3>
          <div className="space-y-3">
            {planPrice && (
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-green-50 p-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">${planPrice} / month</span>
              </div>
            )}

            {planFeatures.credits && (
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-pink-50 p-1">
                  <FileText className="h-4 w-4 text-pink-600" />
                </div>
                <span className="text-sm text-gray-700">{planFeatures.credits} credits</span>
              </div>
            )}

            {planFeatures.tokens && (
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-blue-50 p-1">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{planFeatures.tokens}</span>
              </div>
            )}

            {planFeatures.analysis && (
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-purple-50 p-1">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">{planFeatures.analysis}</span>
              </div>
            )}

            {planFeatures.evaluation && (
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-amber-50 p-1">
                  <Building className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-sm text-gray-700">{planFeatures.evaluation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          {planName === 'Free' ? (
            <Link
              to="/dash/settings/subscription"
              className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-center font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
            >
              Upgrade Plan
            </Link>
          ) : (
            <div>
              <Link
                to="/dash/settings/subscription"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-center font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Settings size={20} /> Manage Your Plan
              </Link>
              <button
                onClick={onCancelClick}
                className="mt-4 block w-full rounded-lg border border-gray-300 bg-red-600 px-4 py-3 text-center font-medium text-white transition-all hover:bg-red-700"
              >
                Cancel Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanCard;
