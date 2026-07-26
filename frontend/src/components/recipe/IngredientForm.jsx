import React from "react";

/**
 * 레시피 재료 컴포넌트
 * @param {Array} ingredients 재료 목록 배열
 * @param {Function} onIngredientChange 재료 필드 값 변경 핸들러
 * @param {Function} onAddIngredient 재료 항목 추가 핸들러
 * @param {Function} onRemoveIngredient 재료 항목 삭제 핸들러
 */
function IngredientForm({ ingredients, actions }) {
  const { onIngredientChange, onAddIngredient, onRemoveIngredient } = actions;
  return (
    <div className="bg-white dark:bg-zinc-800/30 rounded-xl border border-border-light dark:border-border-dark p-6">
      {/* 재료 섹션 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="material-icons text-secondary text-base">kitchen</span>
          <span>재료 정보 *</span>
        </h3>
        <span className="text-xs text-gray-400">
          요리에 들어가는 주재료와 양념을 적어주세요.
        </span>
      </div>

      {/* 재료 테이블 입력 헤더 */}
      <div className="space-y-3">
        <div className="flex gap-4 text-xs font-bold text-gray-400 px-1">
          <span className="flex-1">재료명</span>
          <span className="w-1/6">용량</span>
          <span className="w-1/6">단위</span>
          <span className="w-8"></span>
        </div>

        {/* 동적 재료 입력 행 목록 */}
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="예) 삼겹살, 대파, 양파"
              value={ing.ingrdNm}
              onChange={(e) => onIngredientChange(idx, "ingrdNm", e.target.value)}
              className="flex-1 rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
              required
            />
            <input
              type="text"
              placeholder="예) 300, 1/2"
              value={ing.ingrdAmt}
              onChange={(e) => onIngredientChange(idx, "ingrdAmt", e.target.value)}
              className="w-1/6 rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
              required
            />
            <input
              type="text"
              placeholder="예) g, 개, 큰술"
              value={ing.ingrdUnt}
              onChange={(e) => onIngredientChange(idx, "ingrdUnt", e.target.value)}
              className="w-1/6 rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
              required
            />
            {/* 재료 컴포넌트 삭제 버튼 */}
            <button
              type="button"
              onClick={() => onRemoveIngredient(idx)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors cursor-pointer"
            >
              <span className="material-icons text-lg">close</span>
            </button>
          </div>
        ))}
      </div>

      {/* 재료 행 추가 버튼 */}
      <button
        type="button"
        onClick={onAddIngredient}
        className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg text-primary font-bold text-sm hover:bg-green-50 dark:hover:bg-zinc-700/50 hover:border-primary transition-all flex items-center justify-center gap-1 cursor-pointer"
      >
        <span className="material-icons text-base">add</span>
        <span>재료 추가하기</span>
      </button>
    </div>
  );
}

export default IngredientForm;
