import React from "react";

/**
 * 공통 페이지네이션 UI 컴포넌트
 * @param {Number} currentPage 현재 페이지 번호
 * @param {Number} totalPageCount 전체 페이지 개수
 * @param {Function} onPageChange 페이지 변경 이벤트 핸들러
 */
function Pagination({ currentPage = 1, totalPageCount = 1, onPageChange }) {
  // 전체 페이지 수가 1 이하인 경우 노출하지 않거나 최소화
  if (totalPageCount <= 1) {
    //return null;
  }

  // 표시할 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPageCount, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        <span className="material-icons text-sm">chevron_left</span>
        <span>이전</span>
      </button>

      {/* 첫 페이지 이동 (필요 시) */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 text-xs font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-1 text-xs text-gray-400">...</span>
          )}
        </>
      )}

      {/* 페이지 번호 리스트 */}
      {pageNumbers.map((pageNum) => {
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${isActive
              ? "bg-primary text-white border border-primary shadow-primary/20 shadow-md"
              : "border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
              }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 마지막 페이지 이동 (필요 시) */}
      {pageNumbers[pageNumbers.length - 1] < totalPageCount && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPageCount - 1 && (
            <span className="px-1 text-xs text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPageCount)}
            className="w-8 h-8 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 text-xs font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
          >
            {totalPageCount}
          </button>
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPageCount}
        className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        <span>다음</span>
        <span className="material-icons text-sm">chevron_right</span>
      </button>
    </div>
  );
}

export default Pagination;
