import React from 'react';

/**
 * 레시피 상세 - 재료 목록 영역 (반응형 2열 표 렌더링)
 */
function IngredientList({ ingredients }) {
  return (
    <section className="mb-10">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-1">
        <span className="material-icons text-primary">shopping_basket</span>
        필요한 재료
      </h3>
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 shadow-sm">
        {ingredients && ingredients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            {/* 테이블 헤더 (PC: 2열 모두 표시, 모바일: 1열만 표시) */}
            <div className="hidden md:flex bg-gray-100 dark:bg-zinc-800">
              <div className="w-3/4 px-4 py-2.5 text-center font-bold text-gray-500 dark:text-gray-400 text-sm border-r border-gray-200 dark:border-zinc-700">재료</div>
              <div className="w-1/4 px-4 py-2.5 text-center font-bold text-gray-500 dark:text-gray-400 text-sm">양</div>
            </div>
            <div className="flex bg-gray-100 dark:bg-zinc-800">
              <div className="w-3/4 px-4 py-2.5 text-center font-bold text-gray-500 dark:text-gray-400 text-sm border-r border-gray-200 dark:border-zinc-700">재료</div>
              <div className="w-1/4 px-4 py-2.5 text-center font-bold text-gray-500 dark:text-gray-400 text-sm">양</div>
            </div>

            {/* 실제 데이터 */}
            {ingredients.map((ing, idx) => (
              <div 
                key={idx} 
                className="flex bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-default"
              >
                {/* 재료명 */}
                <div className="w-3/4 px-4 py-3 font-bold text-gray-800 dark:text-gray-100 text-sm flex items-center justify-center border-r border-gray-200 dark:border-zinc-700">
                  {ing.ingrdNm}
                </div>
                {/* 용량 및 단위 */}
                <div className="w-1/4 px-4 py-3 text-gray-700 dark:text-gray-300 text-sm flex items-center justify-center font-medium">
                  {ing.ingrdAmt}{ing.ingrdUnt}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 py-8">
            <p className="text-sm text-gray-400 text-center">등록된 재료 정보가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default IngredientList;
