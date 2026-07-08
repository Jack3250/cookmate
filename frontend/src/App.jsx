import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
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