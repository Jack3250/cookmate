import toast from 'react-hot-toast';
import { useMessageStore } from '../stores/useMessageStore';

/**
 * 전역 토스트 출력 함수
 * @param {string} msgCd - 메세지 코드 (예: 'valid.common.duplicate')
 * @param {Array} params - 메세지 파라미터 (예: ['이메일'])
 */
export const gfnToast = (msgCd, params = []) => {

  // 스토어에서 메세지 객체 조회
  const messageObj = useMessageStore.getState().getMessage(msgCd);

  if (!messageObj) {
    // 메시지 코드를 찾지 못한 경우 기본 에러 팝업
    console.warn(`[gfnToast] 메세지 코드 '${msgCd}'를 찾을 수 없습니다.`);
    toast.error('알 수 없는 오류가 발생했습니다.');
    return;
  }

  let text = messageObj.msgCn;

  // 파라미터 치환 ({0}, {1} 등)
  params.forEach((param, index) => {
    const regex = new RegExp(`\\{${index}\\}`, 'g');
    text = text.replace(regex, param);
  });

  // msgTy에 따른 토스트 종류 분기
  const msgTy = messageObj.msgTy;

  switch (msgTy) {
    case '01': // 성공
      toast.success(text);
      break;
    case '02': // 경고
      toast(text, { icon: '⚠️' });
      break;
    case '03': // 에러
      toast.error(text);
      break;
    case '04': // 알림
      toast(text, { icon: 'ℹ️' });
      break;
    default:
      // 기본은 일반 토스트로 띄움
      toast(text);
      break;
  }
};
