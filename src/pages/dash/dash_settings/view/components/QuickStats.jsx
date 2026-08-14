import { formatDate } from '../../../../../utils/Helper';

const QuickStats = ({ activePlan, tokensUsed }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Usage Summary</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Reset</span>
          <span className="font-medium text-gray-900">
            {activePlan?.lastResetDate ? formatDate(activePlan.lastResetDate) : 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Plan Duration</span>
          <span className="font-medium text-gray-900">
            {activePlan?.plan?.duration || 'Monthly'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Requests Used</span>
          <span className="font-medium text-gray-900">{tokensUsed.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
