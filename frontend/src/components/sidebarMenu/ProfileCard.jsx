import React from 'react';

function ProfileCard() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 border-b border-border-light dark:border-border-dark pb-2 flex justify-between">
        {/* '카페 정보' -> '쉐프 프로필'로 변경 */}
        <span className="font-bold">쉐프 프로필</span>
        <span className="text-primary cursor-pointer hover:underline">
          나의 활동
        </span>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-primary overflow-hidden">
          <span className="material-icons">person</span>
        </div>
        <div>
          <div className="font-bold text-sm">손님 쉐프</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            등급: 새내기
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
        <div className="bg-background-light dark:bg-zinc-800 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">방문</div>
          <div className="font-bold">0</div>
        </div>
        <div className="bg-background-light dark:bg-zinc-800 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">게시글</div>
          <div className="font-bold">0</div>
        </div>
      </div>

      <button className="w-full bg-primary hover:bg-green-600 text-white font-bold py-2 rounded text-sm transition-colors flex items-center justify-center gap-2">
        <span className="material-icons text-sm">edit</span> 레시피 작성하기
      </button>
    </div>
  );
}

export default ProfileCard;