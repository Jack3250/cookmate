import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// create: 스토어 생성 함수
// persist: 새로고침 해도 데이터가 날아가지 않게 LocalStorage에 저장해주는 미들웨어
const useUserStore = create(
  persist(
    (set) => ({
      // 상태 (State) - 변수들
      user: null,          // 유저 정보 객체
      isLoggedIn: false,   // 로그인 여부
      isInitialized: false,// 앱 실행 시 세션 복원(확인) 완료 여부
      theme: 'light',      // 다크모드 여부

      // 액션 (Actions) - 상태를 변경하는 함수들
      // 로그인: 유저 정보를 받아서 저장
      login: (userData) => set({ user: userData, isLoggedIn: true }),
      
      // 로그아웃: 정보를 싹 비움
      logout: () => set({ user: null, isLoggedIn: false }),
      
      // 세션 확인 완료 상태로 변경
      setInitialized: (status) => set({ isInitialized: status }),
      
      // 닉네임 변경 (기존 user 객체를 유지하면서 이름만 바꿈)
      updateNickname: (newNickname) => set((state) => ({
        user: { ...state.user, nickname: newNickname }
      })),

      // 테마 토글
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    {
      name: 'user-storage', // LocalStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 저장소 지정
      // 세션 관련 데이터는 스토리지에 저장하지 않고 오직 theme만 저장하도록 분리
      partialize: (state) => ({ theme: state.theme }), 
    }
  )
);

export default useUserStore;