// ✅ FIXED: ProfileSettings.jsx

import { HelpCircle, LogOut, Settings, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { setSelectedChatId } from '../../../features/chat/aiChatSlice';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(setSelectedChatId(null));
  };

  return (
    <div className="mt-auto border-t border-gray-700 px-4 py-2">
      {/* User Profile */}
      <div className="flex items-center p-2.5">
        <User className="mr-3 h-8 w-8 rounded-full border border-gray-500 bg-slate-200 p-1 text-gray-700" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-gray-300">{user?.role}</div>
          <div className="truncate text-xs text-gray-500">{user?.email}</div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="space-y-1">
        <Link
          to="/dash/settings"
          className="flex cursor-pointer items-center rounded-lg p-2.5 transition-colors duration-150 hover:bg-gray-700"
        >
          <Settings className="mr-3 h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">Settings</span>
        </Link > 

        <Link 
        to="/dash/help-and-support"
        className="flex cursor-pointer items-center rounded-lg p-2.5 transition-colors duration-150 hover:bg-gray-700">
          <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">Help & Support</span>
        </Link>
        <div
          onClick={logoutHandler}
          className="flex cursor-pointer items-center rounded-lg p-2.5 transition-colors duration-150 hover:bg-gray-700"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;