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
