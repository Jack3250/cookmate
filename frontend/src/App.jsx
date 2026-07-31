import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useMessageStore } from './stores/useMessageStore';
import ConfirmModal from './components/common/ConfirmModal';

function App() {
  const loadMessages = useMessageStore(state => state.loadMessages);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);
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