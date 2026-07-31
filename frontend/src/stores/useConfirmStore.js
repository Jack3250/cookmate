import { create } from 'zustand';

export const useConfirmStore = create((set) => ({
  isOpen: false,
  message: '',
  resolve: null,

  openConfirm: (message, resolve) => set({ isOpen: true, message, resolve }),
  
  closeConfirm: () => set((state) => {
    // 혹시라도 대기중인 프로미스가 남아있다면 false로 처리 (예외 방지)
    if (state.resolve) {
      state.resolve(false);
    }
    return { isOpen: false, message: '', resolve: null };
  }),

  confirm: () => set((state) => {
    if (state.resolve) {
      state.resolve(true);
    }
    return { isOpen: false, message: '', resolve: null };
  }),

  cancel: () => set((state) => {
    if (state.resolve) {
      state.resolve(false);
    }
    return { isOpen: false, message: '', resolve: null };
  }),
}));
