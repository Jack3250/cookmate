import React from "react";
import SearchBar from "./SearchBar";
import NavigationMenu from "./NavigationMenu";
import PopularKeywords from "./PopularKeywords";

/**
 * 사이드바 메뉴 레이아웃 컨테이너 컴포넌트
 */
function StandardMenu() {
  return (
    <>
      {/* 1. 레시피 검색창 컴포넌트 */}
      <SearchBar />

      {/* 2. 동적 네비게이션 메뉴 컴포넌트 (자립형) */}
      <NavigationMenu />

      {/* 3. 인기 키워드 컴포넌트 */}
      <PopularKeywords />
    </>
  );
}

export default StandardMenu;
