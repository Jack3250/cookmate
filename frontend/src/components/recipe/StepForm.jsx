import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * 
 */
/**
 * 드래그 앤 드롭 가능한 개별 단계 행 컴포넌트
 * @param {*} step 레시피 단계 정보
 * @param {*} idx 단계 인덱스
 * @param {*} actions 액션 함수들
 * @returns 
 */
function SortableStepRow({ step, idx, actions }) {
  const {
    onStepTextChange,
    onStepImageChange,
    onRemoveStepImage,
    onRemoveStep,
  } = actions;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex flex-col md:flex-row gap-4 bg-white dark:bg-zinc-800/30 p-4 rounded-xl border ${isDragging ? 'border-primary shadow-lg shadow-primary/20' : 'border-border-light dark:border-border-dark'} hover:border-primary/50 transition-colors relative`}
    >
      {/* 드래그 핸들 (좌측 중앙이나 상단 등에 배치할 수 있음, 여기서는 Step 배지 좌측에 배치) */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-primary transition-colors z-10 hidden md:flex"
        title="드래그하여 순서 변경"
      >
        <span className="material-icons text-xl">drag_indicator</span>
      </div>

      {/* 단계 사진 등록/미리보기 (모바일에서는 핸들이 없으므로 전체 컨텐츠 좌측 여백 추가) */}
      <div className="flex-shrink-0 flex flex-col gap-2 md:ml-6">
        <div className="flex items-center gap-2">
          {/* 모바일용 드래그 핸들 */}
          <div
            {...attributes}
            {...listeners}
            className="md:hidden flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-primary transition-colors"
          >
            <span className="material-icons text-xl">drag_indicator</span>
          </div>
          <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full w-fit">
            Step {step.stepNo}
          </span>
        </div>

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
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag-over"); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove("drag-over"); }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("drag-over");
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                onStepImageChange(idx, { target: { files: e.dataTransfer.files } });
              }
            }}
            className="w-full md:w-48 aspect-[4/3] bg-gray-50 dark:bg-zinc-800 rounded-lg border border-dashed border-gray-300 dark:border-zinc-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:text-primary text-gray-400 transition-all group-hover:border-primary"
          >
            <span className="material-icons text-xl mb-1 pointer-events-none group-hover:scale-110 transition-transform">add_a_photo</span>
            <span className="text-[10px] pointer-events-none">사진 등록</span>
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

      {/* 단계 행 삭제 버튼 영역 (이동 버튼 제거) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 md:relative md:top-0 md:right-0 md:self-start md:mt-1 md:shadow-none md:border-none md:bg-transparent md:flex-col">
        <button
          type="button"
          onClick={() => onRemoveStep(idx)}
          className="w-7 h-7 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex items-center justify-center transition-colors cursor-pointer"
          title="단계 삭제"
        >
          <span className="material-icons text-lg">delete</span>
        </button>
      </div>
    </div>
  );
}

/**
 * 레시피 단계별 조리 순서 컴포넌트
 * @param {Array} steps 단계 목록 배열
 * @param {Object} actions 액션 함수들
 */
function StepForm({ steps, actions }) {
  const { onAddStep, onMoveStep } = actions;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 이동해야 드래그 시작 (클릭과 구분)
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((item) => item.id === active.id);
      const newIndex = steps.findIndex((item) => item.id === over.id);
      onMoveStep(oldIndex, newIndex);
    }
  };

  return (
    <div>
      {/* 조리 순서 섹션 타이틀 */}
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
        <span className="material-icons text-secondary text-base">
          format_list_numbered
        </span>
        <span>조리 순서 *</span>
      </h3>

      {/* 동적 단계 입력 목록 (dnd-kit 적용) */}
      <div className="space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={steps.map(step => step.id)}
            strategy={verticalListSortingStrategy}
          >
            {steps.map((step, idx) => (
              <SortableStepRow
                key={step.id}
                step={step}
                idx={idx}
                actions={actions}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* 조리 순서 추가 버튼 */}
      <button
        type="button"
        onClick={onAddStep}
        className="mt-6 w-full py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm cursor-pointer"
      >
        <span className="material-icons text-lg">add_circle_outline</span>
        <span>순서 추가하기</span>
      </button>
    </div>
  );
}

export default StepForm;
