import { useState, useRef, useEffect } from 'react';
import { gfnToast } from '../utils/toastUtils';

/**
 * 좋아요(Like) 비즈니스 로직을 분리한 커스텀 훅
 * 낙관적 업데이트(Optimistic UI), 디바운싱, 통신 실패 시 롤백 처리를 모두 담당합니다.
 * 
 * @param {Object} params
 * @param {boolean} params.initialIsLiked 초기 좋아요 상태
 * @param {number} params.initialLikeCnt 초기 좋아요 수
 * @param {function} params.toggleApi 좋아요 토글 API 호출 함수 (Promise 반환)
 * @param {string} params.targetName 대상 이름 (토스트 메시지용, 예: '레시피', '게시글')
 * @returns {Object} { isLiked, likeCnt, handleLikeClick }
 */
export function useLike({ initialIsLiked, initialLikeCnt, toggleApi, targetName = '해당 항목' }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked || false);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt || 0);

  // 부모로부터 초기값이 새로 들어오면(데이터 패칭 완료 등) 상태 동기화
  useEffect(() => {
    setIsLiked(initialIsLiked || false);
    setLikeCnt(initialLikeCnt || 0);
  }, [initialIsLiked, initialLikeCnt]);

  // 디바운스 및 상태 관리를 위한 Refs
  const clickCountRef = useRef(0);
  const likeTimerRef = useRef(null);

  const handleLikeClick = () => {
    // 1. 낙관적 업데이트 (즉시 UI 반영)
    setIsLiked(prev => {
      const newStatus = !prev;
      // 좋아요 수 증감
      setLikeCnt(prevCnt => prevCnt + (newStatus ? 1 : -1));
      return newStatus;
    });

    // 2. 클릭 횟수 기록
    clickCountRef.current += 1;

    if (likeTimerRef.current) {
      clearTimeout(likeTimerRef.current);
    }

    // 3. 디바운스 타이머 설정 (500ms 동안 추가 클릭 없으면 서버 전송)
    likeTimerRef.current = setTimeout(async () => {
      const clicks = clickCountRef.current;
      clickCountRef.current = 0; // 초기화

      // 홀수 번 클릭했을 때만 서버에 상태 변경 요청 (짝수면 제자리)
      if (clicks % 2 !== 0) {
        try {
          const serverStatus = await toggleApi();
          
          // 서버 응답과 프론트 상태가 다르면 동기화 (안전장치)
          setIsLiked(prev => {
            if (prev !== serverStatus) {
              setLikeCnt(prevCnt => prevCnt + (serverStatus ? 1 : -1));
              return serverStatus;
            }
            return prev;
          });

          if (serverStatus) {
            gfnToast('like.success', [targetName]); // 이 {0}를 좋아합니다!
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            gfnToast('auth.login.required');
          } else {
            gfnToast('sys.process.error', ['좋아요']);
            console.error('좋아요 에러:', error);
          }
          // 에러 발생 시 UI 롤백
          setIsLiked(prev => {
            const rollbackStatus = !prev;
            setLikeCnt(prevCnt => prevCnt + (rollbackStatus ? 1 : -1));
            return rollbackStatus;
          });
        }
      }
    }, 500);
  };

  return { isLiked, likeCnt, handleLikeClick };
}
