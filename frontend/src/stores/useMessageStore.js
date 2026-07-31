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

  getMessage: (msgCd) => {
    return get().messages[msgCd];
  }
}));
