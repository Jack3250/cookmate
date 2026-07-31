import React from 'react';
import { useConfirmStore } from '../../stores/useConfirmStore';

function ConfirmModal() {
  const { isOpen, message, confirm, cancel } = useConfirmStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-[90%] max-w-sm p-6 transform transition-all animate-[fadeIn_0.2s_ease-out]"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mb-4">
            <span className="material-icons text-3xl">help_outline</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            확인
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-wrap">
            {message}
          </p>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={cancel}
            className="flex-1 py-2.5 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            onClick={confirm}
            className="flex-1 py-2.5 rounded-lg font-medium bg-primary hover:bg-green-600 text-white transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
