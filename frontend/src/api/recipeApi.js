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
