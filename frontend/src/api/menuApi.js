import client from './axiosConfig';

/**
 * 전체 사용 가능한 메뉴 목록 조회 API
 * @returns {Promise<Array>} 전체 메뉴 목록
 */
export const selectMenuList = async () => {
  const response = await client.get('/menu/list');
  return response.data;
};
