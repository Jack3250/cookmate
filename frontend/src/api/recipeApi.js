import client from './axiosConfig';

/**
 * 레시피 정보 목록 페이징 및 조건 조회
 * @param {Object} params 검색 및 페이징 조건 (categoryCd, recipeDifficultCd, searchKeyword, page, pageSize)
 * @returns {Promise<Object>} 레시피 검색 및 페이징 결과 DTO
 */
export const selectRecipeInfoList = async (params) => {
  const response = await client.get('/recipe/list', { params });
  return response.data;
};

/**
 * 레시피 정보 상세 조회
 * @param {String} recipeId 레시피 ID
 * @returns {Promise<Object>} 레시피 상세 정보
 */
export const retrieveRecipeInfo = async (recipeId) => {
  const response = await client.get(`/recipe/detail/${recipeId}`);
  return response.data;
};

/**
 * 레시피 정보 등록
 * @param {FormData} formData 레시피 등록 폼 데이터 (JSON 문자열 데이터 + 메인 이미지 + 단계별 이미지)
 * @returns {Promise<String>} 생성된 레시피 ID
 */
export const insertRecipeInfo = async (formData) => {
  const response = await client.post('/recipe/insert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * 레시피 정보 수정
 * @param {FormData} formData 레시피 수정 폼 데이터 (JSON 문자열 데이터 + 변경 이미지 + 삭제 파일 ID 목록)
 * @returns {Promise<Number>} 수정된 레시피 시퀀스
 */
export const updateRecipeInfo = async (formData) => {
  const response = await client.put('/recipe/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * 레시피 정보 삭제
 * @param {String} recipeId 레시피 ID
 * @returns {Promise<void>} 
 */
export const deleteRecipeInfo = async (recipeId) => {
  await client.delete(`/recipe/delete/${recipeId}`);
};

/**
 * 레시피 좋아요 토글
 * @param {String} recipeId 레시피 ID
 * @returns {Promise<boolean>} 좋아요 상태
 */
export const toggleRecipeLike = async (recipeId) => {
  const response = await client.post(`/recipe/${recipeId}/like`);
  return response.data;
};
