import React from 'react';

/**
 * 공통 좋아요 버튼 컴포넌트
 * @param {boolean} isLiked 좋아요 여부
 * @param {number} likeCnt 좋아요 수
 * @param {function} onClick 클릭 핸들러
 * @param {string} size 버튼 크기 ('sm', 'md', 'lg') 기본값: 'lg'
 */
function LikeButton({ isLiked, likeCnt, onClick, size = 'lg' }) {
  // 사이즈별 스타일 정의
  const sizeStyles = {
    sm: {
      button: 'w-12 h-12',
      icon: 'text-xl mb-0.5',
      text: 'text-xs',
    },
    md: {
      button: 'w-16 h-16',
      icon: 'text-2xl mb-1',
      text: 'text-sm',
    },
    lg: {
      button: 'w-20 h-20',
      icon: 'text-3xl mb-1',
      text: 'text-sm',
    }
  };

  const currentSize = sizeStyles[size] || sizeStyles.lg;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-full transition-all duration-300 shadow-sm border-2 ${currentSize.button} ${
        isLiked
          ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/50 hover:bg-red-100'
          : 'bg-white border-gray-200 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700'
      }`}
    >
      <span className={`material-icons transition-colors ${currentSize.icon} ${
        isLiked ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
      }`}>
        {isLiked ? 'favorite' : 'favorite_border'}
      </span>
      <span className={`font-bold ${currentSize.text} ${
        isLiked ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
      }`}>
        {likeCnt || 0}
      </span>
    </button>
  );
}

export default LikeButton;
