import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { retrieveRecipeInfo, deleteRecipeInfo, toggleRecipeLike } from '../../api/recipeApi';
import useCodeStore from '../../stores/useCodeStore';
import toast from 'react-hot-toast';
import RecipeHeader from '../../components/recipe/RecipeHeader';
import IngredientList from '../../components/recipe/IngredientList';
import StepList from '../../components/recipe/StepList';
import LikeButton from '../../components/common/LikeButton';

/**
 * 레시피 상세 조회 페이지 컴포넌트
 */
function RecipeDetailPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // 상태값 정의
  const [recipe, setRecipe] = useState(null); // 레시피 상세 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 공통코드 스토어 바인딩
  const fetchCodes = useCodeStore((state) => state.fetchCodes);
  const getCodeName = useCodeStore((state) => state.getCodeName);

  /**
   * 백엔드 API를 통해 레시피 상세 정보 및 공통코드를 가져오는 함수
   */
  const loadRecipeDetail = async () => {
    try {
      setLoading(true);
      // 공통코드 로드 병렬 처리 (카테고리 및 난이도)
      await Promise.all([
        fetchCodes('CATEGORY_CD'),
        fetchCodes('RECIPE_DIFFICULT_CD')
      ]);

      const data = await retrieveRecipeInfo(recipeId);
      setRecipe(data);
    } catch (error) {
      console.error('레시피 상세 조회 실패:', error);
      toast.error('레시피 정보를 불러오는 데 실패했습니다.');
      navigate(-1); // 이전 페이지로 돌아감
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 및 recipeId 변경 시 상세 데이터 로드
  useEffect(() => {
    if (recipeId) {
      loadRecipeDetail();
    }
  }, [recipeId]);

  /**
   * 레시피 삭제 처리 함수
   */
  const handleDelete = async () => {
    if (window.confirm('정말로 이 레시피를 삭제하시겠습니까?')) {
      try {
        await deleteRecipeInfo(recipeId);
        toast.success('레시피가 성공적으로 삭제되었습니다.');
        navigate(-1); // 이전 페이지로 돌아감
      } catch (error) {
        console.error('레시피 삭제 실패:', error);
        toast.error('레시피 삭제에 실패했습니다.');
      }
    }
  };

  /**
   * 좋아요 버튼 클릭 핸들러
   */
  const handleLikeClick = async () => {
    try {
      // API 호출하여 좋아요 토글
      const newLikeStatus = await toggleRecipeLike(recipeId);

      // 화면 내 상태 즉시 업데이트 (Optimistic UI 업데이트)
      setRecipe(prev => ({
        ...prev,
        isLiked: newLikeStatus,
        likeCnt: prev.likeCnt + (newLikeStatus ? 1 : -1)
      }));

      if (newLikeStatus) {
        toast.success('이 레시피를 좋아합니다!');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('로그인이 필요한 기능입니다.');
      } else {
        toast.error('좋아요 처리 중 오류가 발생했습니다.');
        console.error('좋아요 에러:', error);
      }
    }
  };

  // 로딩 상태 렌더링
  if (loading) {
    return (
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 min-h-[600px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        <span className="mt-3 text-sm text-gray-500">레시피 상세 정보를 맛있게 차리는 중입니다...</span>
      </div>
    );
  }

  // 레시피 데이터가 없을 때의 예외 처리
  if (!recipe) {
    return (
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 min-h-[600px] flex flex-col items-center justify-center">
        <span className="material-icons text-6xl text-gray-300 dark:text-zinc-600 mb-4">error</span>
        <p className="text-gray-500 dark:text-gray-400 font-medium">레시피를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/recipes/list')}
          className="mt-6 px-6 py-2 bg-primary hover:bg-green-600 text-white font-bold rounded-lg shadow-sm text-sm transition-colors"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 lg:p-10 shadow-sm min-h-[600px]">

      {/* 1. 상단 헤더 컴포넌트 */}
      <RecipeHeader
        recipe={recipe}
        getCodeName={getCodeName}
        onEdit={() => navigate(`/recipes/edit/${recipe.recipeId}`)}
        onDelete={handleDelete}
      />

      {/* 메인 대표 이미지 */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-sm bg-gray-100 dark:bg-zinc-800 flex justify-center items-center">
        {recipe.mainImageUrls && recipe.mainImageUrls.length > 0 ? (
          <img
            alt={recipe.recipeTtl}
            src={recipe.mainImageUrls[0]}
            className="w-full max-h-[480px] object-cover hover:scale-[1.01] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-80 flex flex-col items-center justify-center text-gray-300 dark:text-zinc-600 bg-gray-50 dark:bg-zinc-800">
            <span className="material-icons text-7xl">broken_image</span>
            <span className="text-xs mt-2">대표 이미지가 없는 레시피입니다.</span>
          </div>
        )}
      </div>

      {/* 요리 소개 및 설명 */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-1">
          <span className="material-icons text-primary">chat_bubble_outline</span>
          요리 소개
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
          {recipe.recipeCn || '소개글이 작성되지 않았습니다.'}
        </p>
      </section>

      {/* 재료 리스트 컴포넌트 */}
      <IngredientList ingredients={recipe.ingredients} />

      {/* 조리 순서 컴포넌트 */}
      <StepList steps={recipe.steps} />

      {/* 해시태그 */}
      {recipe.hashtags && recipe.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {recipe.hashtags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 좋아요 및 소셜 액션 버튼 영역 */}
      <div className="flex justify-center items-center mt-12 mb-4 border-t border-gray-200 dark:border-zinc-700 pt-10">
        <LikeButton 
          isLiked={recipe.isLiked} 
          likeCnt={recipe.likeCnt} 
          onClick={handleLikeClick} 
          size="lg" 
        />
      </div>

    </div>
  );
}

export default RecipeDetailPage;