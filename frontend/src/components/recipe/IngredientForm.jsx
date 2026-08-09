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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * 드래그 앤 드롭 가능한 재료 행 컴포넌트
 * @param {Object} param0.ing 재료 객체
 * @param {number} param0.idx 재료 인덱스
 * @param {Object} param0.actions 관련 액션 함수 객체
 * @returns {JSX.Element}
 */
function SortableIngredientRow({ ing, idx, actions }) {

  // 재료 수정, 재료 삭제
  const { onIngredientChange, onRemoveIngredient } = actions;

  const {
    attributes,  // 접근성(aria 등) 속성
    listeners,   // 드래그 이벤트를 감지하는 리스너 (onPointerDown 등)
    setNodeRef,  // 드래그 가능한 DOM 요소를 dnd-kit에 등록하는 ref
    transform,   // 현재 드래그 중인 위치 변화값 (x, y 좌표)
    transition,  // 드래그 후 원래 자리로 돌아가거나 스왑될 때의 애니메이션
    isDragging   // 현재 이 요소가 드래그 중인지 여부 (스타일링에 사용)
  } = useSortable({ id: ing.id });

  // 드래그 중일 때 렌더링될 스타일 정의
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    // setNodeRef를 최상위 요소에 연결하여 이 div 전체가 이동할 수 있게 함
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-2 -mx-2 rounded-lg" >
      {/* 손잡이 : 이 요소에만 attributes와 listeners를 부여하면, "점 6개"를 잡고 끌 때만 드래그가 시작 */}
      <div
        {...attributes}
        {...listeners}
        className="w-8 flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-primary transition-colors"
        title="드래그하여 순서 변경"
      >
        <span className="material-icons text-xl">drag_indicator</span>
      </div>
      <input
        type="text"
        placeholder="예) 삼겹살, 대파, 양파"
        value={ing.ingrdNm}
        onChange={(e) => onIngredientChange(idx, "ingrdNm", e.target.value)}
        className="flex-1 px-3 rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
        required
      />
      <input
        type="text"
        placeholder="예) 300, 1/2"
        value={ing.ingrdAmt}
        onChange={(e) => onIngredientChange(idx, "ingrdAmt", e.target.value)}
        className="w-1/6 px-3 rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
        required
      />
      <input
        type="text"
        placeholder="예) g, 개, 큰술"
        value={ing.ingrdUnt}
        onChange={(e) => onIngredientChange(idx, "ingrdUnt", e.target.value)}
        className="w-1/6 px-3 rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
        required
      />
      {/* 재료 컴포넌트 삭제 버튼 */}
      <button
        type="button"
        onClick={() => onRemoveIngredient(idx)}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors cursor-pointer"
        title="재료 삭제"
      >
        <span className="material-icons text-lg">close</span>
      </button>
    </div >
  );
}

/**
 * 레시피 재료 컴포넌트
 * @param {Array} ingredients 재료 목록 배열
 * @param {Object} actions 관련 액션(추가, 삭제, 수정, 순서이동) 함수 객체
 */
function IngredientForm({ ingredients, actions }) {
  const { onAddIngredient, onMoveIngredient } = actions;

  // 센서 설정: 사용자의 어떤 입력을 드래그로 인식할지 정의
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 드래그해야 시작되도록 하여 클릭과 구분
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates, // 키보드 화살표로 드래그
    })
  );

  // 드래그가 끝났을 때 호출되는 함수
  const handleDragEnd = (event) => {
    const { active, over } = event; // active: 드래그 시작된 요소, over: 드래그 끝난 요소

    if (over && active.id !== over.id) { // 만약 드래그 대상(over)이 있고, 시작된 요소와 끝난 요소가 다르다면
      const oldIndex = ingredients.findIndex((item) => item.id === active.id); // 시작된 요소의 인덱스 찾기
      const newIndex = ingredients.findIndex((item) => item.id === over.id); // 끝난 요소의 인덱스 찾기
      onMoveIngredient(oldIndex, newIndex); // 순서 변경 함수 호출
    }
  };

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
      <div className="space-y-1">
        <div className="flex gap-3 text-xs font-bold text-gray-400 px-1 mb-2">
          <span className="w-8 text-center">순서</span>
          <span className="flex-1 ml-1">재료명</span>
          <span className="w-1/6 ml-2">용량</span>
          <span className="w-1/6 ml-2">단위</span>
          <span className="w-8"></span>
        </div>

        {/* 드래그 드롭 활성화 영역 지정 */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter} // 가장 가까운 요소를 대상으로 처리
          onDragEnd={handleDragEnd} // 드래그가 끝났을 때 호출될 함수
        >
          <SortableContext
            items={ingredients.map(ing => ing.id)} // 드래그 가능한 아이템 목록
            strategy={verticalListSortingStrategy} // 수직 방향 정렬
          >
            {ingredients.map((ing, idx) => (
              <SortableIngredientRow
                key={ing.id}
                ing={ing}
                idx={idx}
                actions={actions}
              />
            ))}
          </SortableContext>
        </DndContext>
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
