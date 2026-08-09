import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';
import { gfnToast } from '../utils/toastUtils';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    // 로그인이 필요한 서비스입니다.
    gfnToast('auth.login.required');
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
