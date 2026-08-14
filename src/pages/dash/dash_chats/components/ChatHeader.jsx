import React from 'react';
import { Bot, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../../../features/common/commonSlice';

const ChatHeader = () => {
  const { currentPlan } = useSelector((state) => state.subscription || {});
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          onClick={() => dispatch(toggleMobileMenu())}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-400">
          <Bot className="h-6 w-6 text-gray-100" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-800 md:text-lg">
            AI Deal Hunter{' '}
            <span className="rounded bg-green-100 p-0.5 text-xs font-medium text-green-600 md:p-1 md:text-xs">
              {currentPlan || 'Free'}
            </span>
          </h1>
          <p className="text-xs text-gray-500 md:text-sm">Powered by Deal Hunter</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {currentPlan === 'Free' && (
          <Link
            to="/dash/settings/subscription"
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            Upgrade
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
