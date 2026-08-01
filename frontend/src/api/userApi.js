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

/**
 * 회원가입 API
 * @param {FormData} formData 회원가입 폼 데이터 (프로필 이미지 포함)
 * @returns {Promise<Object>} 응답 데이터
 */
export const registerApi = async (formData) => {
  const response = await client.post('/users/regist', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * 아이디 중복 확인 API
 * @param {string} loginId 확인할 아이디
 * @returns {Promise<boolean>} 사용 가능 여부
 */
export const checkIdApi = async (loginId) => {
  const response = await client.get('/users/check-id', {
    params: { loginId },
  });
  return response.data;
};

/**
 * 닉네임 중복 확인 API
 * @param {string} nickname 확인할 닉네임
 * @returns {Promise<boolean>} 사용 가능 여부
 */
export const checkNicknameApi = async (nickname) => {
  const response = await client.get('/users/check-nickname', {
    params: { nickname },
  });
  return response.data;
};

/**
 * 이메일 중복 확인 API
 * @param {string} email 확인할 이메일
 * @return {Promise<boolean>} 사용 가능 여부
 */
export const checkEmailApi = async (email) => {
  const response = await client.get('/users/check-email', {
    params: { email },
  });
  return response.data;
};

/**
 * 내 정보 조회 API (세션 복구용)
 * @return {Promise<Object>} 현재 로그인된 유저 정보
 */
export const getMeApi = async () => {
  const response = await client.get('/users/me');
  return response.data;
};
