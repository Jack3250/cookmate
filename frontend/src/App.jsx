import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useMessageStore } from './stores/useMessageStore';
import useUserStore from './stores/useUserStore';
import ConfirmModal from './components/common/ConfirmModal';

function App() {
  const loadMessages = useMessageStore(state => state.loadMessages);
  const theme = useUserStore(state => state.theme);

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