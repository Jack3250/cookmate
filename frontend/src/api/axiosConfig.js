import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL // 백엔드 기본 주소
  , withCredentials: true // 쿠키(세션)를 주고받기 위한 필수 설정
  , timeout: 20000 // 요청 타임아웃 설정
  , headers: {
    'Content-Type': 'application/json'
  }
});

export default client;