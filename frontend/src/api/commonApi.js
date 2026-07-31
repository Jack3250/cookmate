import client from './axiosConfig';

/**
 * 공통코드 상세 목록 조회 API
 * @param {String} grpCd 그룹 코드
 * @returns {Promise<Array>} 공통코드 상세 목록
 */
export const selectCmmnCodeList = async (grpCd) => {
  const response = await client.get(`/common/code/${grpCd}`);
  return response.data;
};

/**
 * 공통 메시지 목록 전체 조회 API
 * @returns {Promise<Array>} 공통 메시지 목록
 */
export const fetchCommonMessages = async () => {
  const response = await client.get(`/common/messages`);
  return response.data;
};
