import React, { useState } from "react";
import useCodeStore from "../../stores/useCodeStore";

/**
 * 레시피 상단 검색 및 접이식 필터 컴포넌트
 */
function RecipeSearchFilter({
  formState,
  updateFormState,
  queryState,
  updateQueryState,
  onSearch,
  onResetFilter,
}) {
  const getCodeList = useCodeStore((state) => state.getCodeList);
  const [isFilterOpen, setIsFilterOpen] = useState(true); // 필터 접기/펼치기 상태

  // 엔터 입력 이벤트
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  // 추천 검색어 클릭 이벤트
  const handleTagClick = (tag) => {
    const keyword = tag.replace("#", "");
    updateFormState({ searchInput: keyword });
    onSearch(keyword);
  };

  return (
    <div className="mb-6">
      {/* 상단 대형 검색 바 및 추천 검색어 */}
      <div className="mb-6">
        <div className="relative w-full mb-3">
          <input
            type="text"
            placeholder="요리명, 재료명, 해시태그로 검색해보세요"
            value={formState.searchInput}
            onChange={(e) => updateFormState({ searchInput: e.target.value })}
            onKeyDown={handleKeyDown}
            className="w-full pl-5 pr-14 py-3.5 border-2 border-primary rounded-lg focus:outline-none focus:ring-0 focus:border-green-600 bg-white dark:bg-zinc-800 dark:text-gray-100 placeholder-gray-400 transition-colors shadow-sm text-base"
          />
          <button
            onClick={() => onSearch()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-orange-600 transition-colors cursor-pointer"
          >
            <span className="material-icons text-3xl">search</span>
          </button>
        </div>

        {/* 추천 검색어 태그 */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pl-1">
          <span className="text-xs font-bold mr-1 text-primary">추천 검색어</span>
          {["#에어프라이어", "#쉬운베이킹", "#저녁메뉴", "#캠핑요리", "#아이간식"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-xs font-medium cursor-pointer"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      {/* 필터 접기, 펼치기 / 정렬 순서 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-border-light dark:border-border-dark gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="group flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-all shadow-xs cursor-pointer"
          >
            <span>{isFilterOpen ? "필터 접기" : "필터 펼치기"}</span>
            <span className="material-icons text-sm group-hover:text-primary">
              {isFilterOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
        </div>

        {/* 정렬 유형 선택 */}
        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
          <button
            onClick={() => updateQueryState({ sortType: "latest", page: 1 })}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${queryState.sortType === "latest"
              ? "font-bold text-primary"
              : "hover:text-gray-800 dark:hover:text-gray-200"
              }`}
          >
            {queryState.sortType === "latest" && (
              <span className="material-icons text-sm">check</span>
            )}
            최신순
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => updateQueryState({ sortType: "popular", page: 1 })}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${queryState.sortType === "popular"
              ? "font-bold text-primary"
              : "hover:text-gray-800 dark:hover:text-gray-200"
              }`}
          >
            {queryState.sortType === "popular" && (
              <span className="material-icons text-sm">check</span>
            )}
            인기순
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => updateQueryState({ sortType: "views", page: 1 })}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${queryState.sortType === "views"
              ? "font-bold text-primary"
              : "hover:text-gray-800 dark:hover:text-gray-200"
              }`}
          >
            {queryState.sortType === "views" && (
              <span className="material-icons text-sm">check</span>
            )}
            조회수순
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => updateQueryState({ sortType: "comment", page: 1 })}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${queryState.sortType === "comment"
              ? "font-bold text-primary"
              : "hover:text-gray-800 dark:hover:text-gray-200"
              }`}
          >
            {queryState.sortType === "comment" && (
              <span className="material-icons text-sm">check</span>
            )}
            댓글순
          </button>
        </div>
      </div>

      {/* 접이식 필터 박스 */}
      {isFilterOpen && (
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-5 mb-6 border border-border-light dark:border-border-dark transition-all">
          <div className="flex flex-col gap-4">
            {/* 1행 박스 */}
            <div className="flex flex-wrap items-center gap-6">
              {/* 조리 난이도 셀렉트박스 */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  조리 난이도
                </label>
                <select
                  value={formState.recipeDifficultCd}
                  onChange={(e) => updateFormState({ recipeDifficultCd: e.target.value })}
                  className="w-24 form-select rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs py-1.5 px-2.5 text-gray-700 dark:text-gray-200 focus:border-primary focus:ring-primary focus:outline-none cursor-pointer"
                >
                  <option value="">전체</option>
                  {getCodeList("RECIPE_DIFFICULT_CD").map((code) => (
                    <option key={code.cd} value={code.cd}>
                      {code.cdNm}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* 2행 박스 */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-200 dark:border-zinc-700">
              {/* 작성일 기준 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  작성일 기준
                </span>
                <div className="flex bg-white dark:bg-zinc-800 rounded-lg border border-border-light dark:border-border-dark p-0.5 whitespace-nowrap">
                  {[
                    { label: "전체", value: "" },
                    { label: "1일", value: "1D" },
                    { label: "1주", value: "1W" },
                    { label: "1개월", value: "1M" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="date_range"
                        value={option.value}
                        checked={formState.dateRange === option.value}
                        onChange={(e) => updateFormState({ dateRange: e.target.value })}
                        className="sr-only peer"
                      />
                      <span className="px-2.5 py-1 rounded text-xs text-gray-500 peer-checked:bg-green-100 peer-checked:text-primary dark:peer-checked:bg-green-900 dark:peer-checked:text-green-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-700 block font-medium whitespace-nowrap">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 목록 출력 수 셀렉트박스 */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  목록 출력 수
                </label>
                <select
                  value={formState.pageSize || 9}
                  onChange={(e) => updateFormState({ pageSize: Number(e.target.value) })}
                  className="w-16 form-select rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs py-1.5 px-2.5 text-gray-700 dark:text-gray-200 focus:border-primary focus:ring-primary focus:outline-none cursor-pointer font-medium"
                >
                  <option value={6}>6개</option>
                  <option value={9}>9개</option>
                  <option value={12}>12개</option>
                  <option value={15}>15개</option>
                </select>
              </div>

              {/* 검색 및 초기화 버튼 세트 */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => onSearch()}
                  className="bg-secondary hover:bg-orange-600 text-white font-bold py-1 px-3.5 rounded-lg shadow-xs transition-all text-xs flex items-center justify-center gap-1 cursor-pointer h-[32px]"
                >
                  <span className="material-icons text-sm">search</span>
                  <span>검색</span>
                </button>
                <button
                  onClick={onResetFilter}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 transition-colors px-2.5 py-1 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 cursor-pointer h-[32px]"
                >
                  <span className="material-icons text-sm">refresh</span>
                  <span>초기화</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeSearchFilter;
