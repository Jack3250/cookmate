import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistHeader from '../../components/regist/RegistHeader';

function RegisterComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900 flex flex-col">
      <RegistHeader currentStep={3} />
      <div className="flex-grow py-10 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white dark:bg-zinc-800 rounded-[1.5rem] shadow-sm p-6 sm:p-8 text-center flex flex-col gap-6">

          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="material-icons text-5xl text-green-500">check_circle</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              환영합니다!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              성공적으로 회원가입이 완료되었습니다.<br />
              이제 Cookmate의 다양한 레시피를 만나보세요.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              로그인하러 가기
              <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;