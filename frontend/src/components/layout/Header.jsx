import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white dark:relative overflow-hidden border-b border-border-light dark:border-border-dark">
      <div className="container mx-auto max-w-6xl h-48 md:h-64 flex items-center justify-center relative">
        <img
          alt="Cook Mate Banner"
          className="absolute inset-0 w-full h-full object-cover dark:opacity-100 cursor-pointer"
          src="/src/assets/common/MainBanner.png"
          onClick={() => navigate("/main")}
        />
      </div>
    </header>
  );
}

export default Header;
