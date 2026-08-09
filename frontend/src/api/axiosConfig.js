import axios from 'axios';
import { gfnError } from '../utils/toastUtils';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL // 백엔드 기본 주소
  , withCredentials: true // 쿠키(세션)를 주고받기 위한 필수 설정
  , timeout: 20000 // 요청 타임아웃 설정
  , headers: {
    'Content-Type': 'application/json'
  }
});

// 전역 에러 핸들링을 위한 응답 인터셉터
client.interceptors.response.use(
  (response) => {
    // 정상 응답은 그대로 반환
    return response;
  },
  (error) => {
    if (error.response) {
      const { data, status } = error.response;
      
      // 401, 403 등은 인증/인가 처리 로직(컴포넌트 단)과 겹칠 수 있으므로 제외하거나 상황에 맞게 처리
      if (status !== 401 && status !== 403 && status !== 404) {
        // 백엔드에서 반환한 ErrorResponse 객체의 message가 있으면 출력
        if (data && data.message) {
          gfnError(data.message);
        } else if (status >= 500) {
          gfnError("서버 내부 오류가 발생했습니다.");
        }
      }
    } else if (error.request) {
      // 네트워크 오류 등 응답이 없는 경우
      gfnError("서버와 통신할 수 없습니다.");
    } else {
      gfnError("알 수 없는 오류가 발생했습니다.");
    }
    
    // 에러를 그대로 reject하여 컴포넌트에서도 추가적인 처리를 할 수 있게 함
    return Promise.reject(error);
  }
);

export default client;