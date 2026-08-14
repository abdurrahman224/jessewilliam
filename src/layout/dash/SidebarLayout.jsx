// SidebarLayout.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Menu, X } from 'lucide-react';
import ChatHistoryList from './components/ChatHistoryList';
import ProfileSettings from './components/ProfileSettings';
import { useNavigate } from 'react-router-dom';
import { setSessionsList, setSelectedChatId } from '../../features/chat/aiChatSlice';
import { API_CONFIG } from '../../config/constants';
import { getCookie } from '../../utils/cookies';
import { toggleMobileMenu } from '../../features/common/commonSlice';

const SidebarLayout = () => {
  const { sessionsList } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobileMenuOpen = useSelector((state) => state.common.isMobileMenuOpen);

  // ===================================================
  // LOAD SESSIONS FROM DATABASE
  // ===================================================
  useEffect(() => {
    loadSessionsFromDatabase();
  }, [dispatch]);

  const loadSessionsFromDatabase = async () => {
    try {
      setLoading(true);
      const token = getCookie('app_token') || localStorage.getItem('token');

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/chat/sessions?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.sessions) {
        dispatch(setSessionsList(data.sessions));
        console.log('✅ Loaded sessions from database:', data.sessions.length);
      } else {
        dispatch(setSessionsList([]));
      }
    } catch (error) {
      console.error('❌ Failed to load sessions from database:', error);
      dispatch(setSessionsList([]));
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // HANDLE SEARCH
  // ===================================================
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      loadSessionsFromDatabase();
      return;
    }

    try {
      const token = getCookie('app_token') || localStorage.getItem('token');

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/chat/sessions?limit=50&search=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success && data.sessions) {
        dispatch(setSessionsList(data.sessions));
      }
    } catch (error) {
      console.error('Search failed:', error);

      if (sessionsList.length > 0) {
        const filtered = sessionsList.filter((s) =>
          s.title.toLowerCase().includes(query.toLowerCase())
        );
        dispatch(setSessionsList(filtered));
      }
    }
  };

  // ===================================================
  // HANDLE NEW CHAT
  // ===================================================
  const handleNewChat = () => {
    dispatch(setSelectedChatId(null));
    navigate('/dash/gpt', { replace: true });
    dispatch(toggleMobileMenu()); // Close mobile menu
  };

  // ===================================================
  // DELETE SESSION FROM DATABASE
  // ===================================================
  const handleDeleteSession = async (sessionId) => {
    try {
      const token = getCookie('app_token') || localStorage.getItem('token');

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/chat/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const updatedSessions = sessionsList.filter((s) => s.id !== sessionId);
        dispatch(setSessionsList(updatedSessions));
      } else {
        throw new Error('Failed to delete session');
      }
    } catch (error) {
      console.error('❌ Failed to delete session:', error);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-80 bg-slate-800 font-sans transition-transform duration-300 ease-in-out md:sticky ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col border-r border-gray-700 md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 p-4 md:justify-center md:p-[20px]">
          <img src="/img/logo.png" alt="Deal Hunter" className="w-50" />
          {/* Close button - Only visible on mobile */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label="Close menu"
            className="rounded-md p-1 text-white transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-blue-400 focus:outline-none md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            + New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search chats"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-500 bg-slate-700 py-2 pr-3 pl-10 text-sm text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Your Chats Section */}
        <div className="flex-1 overflow-hidden">
          <h3 className="mb-3 px-5 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Your chats
          </h3>
          <div className="h-[calc(100vh-400px)] overflow-y-auto px-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <span className="text-sm text-gray-400">Loading...</span>
              </div>
            ) : sessionsList.length === 0 ? (
              <div className="flex justify-center py-4">
                <span className="text-sm text-gray-400">No chats yet</span>
              </div>
            ) : (
              sessionsList.map((chatItem) => (
                <ChatHistoryList
                  key={chatItem.id}
                  chatData={chatItem}
                  onDelete={handleDeleteSession}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))
            )}
          </div>
        </div>

        {/* User Profile & Settings */}
        <ProfileSettings />
      </aside>
    </>
  );
};

export default SidebarLayout;
