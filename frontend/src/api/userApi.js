import client from './axiosConfig';

/**
 * 로그인 API
 * @param {Object} loginData 로그인 정보(아이디, 비밀번호)
 * @returns {Promise<Object>} 응답 데이터
 */
export const loginApi = async (loginData) => {
  const response = await client.post('/users/login', loginData);
  return response.data;
};

/**
 * 로그아웃 API
 * @returns {Promise<String>} 로그아웃 메세지
 */
export const logoutApi = async () => {
  const response = await client.post('/users/logout');
  return response.data;
};