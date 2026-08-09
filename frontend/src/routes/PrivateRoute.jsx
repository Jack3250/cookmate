import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';
import { gfnToast } from '../utils/toastUtils';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isInitialized } = useUserStore();

  // 세션 복원(API 호출 등)이 완료되지 않았다면, 빈 화면이나 로딩 스피너 반환
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    // 로그인이 필요한 서비스입니다.
    gfnToast('auth.login.required');
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
