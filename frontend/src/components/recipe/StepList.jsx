import React from 'react';

/**
 * 레시피 상세 - 조리 순서 영역 (반복되는 단계별 UI 렌더링)
 */
function StepList({ steps }) {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-1">
        <span className="material-icons text-primary">restaurant_menu</span>
        조리 순서
      </h3>
      <div className="space-y-8">
        {steps && steps.length > 0 ? (
          steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-6 bg-white dark:bg-zinc-800/30 p-5 rounded-xl border border-border-light dark:border-border-dark hover:border-gray-300 dark:hover:border-zinc-600 transition-colors">

              {/* 단계 표시 원형 라벨 */}
              <div className="flex-shrink-0 flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white font-black flex items-center justify-center text-sm shadow-sm">
                  {step.stepNo}
                </div>
              </div>

              {/* 단계 설명 텍스트 */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {step.stepCn}
                </p>
              </div>

              {/* 단계별 이미지 */}
              {step.stepImageUrls && step.stepImageUrls.length > 0 && (
                <div className="flex-shrink-0 w-full md:w-48 aspect-[4/3] rounded-lg overflow-hidden border border-border-light dark:border-border-dark bg-gray-50 dark:bg-zinc-700 flex justify-center items-center shadow-sm">
                  <img
                    alt={`조리 단계 ${step.stepNo}`}
                    src={step.stepImageUrls[0]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 text-center py-10">등록된 조리 설명 단계가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

export default StepList;
