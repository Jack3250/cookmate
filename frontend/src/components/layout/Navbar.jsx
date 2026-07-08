import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // 다크모드 토글
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark h-10 flex items-center justify-between px-4 text-xs lg:px-8">
      {/* 좌측 로고 */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/main')}>
        <img
          alt="CookMate Logo" 
          src="/src/assets/common/Logo.png"
          className="h-7 w-auto object-contain" 
        />
      </div>

      {/* 우측 메뉴 */}
      <div className="flex items-center space-x-3">
        <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="material-icons text-sm">dark_mode</span>
        </button>
        <span className="text-gray-400">|</span>
        <Link className="hover:text-primary transition-colors" to="/login">로그인</Link>
      </div>
    </nav>
  );
}

export default Navbar;