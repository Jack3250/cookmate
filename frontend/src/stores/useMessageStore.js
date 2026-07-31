import { create } from 'zustand';
import { fetchCommonMessages } from '../api/commonApi';

export const useMessageStore = create((set, get) => ({
  messages: {},
  isLoaded: false,

  // 앱 로드 시 최초 1회 호출
  loadMessages: async () => {
    if (get().isLoaded) return;
    try {
      const data = await fetchCommonMessages();
      // data: [{ msgCd: '...', msgCn: '...', msgDomain: '...', msgTy: '...' }, ...]
      const msgMap = {};
      data.forEach(item => {
        msgMap[item.msgCd] = item;
      });
      set({ messages: msgMap, isLoaded: true });
    } catch (error) {
      console.error('메시지 조회 중 에러가 발생했습니다 :', error);
    }
  },

  getMessage: (msgCd, ...params) => {
    const msgObj = get().messages[msgCd];
    if (!msgObj) return undefined;

    // 파라미터가 주어지면 메시지 텍스트({0}, {1})를 치환하여 새로운 객체 반환
    if (params && params.length > 0) {
      let text = msgObj.msgCn;
      params.forEach((param, index) => {
        text = text.replace(new RegExp(`\\{${index}\\}`, 'g'), param);
      });
      return { ...msgObj, msgCn: text };
    }

    return msgObj;
  },

  // 텍스트(msgCn)만 바로 필요한 경우를 위한 함수
  getMsgText: (msgCd, ...params) => {
    const msgObj = get().getMessage(msgCd, ...params);
    return msgObj ? msgObj.msgCn : '';
  }
}));
