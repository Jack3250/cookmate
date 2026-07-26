import React from "react";
import { useRecipeForm } from "../../hooks/useRecipeForm";
import IngredientForm from "../../components/recipe/IngredientForm";
import StepForm from "../../components/recipe/StepForm";

/**
 * 상태 캡슐화(useRecipeForm 훅 적용)로 군더더기 없이 깔끔해진 레시피 등록/수정 메인 페이지
 */
function RecipeFormPage() {
  const {
    isEditMode,
    recipeForm,
    handleInputChange,
    mainImage,
    mainImageInputRef,
    handleMainImageChange,
    handleRemoveMainImage,
    ingredients,
    ingredientActions,
    steps,
    stepActions,
    hashtags,
    hashtagInput,
    hashtagActions,
    handleSubmit,
    loading,
    getCodeList,
    navigate,
  } = useRecipeForm();

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 md:p-8 min-h-[600px] shadow-sm">
      {/* 타이틀 및 상태바 */}
      <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="material-icons text-primary">edit_note</span>
          <span>{isEditMode ? "레시피 수정" : "레시피 작성"}</span>
          <span className="ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-secondary dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
            {isEditMode ? "수정 중" : "작성 중"}
          </span>
        </h2>
        <span className="text-xs text-gray-400">* 모든 칸을 꼼꼼하게 입력해 주세요</span>
      </div>

      <form className="space-y-8">
        {/* 기본 정보 입력 (제목, 요리명, 카테고리, 난이도, 조리시간) */}
        <div className="space-y-4">
          <input
            type="text"
            name="recipeTtl"
            placeholder="레시피 제목을 입력해 주세요"
            value={recipeForm.recipeTtl}
            onChange={handleInputChange}
            className="w-full text-xl md:text-2xl font-bold placeholder-gray-300 dark:placeholder-gray-600 border-0 border-b-2 border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-0 focus:border-primary px-0 py-3 transition-colors focus:outline-none"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">요리명 *</label>
              <input
                type="text"
                name="dishNm"
                placeholder="예) 김치찌개"
                value={recipeForm.dishNm}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">카테고리 *</label>
              <select
                name="categoryCd"
                value={recipeForm.categoryCd}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
                required
              >
                <option value="">선택해주세요</option>
                {getCodeList("CATEGORY_CD").map((code) => (
                  <option key={code.cd} value={code.cd}>
                    {code.cdNm}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">난이도 *</label>
              <select
                name="recipeDifficultCd"
                value={recipeForm.recipeDifficultCd}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2"
                required
              >
                <option value="">선택해주세요</option>
                {getCodeList("RECIPE_DIFFICULT_CD").map((code) => (
                  <option key={code.cd} value={code.cd}>
                    {code.cdNm}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">시간 *</label>
              <div className="relative">
                <input
                  type="number"
                  name="cookingTime"
                  placeholder="시간 입력"
                  value={recipeForm.cookingTime}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2 pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
                <span className="absolute right-3 top-2 text-sm text-gray-400">분</span>
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">공개 여부</label>
              <div className="flex items-center h-[38px]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="openYn"
                    checked={recipeForm.openYn === "N"}
                    onChange={(e) => handleInputChange({ target: { name: "openYn", value: e.target.checked ? "N" : "Y" } })}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 요리 소개/설명 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">요리 요약 설명</label>
          <textarea
            name="recipeCn"
            value={recipeForm.recipeCn}
            onChange={handleInputChange}
            className="w-full rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary resize-none p-3 h-24 focus:outline-none"
            placeholder="레시피에 대한 간단한 설명이나 맛의 특징을 작성해주세요."
          ></textarea>
        </div>

        {/* 대표 이미지 업로드 및 미리보기 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">대표 이미지 등록 *</label>
          <input
            type="file"
            accept="image/*"
            ref={mainImageInputRef}
            onChange={handleMainImageChange}
            className="hidden"
          />
          {mainImage.previewUrl ? (
            <div className="relative w-full h-72 rounded-xl overflow-hidden border border-border-light dark:border-border-dark bg-gray-100 dark:bg-zinc-800 flex justify-center items-center">
              <img
                src={mainImage.previewUrl}
                alt="Representative preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveMainImage}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                title="이미지 삭제"
              >
                <span className="material-icons text-sm">close</span>
              </button>
            </div>
          ) : (
            <div
              onClick={() => mainImageInputRef.current && mainImageInputRef.current.click()}
              className="w-full h-72 rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-600 bg-gray-50 dark:bg-zinc-800/50 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 dark:hover:bg-zinc-800 hover:border-primary dark:hover:border-primary transition-all group"
            >
              <div className="bg-white dark:bg-zinc-700 p-4 rounded-full shadow-sm mb-3 group-hover:scale-105 transition-transform">
                <span className="material-icons text-4xl text-primary">add_a_photo</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">대표 이미지를 클릭하여 업로드</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG 형식 업로드 가능</p>
            </div>
          )}
        </div>

        {/* 재료 정보 컴포넌트 */}
        <IngredientForm
          ingredients={ingredients}
          actions={ingredientActions}
        />

        {/* 조리 순서 컴포넌트 */}
        <StepForm
          steps={steps}
          actions={stepActions}
        />

        {/* 해시태그 영역 */}
        <div className="pt-6 border-t border-border-light dark:border-border-dark">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">해시태그</label>
          <input
            type="text"
            value={hashtagInput}
            onChange={hashtagActions.onChange}
            onKeyDown={hashtagActions.onKeyDown}
            placeholder="#태그 입력 후 엔터 (예: #간단요리 #주말)"
            className="w-full rounded-lg border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:border-primary focus:ring-primary py-2.5"
          />
          <p className="text-xs text-gray-400 mt-1">태그는 최대 10개까지 입력 가능합니다.</p>

          {/* 해시태그 뱃지 목록 */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {hashtags.map((tag, idx) => (
                <span key={idx} className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #{tag}
                  <button type="button" onClick={() => hashtagActions.onRemove(tag)} className="text-gray-400 hover:text-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                    <span className="material-icons text-[12px]">close</span>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 액션 버튼 영역 (취소, 임시저장, 작성/수정 완료) */}
        <div className="flex items-center justify-between pt-6 border-t border-border-light dark:border-border-dark mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-600 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            취소
          </button>

          <div className="flex gap-3">
            {/* 임시저장 버튼 */}
            <button
              type="button"
              onClick={() => handleSubmit("01")}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors disabled:opacity-50 cursor-pointer"
            >
              임시저장
            </button>

            {/* 등록/수정 완료 버튼 */}
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              className="px-8 py-2.5 rounded-lg bg-primary hover:bg-green-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              ) : (
                <span className="material-icons text-sm">send</span>
              )}
              <span>{isEditMode ? "수정완료" : "작성완료"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RecipeFormPage;