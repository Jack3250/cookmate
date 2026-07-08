import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // 새로 만든 Navbar 임포트
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-200 font-body">
      {/* 상단 네비게이션 */}
      <Navbar />

      {/* 메인 배너 */}
      <Header />

      {/* 콘텐츠 컨테이너 */}
      <div className="container mx-auto max-w-6xl mt-6 px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 좌측 사이드바 */}
          <Sidebar />

          {/* 메인 콘텐츠 */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}

export default RootLayout;
