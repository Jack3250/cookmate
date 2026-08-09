import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeList } from "../../hooks/useRecipeList";
import RecipeCard from "../../components/recipe/RecipeCard";
import Pagination from "../../components/common/Pagination";
import RecipeSearchFilter from "../../components/recipe/RecipeSearchFilter";
import DraftRecipeModal from "../../components/recipe/DraftRecipeModal";
import { selectTempRecipeList, deleteRecipeInfo } from "../../api/recipeApi";
import { gfnConfirm } from "../../utils/confirmUtils";
import { gfnToast } from "../../utils/toastUtils";

/**
 * 레시피 목록 메인 페이지
 * (검색 버튼 클릭 시에만 API 조회가 실행되는 구조)
 */
function RecipeListPage() {
  const {
    formState // 임시 검색 조건
    , queryState // 실제 검색 조건
    , pageData // 페이징 정보 및 레시피 목록
    , updateFormState // 임시 검색 조건 업데이트
    , updateQueryState // 실제 검색 조건 업데이트
    , handleSearch // 검색
    , handleResetFilter // 초기화
    , getCategoryTitle // 카테고리 이름 가져오기
  } = useRecipeList();

  const navigate = useNavigate();

  const { recipes, totalCount, totalPageCount, loading } = pageData;

  const [drafts, setDrafts] = useState([]);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const handleWriteClick = async () => {
    try {
      const res = await selectTempRecipeList();
      if (res && res.length > 0) {
        setDrafts(res);
        setShowDraftModal(true);
      } else {
        navigate("/recipes/write");
      }
    } catch (err) {
      console.error("Failed to fetch drafts:", err);
      // 에러 발생 (비로그인 등) 시 작성 페이지로 바로 이동하여 권한 체크를 받도록 함
      navigate("/recipes/write");
    }
  };

  const handleDeleteDraft = async (recipeId) => {
    if (await gfnConfirm("confirm.delete", ["임시저장 레시피"])) { // 정말로 이 {0}를 삭제하시겠습니까?
      try {
        await deleteRecipeInfo(recipeId);
        setDrafts((prev) => {
          const next = prev.filter((d) => d.recipeId !== recipeId);
          if (next.length === 0) setShowDraftModal(false);
          return next;
        });
        gfnToast("common.success.delete", ["임시저장 레시피"]); // {0}이(가) 성공적으로 삭제되었습니다.
      } catch (e) {
        console.error("Failed to delete draft:", e);
      }
    }
  };

  return (
    <>
      {showDraftModal && (
        <DraftRecipeModal
          drafts={drafts}
          onClose={() => setShowDraftModal(false)}
          onWriteNew={() => {
            setShowDraftModal(false);
            navigate("/recipes/write");
          }}
          onLoad={(recipeId) => {
            setShowDraftModal(false);
            navigate(`/recipes/edit/${recipeId}`);
          }}
          onDelete={handleDeleteDraft}
        />
      )}
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 min-h-[600px] relative">
        {/* 메인 헤더 및 레시피 수 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {getCategoryTitle()}
            </h2>
            <span className="bg-green-100 dark:bg-green-900/40 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
              {totalCount}개의 맛있는 요리
            </span>
          </div>
        </div>

        {/* 검색 및 상세 필터 컴포넌트 */}
        <RecipeSearchFilter
          formState={formState}
          updateFormState={updateFormState}
          queryState={queryState}
          updateQueryState={updateQueryState}
          onSearch={handleSearch}
          onResetFilter={handleResetFilter}
        />

        {/* 데이터 로딩 및 레시피 목록 */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            <span className="mt-3 text-sm text-gray-500">
              맛있는 레시피 불러오는 중...
            </span>
          </div>
        ) : recipes.length === 0 ? (
          /* 레시피 데이터 없음 */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-icons text-6xl text-gray-300 dark:text-zinc-600 mb-4">
              restaurant
            </span>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              조건에 부합하는 레시피가 없습니다.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              다른 검색어나 필터 조건으로 검색해 보세요!
            </p>
            <button
              onClick={handleWriteClick}
              className="mt-6 px-6 py-2.5 bg-primary hover:bg-green-600 text-white font-bold rounded-lg shadow-sm text-sm transition-colors"
            >
              첫 요리 등록하러 가기
            </button>
          </div>
        ) : (
          /* 레시피 카드 3열 그리드 */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.recipeId}
                  recipe={recipe}
                  onClick={() => navigate(`/recipes/detail/${recipe.recipeId}`)}
                />
              ))}
            </div>

            {/* 페이지네이션 UI 컴포넌트 */}
            <Pagination
              currentPage={queryState.page}
              totalPageCount={totalPageCount}
              onPageChange={(newPage) => updateQueryState({ page: newPage })}
              pageSize={queryState.pageSize}
              onPageSizeChange={(newSize) => updateQueryState({ pageSize: newSize, page: 1 })}
            />
          </>
        )}

        {/* 우측 하단 레시피 글쓰기 플로팅 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleWriteClick}
            className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="material-icons">edit_note</span>
            <span>레시피 글쓰기</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default RecipeListPage;