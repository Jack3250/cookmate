import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { retrieveRecipeInfo, insertRecipeInfo, updateRecipeInfo } from "../api/recipeApi";
import useCodeStore from "../stores/useCodeStore";
import toast from "react-hot-toast";

/**
 * 레시피 등록 및 수정 폼 상태 및 비즈니스 로직을 캡슐화한 커스텀 훅
 */
export function useRecipeForm() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // 공통코드 스토어 바인딩
  const fetchCodes = useCodeStore((state) => state.fetchCodes);
  const getCodeList = useCodeStore((state) => state.getCodeList);

  // 수정 모드 여부 판단
  const isEditMode = Boolean(recipeId);

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // 기본 정보 입력 상태
  const [recipeForm, setRecipeForm] = useState({
    recipeTtl: ""
    , dishNm: ""
    , categoryCd: ""
    , recipeDifficultCd: ""
    , cookingTime: ""
    , recipeCn: ""
    , recipeStatusCd: "02"
    , openYn: "Y" // 공개 여부
  });

  // 대표 이미지 상태
  const [mainImage, setMainImage] = useState({
    file: null
    , previewUrl: ""
    , fileGrpId: null
  });
  const mainImageInputRef = useRef(null);

  // 재료 목록 상태
  const [ingredients, setIngredients] = useState([
    {
      ingrdNm: ""
      , ingrdAmt: ""
      , ingrdUnt: ""
    }
  ]);

  // 조리 단계 목록 상태
  const [steps, setSteps] = useState([
    {
      stepNo: 1
      , stepCn: ""
      , fileGrpId: null
      , previewUrl: ""
      , file: null
    }
  ]);

  // 해시태그 상태
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");

  // 삭제할 파일 아이디 목록
  const [deleteFileIds, setDeleteFileIds] = useState([]);

  // 온로드 시 공통코드 비동기 로딩
  useEffect(() => {
    const initCodes = async () => {
      try {
        await Promise.all([
          fetchCodes("CATEGORY_CD"),
          fetchCodes("RECIPE_DIFFICULT_CD"),
          fetchCodes("RECIPE_STATUS_CD")
        ]);
      } catch (error) {
        console.error("공통코드 로딩 실패:", error);
      }
    };
    initCodes();
  }, [fetchCodes]);

  // 수정 모드 시 기존 레시피 데이터 로드
  useEffect(() => {
    if (isEditMode) {
      loadOriginalRecipe();
    }
  }, [recipeId]);

  /**
   * 수정할 레시피 원본 데이터 로드 함수
   */
  const loadOriginalRecipe = async () => {
    try {
      setLoading(true);

      const data = await retrieveRecipeInfo(recipeId);

      // 기본 정보 세팅
      setRecipeForm({
        recipeTtl: data.recipeTtl || ""
        , dishNm: data.dishNm || ""
        , categoryCd: data.categoryCd || ""
        , recipeDifficultCd: data.recipeDifficultCd || ""
        , cookingTime: data.cookingTime ? String(data.cookingTime) : ""
        , recipeCn: data.recipeCn || ""
        , recipeStatusCd: data.recipeStatus || "02"
        , openYn: data.openYn || "Y"
      });

      // 대표 이미지 세팅
      if (data.mainImageUrls && data.mainImageUrls.length > 0) {
        setMainImage({
          file: null
          , previewUrl: data.mainImageUrls[0]
          , fileGrpId: data.fileGrpId || null
        });
      }

      // 재료 정보 세팅
      if (data.ingredients && data.ingredients.length > 0) {
        setIngredients(
          data.ingredients.map((ing) => ({
            ingrdNm: ing.ingrdNm || ""
            , ingrdAmt: ing.ingrdAmt != null ? String(ing.ingrdAmt) : ""
            , ingrdUnt: ing.ingrdUnt || ""
          }))
        );
      }

      // 조리 단계 정보 세팅
      if (data.steps && data.steps.length > 0) {
        setSteps(
          data.steps.map((st, idx) => ({
            stepNo: st.stepNo || idx + 1
            , stepCn: st.stepCn || ""
            , fileGrpId: st.fileGrpId || null
            , previewUrl: st.stepImageUrls && st.stepImageUrls.length > 0 ? st.stepImageUrls[0] : ""
            , file: null
          }))
        );
      }

      // 해시태그 정보 세팅
      if (data.hashtags && data.hashtags.length > 0) {
        setHashtags(data.hashtags);
      }

    } catch (error) {
      console.error("레시피 조회 실패:", error);
      toast.error("레시피 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 기본 정보 입력값 변경 핸들러
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 대표 이미지 변경 핸들러
   */
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setMainImage((prev) => ({
        ...prev
        , file: file
        , previewUrl: previewUrl
      }));
    }
  };

  /**
   * 대표 이미지 삭제 핸들러
   */
  const handleRemoveMainImage = () => {
    setMainImage({ file: null, previewUrl: "", fileGrpId: null });
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = "";
    }
  };

  /**
   * 재료 항목 값 변경 핸들러
   */
  const handleIngredientChange = (index, field, value) => {
    setIngredients((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  /**
   * 재료 행 추가 핸들러
   */
  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev
      , { ingrdNm: "", ingrdAmt: "", ingrdUnt: "" }
    ]);
  };

  /**
   * 재료 행 삭제 핸들러
   */
  const handleRemoveIngredient = (index) => {
    if (ingredients.length <= 1) {
      toast.error("최소 1개 이상의 재료가 필요합니다.");
      return;
    }
    setIngredients((prev) => prev.filter((_, idx) => idx !== index));
  };

  /**
   * 조리 단계 설명 텍스트 변경 핸들러
   */
  const handleStepTextChange = (index, value) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], stepCn: value };
      return next;
    });
  };

  /**
   * 조리 단계 이미지 파일 변경 핸들러
   */
  const handleStepImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSteps((prev) => {
        const next = [...prev];
        next[index] = {
          ...next[index]
          , file: file
          , previewUrl: previewUrl
        };
        return next;
      });
    }
  };

  /**
   * 조리 단계 이미지 삭제 핸들러
   */
  const handleRemoveStepImage = (index) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index]
        , file: null
        , previewUrl: ""
      };
      return next;
    });
  };

  /**
   * 조리 단계 추가 핸들러
   */
  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev
      , { stepNo: prev.length + 1, stepCn: "", fileGrpId: null, previewUrl: "", file: null }
    ]);
  };

  /**
   * 조리 단계 삭제 핸들러
   */
  const handleRemoveStep = (index) => {
    if (steps.length <= 1) {
      toast.error("최소 1개 이상의 조리 단계가 필요합니다.");
      return;
    }
    setSteps((prev) => {
      const next = prev.filter((_, idx) => idx !== index);
      return next.map((st, idx) => ({ ...st, stepNo: idx + 1 }));
    });
  };

  /**
   * 해시태그 입력 변경 핸들러
   */
  const handleHashtagChange = (e) => {
    setHashtagInput(e.target.value);
  };

  /**
   * 해시태그 추가 (엔터/스페이스바/콤마)
   */
  const handleHashtagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      e.preventDefault();
      const val = hashtagInput.trim().replace(/^#+/, ""); // 앞에 붙은 # 제거
      if (!val) return;

      if (hashtags.length >= 10) {
        toast.error("해시태그는 최대 10개까지 입력 가능합니다.");
        return;
      }

      if (!hashtags.includes(val)) {
        setHashtags((prev) => [...prev, val]);
      }
      setHashtagInput("");
    }
  };

  /**
   * 해시태그 삭제 핸들러
   */
  const handleRemoveHashtag = (tagToRemove) => {
    setHashtags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  /**
   * 폼 제출(등록 / 수정 / 임시저장) 핸들러
   * @param {string} statusCd 상태 코드 (임시저장 '01' 등), 없으면 폼의 상태값 사용
   */
  const handleSubmit = async (statusCd) => {
    // 상태가 있으면 적용 (예: 임시저장 시 01), 아니면 폼의 상태값 사용
    const finalStatusCd = statusCd || recipeForm.recipeStatusCd;

    // 임시저장(01)일 경우 최소한 제목만 입력되었는지 체크
    if (finalStatusCd === "01") {
      if (!recipeForm.recipeTtl.trim()) {
        return toast.error("제목을 입력해 주세요.");
      }
    } else {
      // 그 외 경우 전체 필수항목 유효성 체크
      if (!recipeForm.recipeTtl.trim()) {
        return toast.error("제목을 입력해 주세요.");
      }
      if (!recipeForm.dishNm.trim()) {
        return toast.error("요리명을 입력해 주세요.");
      }
      if (!recipeForm.categoryCd) {
        return toast.error("카테고리를 선택해 주세요.");
      }
      if (!recipeForm.recipeDifficultCd) {
        return toast.error("난이도를 선택해 주세요.");
      }
      if (!recipeForm.cookingTime) {
        return toast.error("조리 시간을 입력해 주세요.");
      }
      if (!mainImage.file && !mainImage.previewUrl) {
        return toast.error("대표 이미지를 등록해 주세요.");
      }
    }

    // 유효한 데이터 필터링 (빈 값 무시)
    const validIngredients = ingredients.filter((ing) => ing.ingrdNm.trim() !== "");
    const validSteps = steps.filter((s) => s.stepCn.trim() !== "" || s.file);

    // 작성완료 시 최소 1개 입력 검증
    if (finalStatusCd !== "01") {
      if (validIngredients.length === 0) {
        return toast.error("최소 1개의 재료 정보를 입력해 주세요.");
      }
      if (validSteps.length === 0) {
        return toast.error("최소 1개의 조리 순서를 입력해 주세요.");
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();

      const recipeDto = {
        recipeId: recipeId || null
        , recipeTtl: recipeForm.recipeTtl
        , dishNm: recipeForm.dishNm
        , categoryCd: recipeForm.categoryCd
        , recipeDifficultCd: recipeForm.recipeDifficultCd
        , cookingTime: Number(recipeForm.cookingTime)
        , recipeCn: recipeForm.recipeCn
        , recipeStatus: finalStatusCd
        , openYn: recipeForm.openYn
        , hashtags: hashtags
        , ingredients: validIngredients.map((ing) => ({
          ingrdNm: ing.ingrdNm
          , ingrdAmt: ing.ingrdAmt
          , ingrdUnt: ing.ingrdUnt
        }))
        , steps: validSteps.map((s, idx) => ({
          stepNo: idx + 1 // 필터링 후 번호 재부여
          , stepCn: s.stepCn
          , fileGrpId: s.fileGrpId
        }))
        , deleteFileIds
      };

      formData.append("data", new Blob([JSON.stringify(recipeDto)], { type: "application/json" }));

      if (mainImage.file) {
        formData.append("mainImage", mainImage.file);
      }

      validSteps.forEach((s, idx) => {
        if (s.file) {
          formData.append(`stepImages_${idx}`, s.file);
        }
      });

      let responseId = recipeId;
      if (isEditMode) {
        await updateRecipeInfo(formData);
        toast.success("레시피가 성공적으로 수정되었습니다.");
      } else {
        responseId = await insertRecipeInfo(formData);
        toast.success("레시피가 성공적으로 등록되었습니다.");
      }

      navigate(`/recipes/detail/${responseId}`);
    } catch (error) {
      console.error("레시피 저장 실패:", error);
      toast.error("레시피 저장에 실패했습니다. 입력값을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const ingredientActions = {
    onIngredientChange: handleIngredientChange,
    onAddIngredient: handleAddIngredient,
    onRemoveIngredient: handleRemoveIngredient,
  };

  const stepActions = {
    onStepTextChange: handleStepTextChange,
    onStepImageChange: handleStepImageChange,
    onRemoveStepImage: handleRemoveStepImage,
    onAddStep: handleAddStep,
    onRemoveStep: handleRemoveStep,
  };

  const hashtagActions = {
    onChange: handleHashtagChange,
    onKeyDown: handleHashtagKeyDown,
    onRemove: handleRemoveHashtag,
  };

  return {
    isEditMode,
    recipeForm,
    handleInputChange,
    setRecipeForm,
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
  };
}
