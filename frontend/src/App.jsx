import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useMessageStore } from './stores/useMessageStore';
import useUserStore from './stores/useUserStore';
import ConfirmModal from './components/common/ConfirmModal';
import { getMeApi } from './api/userApi';

function App() {
  const loadMessages = useMessageStore(state => state.loadMessages);
  const theme = useUserStore(state => state.theme);
  const login = useUserStore(state => state.login);
  const logout = useUserStore(state => state.logout);
  const setInitialized = useUserStore(state => state.setInitialized);

  // 앱 로드 시 세션 복구 (Hydration)
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const userData = await getMeApi();
        login(userData); // 쿠키가 살아있다면 스토어 복구
      } catch (error) {
        logout(); // 쿠키가 없거나 만료되었다면 로그아웃 처리
      } finally {
        setInitialized(true); // 성공/실패 여부와 상관없이 세션 확인 완료
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // 테마 상태에 따라 html 태그에 dark 클래스 토글
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <ConfirmModal />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;