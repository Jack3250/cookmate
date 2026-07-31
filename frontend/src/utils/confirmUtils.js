import { useConfirmStore } from '../stores/useConfirmStore';
import { useMessageStore } from '../stores/useMessageStore';

/**
 * 전역 커스텀 컨펌 모달 띄우기 함수
 * @param {string} msgCd - 메세지 코드 (예: 'confirm.recipe.delete')
 * @param {Array} params - 메세지 파라미터 (예: ['레시피'])
 * @returns {Promise<boolean>} 확인 클릭 시 true, 취소 클릭 시 false
 */
export const gfnConfirm = (msgCd, params = []) => {
  return new Promise((resolve) => {
    const messageObj = useMessageStore.getState().getMessage(msgCd);
    
    let text = msgCd; // 기본적으로 코드를 띄움 (없을 경우 대비)
    
    if (messageObj) {
      text = messageObj.msgCn;
      // 파라미터 치환 ({0}, {1} 등)
      params.forEach((param, index) => {
        const regex = new RegExp(`\\{${index}\\}`, 'g');
        text = text.replace(regex, param);
      });
    } else {
      console.warn(`[gfnConfirm] 메세지 코드 '${msgCd}'를 찾을 수 없습니다.`);
    }

    // 스토어 열기
    useConfirmStore.getState().openConfirm(text, resolve);
  });
};
