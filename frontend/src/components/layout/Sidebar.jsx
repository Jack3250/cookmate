import React from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../sidebarMenu/ProfileCard";
import MyPageMenu from "../sidebarMenu/MyPageMenu";
import StandardMenu from "../sidebarMenu/StandardMenu";

function Sidebar() {
  const location = useLocation();

  // 마이페이지 URL 여부
  const isMyPage = location.pathname.startsWith("/mypage");

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
      {/* 프로필 카드 */}
      <ProfileCard />

      {/* 메뉴 영역 */}
      {isMyPage ? <MyPageMenu /> : <StandardMenu />}
    </aside>
  );
}

export default Sidebar;
