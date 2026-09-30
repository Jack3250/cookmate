import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/Logo.png';

function RegistHeader({ currentStep = 1 }) {
  const navigate = useNavigate();

  // 헤더 현재 단계 상태 클래스
  const getStepStyle = (step) => {
    if (currentStep === step) {
      return {
        container: "flex items-center gap-2 text-[#FF8C42]",
        number: "flex items-center justify-center w-6 h-6 rounded-full bg-[#FF8C42] text-white text-xs"
      };
    }
    return {
      container: "flex items-center gap-2 text-[#618972] dark:text-gray-400",
      number: "flex items-center justify-center w-6 h-6 rounded-full border border-gray-200 bg-white text-gray-400 text-xs"
    };
  };

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-[#f0f4f2] dark:border-zinc-700 sticky top-0 z-50">
      <div className="max-w-[960px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img
            alt="CookMate Logo"
            src={logo}
            className="h-7 w-auto object-contain"
          />
        </div>

        {/* Breadcrumbs / Step Indicator (Desktop) */}
        <div className="hidden sm:flex items-center gap-3 text-sm font-medium">
          <div className={getStepStyle(1).container}>
            <span className={getStepStyle(1).number}>1</span>
            <span>약관 동의</span>
          </div>
          <span className="material-icons text-gray-300 text-lg">chevron_right</span>
          <div className={getStepStyle(2).container}>
            <span className={getStepStyle(2).number}>2</span>
            <span>정보 입력</span>
          </div>
          <span className="material-icons text-gray-300 text-lg">chevron_right</span>
          <div className={getStepStyle(3).container}>
            <span className={getStepStyle(3).number}>3</span>
            <span>가입 완료</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default RegistHeader;
