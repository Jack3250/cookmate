import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useMessageStore } from './stores/useMessageStore';

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

      <AppRouter />
    </BrowserRouter>
  );
}

export default App;