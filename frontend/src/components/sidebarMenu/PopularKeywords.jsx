import React from "react";

/**
 * 사이드바 인기 키워드 태그 컴포넌트
 */
function PopularKeywords() {
  const keywords = ["#사워도우", "#비건", "#밀프렙", "#에어프라이어"];

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 shadow-sm text-sm">
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <span className="material-icons text-primary text-base">
          trending_up
        </span>{" "}
        인기 키워드
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PopularKeywords;
