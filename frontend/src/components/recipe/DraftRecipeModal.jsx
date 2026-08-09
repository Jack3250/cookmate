import React from 'react';

export default function DraftRecipeModal({ drafts, onClose, onLoad, onDelete, onWriteNew }) {
  // 날짜 포맷팅 헬퍼
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${MM}.${dd}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/30" id="recipe-modal">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-fade-in-up border border-gray-200 dark:border-zinc-700">
        <div className="bg-primary/5 p-6 text-center border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-icons text-primary text-2xl">restaurant_menu</span>
            <span className="font-bold text-xl text-primary">CookMate</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">레시피 작성을 시작하시겠습니까?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">멋진 요리 아이디어를 공유해주세요!</p>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* 새로 작성하기 버튼 */}
          <button 
            type="button"
            onClick={onWriteNew}
            className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl hover:border-secondary hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all h-full text-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="material-icons text-4xl">add</span>
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-gray-200">새로 작성하기</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">새로운 레시피를 처음부터 작성합니다</p>
          </button>

          {/* 임시저장 목록 */}
          <div className="flex flex-col h-full max-h-[300px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="material-icons text-gray-400 text-sm">save</span>
                임시 저장된 글
              </h3>
              <span className="bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {drafts.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 space-y-2 mb-3 border border-gray-200 dark:border-zinc-700">
              {drafts.map((draft) => (
                <div key={draft.recipeId} className="w-full flex items-start bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 hover:border-primary hover:shadow-sm transition-all group relative pr-8">
                  <button 
                    type="button"
                    onClick={() => onLoad(draft.recipeId)}
                    className="flex-1 text-left p-2.5 outline-none overflow-hidden"
                  >
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary truncate mb-1">
                      {draft.recipeTtl || draft.dishNm || '제목 없는 레시피'}
                    </div>
                    <div className="text-[10px] text-gray-400 flex justify-between">
                      <span>{formatDate(draft.regDt)} 저장됨</span>
                      <span className="text-primary group-hover:underline">불러오기</span>
                    </div>
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(draft.recipeId);
                    }}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors p-1" 
                    title="삭제"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900/50 px-6 py-4 flex justify-center border-t border-gray-200 dark:border-zinc-700">
          <button 
            type="button"
            onClick={onClose}
            className="px-8 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm font-bold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
