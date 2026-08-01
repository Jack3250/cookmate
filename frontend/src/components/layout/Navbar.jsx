import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useUserStore from '../../stores/useUserStore';
import { logoutApi } from '../../api/userApi';
import { gfnToast } from '../../utils/toastUtils';

function Navbar() {
  const navigate = useNavigate();

  // 다크모드/로그인 상태 가져오기
  const theme = useUserStore((state) => state.theme);
  const toggleTheme = useUserStore((state) => state.toggleTheme);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logoutStore = useUserStore((state) => state.logout);
  
  const handleLogout = async () => {
    try {
      await logoutApi();
      logoutStore();
      gfnToast("logout.success"); 
      navigate("/main");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
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
        <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="material-icons text-sm">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
        </button>
        <span className="text-gray-400">|</span>
        
        {isLoggedIn ? (
          <>
            <Link className="hover:text-primary transition-colors" to="/mypage">내정보</Link>
            <span className="text-gray-400">|</span>
            <button className="hover:text-primary transition-colors" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <Link className="hover:text-primary transition-colors" to="/login">로그인</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;