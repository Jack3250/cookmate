import React from 'react';

/**
 * 레시피 상세 - 상단 헤더 영역 (카테고리, 제목, 작성자, 메타 정보 등)
 */
function RecipeHeader({ recipe, getCodeName, onEdit, onDelete }) {
  if (!recipe) return null;

  return (
    <>
      {/* 카테고리 표시 경로 (공통코드 데이터 적용) */}
      <div className="text-sm text-primary font-bold mb-3 flex items-center gap-1">
        레시피 북
        <span className="material-icons text-sm text-gray-400">chevron_right</span>
        {getCodeName('CATEGORY_CD', recipe.categoryCd)}
      </div>

      {/* 헤더 영역 (제목, 작성자 정보 및 관리 버튼) */}
      <header className="mb-8 border-b border-border-light dark:border-border-dark pb-6">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {recipe.recipeTtl}
          </h1>

          {/* 하드코딩 상태이므로 수정/삭제 버튼을 상시 노출하여 편리하게 조작할 수 있도록 함 */}
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 text-xs font-bold rounded transition-colors flex items-center gap-1"
            >
              <span className="material-icons text-sm">edit</span>
              수정
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold rounded transition-colors flex items-center gap-1"
            >
              <span className="material-icons text-sm">delete</span>
              삭제
            </button>
          </div>
        </div>

        {/* 상세 메타 정보 (작성자, 작성일, 조회수 등) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-border-light dark:border-border-dark shadow-sm flex items-center justify-center">
              <span className="material-icons text-gray-400 text-2xl">person</span>
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                {recipe.writerName || '익명 요리사'}
              </div>
              <div className="text-[12px] text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                <span>{recipe.regDt ? recipe.regDt.substring(0, 16).replace('T', ' ') : ''}</span>
                <span className="w-0.5 h-3 bg-gray-300 dark:bg-zinc-700"></span>
                <span>조회 {recipe.viewCnt || 0}</span>
              </div>
            </div>
          </div>

          {/* 부가 메타 정보 (요리시간, 난이도 등 - 공통코드 데이터 적용) */}
          <div className="flex gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="material-icons text-base text-secondary">schedule</span>
              시간: {recipe.cookingTime}분
            </span>
            <span className="flex items-center gap-1">
              <span className="material-icons text-base text-secondary">signal_cellular_alt</span>
              난이도: {getCodeName('RECIPE_DIFFICULT_CD', recipe.recipeDifficultCd)}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default RecipeHeader;
