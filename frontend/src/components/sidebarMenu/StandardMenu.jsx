import React from "react";

function StandardMenu() {
  return (
    <>
      {/* 검색창 */}
      <div className="relative">
        <input
          className="w-full pl-3 pr-10 py-2 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark text-sm focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="레시피 검색..."
          type="text"
        />
        <button className="absolute right-2 top-2 text-primary">
          <span className="material-icons text-lg">search</span>
        </button>
      </div>

      {/* 네비게이션 메뉴 전체 */}
      <nav className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg py-2 shadow-sm">
        {/* 키친 라이프 */}
        <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          키친 라이프
        </div>
        <ul className="text-sm">
          <li>
            <a
              className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
              href="#"
            >
              <span className="material-icons text-sm mr-2 text-gray-400">
                star
              </span>
              필독 가이드
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
              href="#"
            >
              <span className="material-icons text-sm mr-2 text-gray-400">
                campaign
              </span>
              공지사항
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
              href="#"
            >
              <span className="material-icons text-sm mr-2 text-gray-400">
                event
              </span>
              주간 이벤트
              <span className="ml-auto text-[10px] text-white bg-red-500 px-1 rounded">
                N
              </span>
            </a>
          </li>
        </ul>
        <div className="border-t border-border-light dark:border-border-dark my-2"></div>

        {/* 레시피 북 */}
        <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          레시피 북
        </div>
        <ul className="text-sm">
          {[
            { name: "한식 요리", icon: "rice_bowl" },
            { name: "양식 요리", icon: "dinner_dining" },
            { name: "밑반찬", icon: "tapas" },
            { name: "베이킹 & 디저트", icon: "cake" },
            { name: "야식", icon: "local_bar" },
          ].map((item) => (
            <li key={item.name}>
              <a
                className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
                href="#"
              >
                <span className="material-icons text-sm mr-2 text-secondary">
                  {item.icon}
                </span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="border-t border-border-light dark:border-border-dark my-2"></div>

        {/* 커뮤니티 */}
        <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          커뮤니티
        </div>
        <ul className="text-sm">
          <li>
            <a
              className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
              href="#"
            >
              <span className="material-icons text-sm mr-2 text-gray-400">
                forum
              </span>
              자유게시판
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
              href="#"
            >
              <span className="material-icons text-sm mr-2 text-gray-400">
                help
              </span>
              질문 & 답변
            </a>
          </li>
        </ul>
      </nav>

      {/* 인기 키워드 태그 */}
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm text-sm">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <span className="material-icons text-primary text-base">
            trending_up
          </span>{" "}
          인기 키워드
        </h3>
        <div className="flex flex-wrap gap-2">
          {["#사워도우", "#비건", "#밀프렙", "#에어프라이어"].map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default StandardMenu;
