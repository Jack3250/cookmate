import React from "react";

function MyPageMenu() {
  return (
    <nav className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden shadow-sm">
      <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 border-b border-border-light dark:border-border-dark">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          메뉴
        </span>
      </div>
      <ul className="text-sm divide-y divide-gray-100 dark:divide-zinc-800">
        <li>
          <a
            className="flex items-center px-4 py-3 bg-green-50 dark:bg-green-900/20 text-primary border-l-4 border-primary font-medium"
            href="#"
          >
            <span className="material-icons text-base mr-3">menu_book</span>내
            레시피
          </a>
        </li>
        <li>
          <a
            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-4 border-transparent hover:border-gray-300 transition-all"
            href="#"
          >
            <span className="material-icons text-base mr-3 text-gray-400">
              bookmark
            </span>
            저장한 레시피
          </a>
        </li>
        <li>
          <a
            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-4 border-transparent hover:border-gray-300 transition-all"
            href="#"
          >
            <span className="material-icons text-base mr-3 text-gray-400">
              chat_bubble
            </span>
            내가 쓴 댓글
          </a>
        </li>
        <li>
          <a
            className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-4 border-transparent hover:border-gray-300 transition-all"
            href="#"
          >
            <span className="material-icons text-base mr-3 text-gray-400">
              settings
            </span>
            계정 설정
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default MyPageMenu;
