import React, { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { CreditCard, Shield, User, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { toggleMobileMenu } from '../../features/common/commonSlice';

// ----- Tab Configuration -----
const TABS_CONFIG = [
  { id: 'account', label: 'Account', icon: User, path: 'account' },
  { id: 'subscription', label: 'Subscription', icon: CreditCard, path: 'subscription' },
  { id: 'security', label: 'Security', icon: Shield, path: 'security' },
];

// ----- Main Component -----
const SettingLayout = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  // Check scroll position to show/hide chevrons
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftChevron(scrollLeft > 0);
      setShowRightChevron(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll events
  const handleScroll = () => {
    checkScrollButtons();
  };

  // Scroll left/right functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Check initial scroll state on mount and window resize
  useEffect(() => {
    const checkInitialScroll = () => {
      setTimeout(checkScrollButtons, 100);
    };

    checkInitialScroll();
    window.addEventListener('resize', checkInitialScroll);

    return () => {
      window.removeEventListener('resize', checkInitialScroll);
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Main Column */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            {/* Mobile Menu Button (Display Only) */}
            <button
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Mobile/Tablet Tab Navigation */}
        <div className="border-b border-gray-200 bg-white lg:hidden">
          <div className="relative flex items-center">
            {/* Left Chevron Button */}
            {showLeftChevron && (
              <button
                onClick={scrollLeft}
                className="absolute left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md hover:bg-gray-50 hover:text-gray-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            {/* Scrollable Tab Container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto px-4 py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <nav className="flex min-w-max space-x-1">
                {TABS_CONFIG.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <NavLink
                      key={tab.id}
                      to={tab.id === 'account' ? '/dash/settings' : tab.path}
                      end={tab.id === 'account'}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? 'border border-blue-200 bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Right Chevron Button */}
            {showRightChevron && (
              <button
                onClick={scrollRight}
                className="absolute right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md hover:bg-gray-50 hover:text-gray-800"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden w-64 border-r border-gray-200 bg-white p-4 lg:block">
            <nav className="space-y-1">
              {TABS_CONFIG.map((tab) => {
                const Icon = tab.icon;
                return (
                  <NavLink
                    key={tab.id}
                    to={tab.id === 'account' ? '/dash/settings' : tab.path}
                    end={tab.id === 'account'} // <-- IMPORTANT: Exact match for account
                    className={({ isActive }) =>
                      `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
