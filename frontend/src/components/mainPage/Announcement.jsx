import React from 'react'

function Announcement() {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded p-3 mb-6 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">공지</span>
        <span className="truncate text-gray-700 dark:text-gray-300">[중요] 월간 "베스트 쉐프" 경연 대회 규칙 업데이트</span>
      </div>
      <span className="text-gray-400 text-xs whitespace-nowrap">2023.10.27</span>
    </div>
  );
}

export default Announcement