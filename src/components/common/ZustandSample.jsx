import React from 'react';
import useUserStore from '../stores/useUserStore'; // 스토어 불러오기

// 데이터를 보여주는 컴포넌트
const UserProfile = () => {
  // 스토어에서 필요한 데이터 구조분해
  const { user, isLoggedIn, logout } = useUserStore();

  if (!isLoggedIn) {
    return <div className="p-4 bg-gray-100 rounded">로그인이 필요합니다.</div>;
  }

  return (
    <div className="p-4 bg-green-50 dark:bg-green-900 border border-green-200 rounded">
      <h3 className="font-bold text-lg">환영합니다, {user.nickname}님!</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">이메일: {user.email}</p>
      <button 
        onClick={logout}
        className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
      >
        로그아웃
      </button>
    </div>
  );
};

// 데이터 변경 컴포넌트
const LoginForm = () => {
  const { login, isLoggedIn, updateNickname } = useUserStore();

  const handleLogin = () => {
    // 유저 객체 주입
    const fakeUser = {
      id: 1,
      nickname: '요리왕비룡',
      email: 'dragon@cook.com'
    };
    login(fakeUser);
  };

  if (isLoggedIn) {
    return (
      <div className="mt-4">
        <p className="text-sm mb-2">닉네임 변경 테스트:</p>
        <button 
          onClick={() => updateNickname('전설의쉐프')}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          '전설의쉐프'로 이름 바꾸기
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleLogin}
      className="px-4 py-2 bg-primary text-white font-bold rounded hover:bg-green-600"
    >
      로그인 시뮬레이션
    </button>
  );
};

// 메인 샘플 페이지
function ZustandSample() {
  // 테마 상태도 가져와 봄
  const { theme, toggleTheme } = useUserStore();

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Zustand 상태관리</h2>
        <button 
          onClick={toggleTheme}
          className="text-xs px-2 py-1 border rounded"
        >
          {theme === 'light' ? '🌙 다크모드' : '☀️ 라이트모드'}
        </button>
      </div>

      <div className="space-y-6">
        {/* 컴포넌트끼리 props를 주고받지 않아도 상태가 공유됨 */}
        <UserProfile />
        <hr className="border-gray-300 dark:border-gray-600" />
        <LoginForm />
      </div>

      <div className="mt-6 p-3 bg-gray-100 dark:bg-zinc-900 rounded text-xs text-gray-500">
        <p>💡 팁: 로그인 후 페이지를 새로고침 해보세요.</p>
        <p>persist 미들웨어 덕분에 로그인이 풀리지 않습니다.</p>
      </div>
    </div>
  );
}

export default ZustandSample;