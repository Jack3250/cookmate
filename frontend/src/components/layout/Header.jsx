import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import mainBanner from "../../assets/common/MainBanner.png";
import mainBannerDark from "../../assets/common/MainBannerDark.png";

function Header() {
  const navigate = useNavigate();
  const theme = useUserStore((state) => state.theme);

  return (
    <header className="w-full bg-white dark:bg-background-dark relative overflow-hidden border-b border-border-light dark:border-border-dark">
      <div className="container mx-auto max-w-6xl h-48 md:h-64 flex items-center justify-center relative">
        {/* 라이트 모드용 이미지 */}
        <img
          alt="Cook Mate Banner Light"
          className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-75 ease-in-out ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
          src={mainBanner}
          onClick={() => navigate("/main")}
        />
        {/* 다크 모드용 이미지 */}
        <img
          alt="Cook Mate Banner Dark"
          className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-75 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
          src={mainBannerDark}
          onClick={() => navigate("/main")}
        />
      </div>
    </header>
  );
}

export default Header;
