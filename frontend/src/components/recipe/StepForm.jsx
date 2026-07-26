import React from "react";

/**
 * 레시피 단계별 조리 순서 컴포넌트
 * @param {Array} steps 단계 목록 배열
 * @param {Function} onStepTextChange 단계 설명 텍스트 변경 핸들러
 * @param {Function} onStepImageChange 단계 사진 파일 변경 핸들러
 * @param {Function} onRemoveStepImage 단계 사진 파일 삭제 핸들러
 * @param {Function} onAddStep 단계 추가 핸들러
 * @param {Function} onRemoveStep 단계 삭제 핸들러
 */
function StepForm({ steps, actions }) {
  const {
    onStepTextChange,
    onStepImageChange,
    onRemoveStepImage,
    onAddStep,
    onRemoveStep,
  } = actions;

  return (
    <div>
      {/* 조리 순서 섹션 타이틀 */}
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
        <span className="material-icons text-secondary text-base">
          format_list_numbered
        </span>
        <span>조리 순서 *</span>
      </h3>

      {/* 동적 단계 입력 목록 */}
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group flex flex-col md:flex-row gap-4 bg-white dark:bg-zinc-800/30 p-4 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors relative"
          >
            {/* 단계 사진 등록/미리보기 */}
            <div className="flex-shrink-0 flex flex-col gap-2">
              <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full w-fit">
                Step {step.stepNo}
              </span>

              {step.previewUrl ? (
                <div className="relative w-full md:w-48 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700/50 flex justify-center items-center">
                  <img
                    src={step.previewUrl}
                    alt={`Step ${step.stepNo}`}
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveStepImage(idx)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                    title="사진 삭제"
                  >
                    <span className="material-icons text-xs">close</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    const input = document.getElementById(`step-image-input-${idx}`);
                    if (input) input.click();
                  }}
                  className="w-full md:w-48 aspect-[4/3] bg-gray-50 dark:bg-zinc-800 rounded-lg border border-dashed border-gray-300 dark:border-zinc-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:text-primary text-gray-400 transition-all"
                >
                  <span className="material-icons text-xl mb-1">add_a_photo</span>
                  <span className="text-[10px]">사진 등록</span>
                  <input
                    type="file"
                    id={`step-image-input-${idx}`}
                    accept="image/*"
                    onChange={(e) => onStepImageChange(idx, e)}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* 단계 설명 작성 텍스트 영역 */}
            <div className="flex-1">
              <textarea
                value={step.stepCn}
                onChange={(e) => onStepTextChange(idx, e.target.value)}
                className="w-full h-full min-h-[120px] rounded-lg border-gray-300 dark:border-zinc-600 bg-gray-50 dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary resize-none p-3 focus:outline-none"
                placeholder="조리 단계를 차례대로 알기 쉽게 적어주세요. 예) 소금 1큰술을 넣고 면을 8분간 삶아줍니다."
                required
              ></textarea>
            </div>

            {/* 단계 행 삭제 버튼 */}
            <button
              type="button"
              onClick={() => onRemoveStep(idx)}
              className="absolute top-2 right-2 w-6 h-6 text-gray-300 hover:text-red-500 rounded flex items-center justify-center transition-colors md:relative md:top-0 md:right-0 md:self-start md:mt-1 cursor-pointer"
              title="단계 삭제"
            >
              <span className="material-icons text-lg">delete</span>
            </button>
          </div>
        ))}
      </div>

      {/* 조리 순서 추가 버튼 */}
      <button
        type="button"
        onClick={onAddStep}
        className="mt-4 w-full py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm cursor-pointer"
      >
        <span className="material-icons text-lg">add_circle_outline</span>
        <span>순서 추가하기</span>
      </button>
    </div>
  );
}

export default StepForm;
