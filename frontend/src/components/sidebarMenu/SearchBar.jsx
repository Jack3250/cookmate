import React from "react";

/**
 * 사이드바 레시피 검색창 컴포넌트
 */
function SearchBar() {
  return (
    <div className="relative">
      <input
        className="w-full pl-3 pr-10 py-2 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark text-sm focus:ring-1 focus:ring-primary focus:border-primary"
        placeholder="레시피 검색..."
        type="text"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary flex items-center justify-center">
        <span className="material-icons text-lg">search</span>
      </button>
    </div>
  );
}

export default SearchBar;
