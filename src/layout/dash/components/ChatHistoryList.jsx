// ChatHistoryList.jsx
// Delete operates on localStorage (no backend endpoint)

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedChatId } from '../../../features/chat/aiChatSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/Helper';
import { MoreVertical, Trash2 } from 'lucide-react';
import { showDeleteConfirmation } from './Deleteconfirmationtoast';

const ChatHistoryList = ({ chatData, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    dispatch(setSelectedChatId(chatData.id));
    navigate(`/dash/gpt/${chatData.id}`);
    setShowMenu(false);
  };

  const isActive = chatId === chatData.id;

  // ===================================================
  // HANDLE DELETE (localStorage only)
  // ===================================================
  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowMenu(false);

    try {
      const confirmed = await showDeleteConfirmation({
        title: 'Delete chat?',
        message: 'Are you sure you want to delete this chat?',
        yesText: 'Delete',
        noText: 'Cancel',
        icon: 'delete'
      });

      if (!confirmed) return;

      // Call parent's delete handler
      onDelete(chatData.id);

      // If deleting current chat, navigate to new chat
      if (chatId === chatData.id) {
        dispatch(setSelectedChatId(null));
        navigate('/dash/gpt', { replace: true });
      }

      console.log('✅ Session deleted from localStorage');
    } catch (error) {
      console.error('Failed to delete session:', error);
      alert('Failed to delete chat. Please try again.');
    }
  };

  return (
    <div className="relative min-w-0 flex-1 group mb-1">
      <div
        onClick={handleClick}
        className={`${
          isActive ? 'bg-slate-600' : 'hover:bg-slate-900'
        } flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <p className="truncate text-sm text-gray-400">{chatData.title}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="ml-2 shrink-0 text-xs text-gray-500">
            {formatDate(chatData.lastMessageAt)}
          </p>

          {/* Menu Button - Shows on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-slate-700 transition-opacity"
          >
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-2 top-full mt-1 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2 rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatHistoryList;