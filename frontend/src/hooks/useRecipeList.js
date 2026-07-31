import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { selectRecipeInfoList } from "../api/recipeApi";
import useCodeStore from "../stores/useCodeStore";
import { gfnToast } from "../utils/toastUtils";

// 초기 상태 상수
const INITIAL_FORM_STATE = {
  searchInput: ""
  , categoryCd: ""
  , recipeDifficultCd: ""
  , dateRange: ""
  , pageSize: 9
};

const INITIAL_QUERY_STATE = {
  ...INITIAL_FORM_STATE
  , sortType: "latest"
  , page: 1
};

/**
 * 레시피 목록 검색, 페이징, 공통코드 동기화 커스텀 훅
 */
export function useRecipeList() {

  // 공통코드 스토어 바인딩
  const fetchCodes = useCodeStore((state) => state.fetchCodes);
  const getCodeName = useCodeStore((state) => state.getCodeName);
  const getCodeList = useCodeStore((state) => state.getCodeList);

  // URL 쿼리 파라미터 기반 초기 카테고리값 획득
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategoryCode = searchParams.get("categoryCd") || "";

  // 검색 버튼 누르기 전 조건 임시 저장
  const [formState, setFormState] = useState({
    ...INITIAL_FORM_STATE
    , categoryCd: urlCategoryCode
  });

  // 백엔드 조회 검색 조건
  const [queryState, setQueryState] = useState({
    ...INITIAL_QUERY_STATE
    , categoryCd: urlCategoryCode
  });

  // 백엔드 응답 데이터 및 로딩 상태
  const [pageData, setPageData] = useState({
    recipes: []
    , totalCount: 0
    , totalPageCount: 0
    , loading: true
  });

  // 컴포넌트 마운트 시 공통코드 1회 선제 로드
  useEffect(() => {
    fetchCodes("CATEGORY_CD");
    fetchCodes("RECIPE_DIFFICULT_CD");
  }, [fetchCodes]);

  // 확정 쿼리 상태 변경 시에만 백엔드 재조회 실행
  useEffect(() => {
    loadRecipes();
  }, [queryState]);

  // URL 카테고리 변경 시 폼 및 쿼리 상태 동기화 및 즉시 조회
  useEffect(() => {
    setFormState((prev) => ({
      ...prev
      , categoryCd: urlCategoryCode
    }));
    setQueryState((prev) => ({
      ...prev
      , categoryCd: urlCategoryCode
      , page: 1
    }));
  }, [urlCategoryCode]);

  /**
   * 임시 검색 조건 업데이트
   */
  const updateFormState = (newValues) => {
    setFormState((prev) => ({
      ...prev
      , ...newValues
    }));
  };

  /**
   * 페이지 / 페이지 크기 / 정렬 방식 변경 시 재조회
   */
  const updateQueryState = (newValues) => {
    setQueryState((prev) => ({
      ...prev
      , ...newValues
    }));
  };

  /**
   * 백엔드 API 레시피 목록 조회
   */
  const loadRecipes = async () => {
    try {
      // 로딩 상태 실행
      setPageData((prev) => ({ ...prev, loading: true }));

      // 목록 조회 실행
      const response = await selectRecipeInfoList({
        categoryCd: queryState.categoryCd
        , recipeDifficultCd: queryState.recipeDifficultCd
        , searchKeyword: queryState.searchKeyword
        , dateRange: queryState.dateRange
        , sortType: queryState.sortType
        , page: queryState.page
        , pageSize: queryState.pageSize
      });

      // 응답 데이터 페이징 정보 적용
      setPageData({
        recipes: response.list || []
        , totalCount: response.totalCount || 0
        , totalPageCount: response.totalPageCount || 0
        , loading: false
      });

    } catch (error) {
      console.error("레시피 목록 로드 실패:", error);
      gfnToast("common.fail.load", ["데이터"]); // {0}을(를) 불러오는 데 실패했습니다.
      setPageData((prev) => ({ ...prev, loading: false }));
    }
  };

  /**
   * 백엔드 조회 실행
   */
  const handleSearch = (customKeyword) => {
    const keyword =
      customKeyword !== undefined ? customKeyword : formState.searchInput;

    // 임시 저장하던 검색 조건을 실제 검색 조건으로 세팅하여 목록 조회
    setQueryState((prev) => ({
      ...prev
      , searchKeyword: keyword
      , categoryCd: formState.categoryCd
      , recipeDifficultCd: formState.recipeDifficultCd
      , dateRange: formState.dateRange
      , pageSize: formState.pageSize
      , page: 1
    }));
  };

  /**
   * 필터 초기화
   */
  const handleResetFilter = () => {
    setFormState({
      ...INITIAL_FORM_STATE,
      categoryCd: urlCategoryCode
    });
  };

  /**
   * 카테고리 타이틀 명칭 반환 함수
   */
  const getCategoryTitle = () => {
    if (!queryState.categoryCd) {
      return "인기 레시피";
    }
    const categoryCodes = getCodeList("CATEGORY_CD");
    if (!categoryCodes || categoryCodes.length === 0) {
      return "...";
    }
    return `${getCodeName("CATEGORY_CD", queryState.categoryCd)} 레시피`;
  };

  return {
    formState,
    queryState,
    pageData,
    updateFormState,
    updateQueryState,
    handleSearch,
    handleResetFilter,
    getCategoryTitle,
  };
}
