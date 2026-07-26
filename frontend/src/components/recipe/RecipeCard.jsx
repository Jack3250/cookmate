import React from 'react';
import useCodeStore from '../../stores/useCodeStore';

/**
 * 공통 레시피 카드 컴포넌트
 * @param {Object} recipe 레시피 요약 데이터 객체
 * @param {Function} onClick 카드 클릭 이벤트 핸들러
 */
function RecipeCard({ recipe, onClick }) {
  // 코드 목록 가져오기
  const getCodeName = useCodeStore((state) => state.getCodeName);

  /**
   * 난이도 뱃지 스타일 정의
   * @param {string} code 난이도 코드
   */
  const getDifficultyBadgeStyle = (code) => {
    switch (code) {
      case '02': // 초급
        return 'bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300';
      case '03': // 중급
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case '04': // 고급
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300';
      case '05': // 신의경지
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
      default: // 아무나 (01)
        return 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-300';
    }
  };

  return (
    <article
      onClick={onClick}
      className="group bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border border-border-light dark:border-border-dark hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      {/* 메인 이미지 영역 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-zinc-700">
        {recipe.mainImageUrl ? (
          <img
            alt={recipe.dishNm}
            src={recipe.mainImageUrl}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* 기본 대체 이미지 */
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 dark:text-zinc-600">
            <span className="material-icons text-5xl">broken_image</span>
            <span className="text-[10px] mt-1">이미지가 없습니다</span>
          </div>
        )}

        {/* 좋아요 및 조회수 표시 뱃지 */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-2 shadow-sm">
          <div className="flex items-center gap-0.5">
            <span className="material-icons text-secondary text-xs">favorite</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
              {recipe.likeCnt || 0}
            </span>
          </div>
          <span className="text-gray-300 dark:text-zinc-600 text-[10px]">|</span>
          <div className="flex items-center gap-0.5">
            <span className="material-icons text-gray-400 text-xs">visibility</span>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
              {recipe.viewCnt || 0}
            </span>
          </div>
        </div>
      </div>

      {/* 카드 본문 콘텐츠 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span
              className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${getDifficultyBadgeStyle(
                recipe.recipeDifficultCd
              )}`}
            >
              {getCodeName('RECIPE_DIFFICULT_CD', recipe.recipeDifficultCd)}
            </span>
            <span className="text-[9px] bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              {getCodeName('CATEGORY_CD', recipe.categoryCd)}
            </span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base mb-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {recipe.recipeTtl}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            요리: {recipe.dishNm}
          </p>
        </div>

        {/* 작성 정보 및 등록일 */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light dark:border-border-dark text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              <span className="material-icons text-gray-400 text-sm">person</span>
            </div>
            <span>{recipe.writerName || '익명 요리사'}</span>
          </div>
          <span>
            {recipe.regDt ? recipe.regDt.substring(0, 10) : ''}
          </span>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
