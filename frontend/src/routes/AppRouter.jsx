import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "../components/layout/RootLayout";

import MainPage from "../pages/main/MainPage";

import LoginPage from "../pages/user/LoginPage";
import TermsPage from "../pages/user/TermsPage";
import RegisterFormPage from "../pages/user/RegisterFormPage";
import RegisterComplete from "../pages/user/RegisterComplete";

import RecipeListPage from "../pages/recipe/RecipeListPage";
import RecipeFormPage from "../pages/recipe/RecipeFormPage";
import RecipeDetailPage from "../pages/recipe/RecipeDetailPage";

import MyDashboardPage from "../pages/mypage/MyDashboardPage";
import MyProfileEditPage from "../pages/mypage/MyProfileEditPage";

import BoardListPage from "../pages/board/BoardListPage";
import BoardFormPage from "../pages/board/BoardFormPage";
import BoardDetailPage from "../pages/board/BoardDetailPage";

import NotFoundPage from "../pages/common/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />

        {/* 로그인 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 회원가입 */}
        <Route path="/join">
          <Route index element={<TermsPage />} /> {/* 약관동의 */}
          <Route path="form" element={<RegisterFormPage />} /> {/* 정보입력 */}
          <Route path="complete" element={<RegisterComplete />} /> {/* 완료 */}
        </Route>

        {/* 레시피 */}
        <Route path="/recipes">
          <Route path="list/:categoryCode" element={<RecipeListPage />} /> {/* 리스트 */}
          <Route path="write" element={<RecipeFormPage />} /> {/* 등록 */}
          <Route path="edit/:recipeId" element={<RecipeFormPage />} /> {/* 수정 */}
          <Route path="detail/:recipeId" element={<RecipeDetailPage />} /> {/* 상세 */}
        </Route>

        {/* 마이페이지 */}
        <Route path="/mypage">
          <Route index element={<MyDashboardPage />} /> {/* 대시보드 */}
          <Route path="profile" element={<MyProfileEditPage />} /> {/* 정보수정 */}
        </Route>

        {/* 게시판 */}
        <Route path="/board">
          <Route path="list/:boardId" element={<BoardListPage />} /> {/* 리스트 */}
          <Route path="write/:boardId" element={<BoardFormPage />} /> {/* 등록 */}
          <Route path="edit/:boardId/:postId" element={<BoardFormPage />} /> {/* 수정 */}
          <Route path="detail/:boardId/:postId" element={<BoardDetailPage />} /> {/* 상세 */}
        </Route>
      </Route>

      {/* 404 페이지 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
