import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import FormInput from "../../components/regist/FormInput";
import { findIdApi, findPwApi } from "../../api/userApi";
import { gfnToast } from "../../utils/toastUtils";

function FindAccountPage() {
  const location = useLocation();
  // location.state로 넘어온 값이 있으면 우선 적용, 없으면 'id'가 기본값
  const initialTab = location.state?.tab === "pw" ? "pw" : "id";
  const [activeTab, setActiveTab] = useState(initialTab);

  // 아이디 찾기 State
  const [findIdName, setFindIdName] = useState("");
  const [findIdEmail, setFindIdEmail] = useState("");
  const [foundId, setFoundId] = useState("");

  // 비밀번호 찾기 State
  const [findPwId, setFindPwId] = useState("");
  const [findPwEmail, setFindPwEmail] = useState("");
  const [foundTempPw, setFoundTempPw] = useState("");

  useEffect(() => {
    if (location.state?.tab === "pw" || location.state?.tab === "id") {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 상태 초기화
    setFoundId("");
    setFoundTempPw("");
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    if (!findIdName || !findIdEmail) {
      gfnToast("valid.require.input", ["이름과 이메일"]);
      return;
    }
    try {
      const result = await findIdApi({ userNm: findIdName, email: findIdEmail });
      setFoundId(result);
    } catch (error) {
      gfnToast("valid.user.notfound");
      setFoundId("");
    }
  };

  const handleFindPw = async (e) => {
    e.preventDefault();
    if (!findPwId || !findPwEmail) {
      gfnToast("valid.require.input", ["아이디와 이메일"]);
      return;
    }
    try {
      const result = await findPwApi({ loginId: findPwId, email: findPwEmail });
      setFoundTempPw(result);
    } catch (error) {
      gfnToast("valid.user.notfound");
      setFoundTempPw("");
    }
  };

  return (
    <div className="bg-gray-50/50 dark:bg-zinc-900 min-h-screen flex flex-col items-center justify-center p-4 relative font-body text-gray-800 dark:text-gray-200">
      <div className="w-full max-w-[460px]">
        
        {/* 로고 영역 */}
        <div className="text-center mb-8">
          <Link to="/main" className="inline-flex items-center justify-center group decoration-transparent">
            <img 
              src="/src/assets/common/Logo.png" 
              alt="CookMate Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
          {/* 탭 영역 */}
          <div className="flex border-b border-gray-200 dark:border-zinc-700">
            <button
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === "id"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
              onClick={() => handleTabChange("id")}
            >
              아이디 찾기
            </button>
            <button
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === "pw"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
              onClick={() => handleTabChange("pw")}
            >
              비밀번호 찾기
            </button>
          </div>

          <div className="p-8 sm:p-10">
            {/* 아이디 찾기 폼 */}
            {activeTab === "id" && (
              <div>
                {!foundId ? (
                  <form className="space-y-4" onSubmit={handleFindId}>
                    <FormInput
                      label="이름"
                      placeholder="가입 시 등록한 이름을 입력하세요"
                      type="text"
                      value={findIdName}
                      onChange={(e) => setFindIdName(e.target.value)}
                    />
                    <FormInput
                      label="이메일"
                      placeholder="가입 시 등록한 이메일을 입력하세요"
                      type="email"
                      value={findIdEmail}
                      onChange={(e) => setFindIdEmail(e.target.value)}
                    />
                    <button
                      className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-6"
                      type="submit"
                    >
                      아이디 찾기
                    </button>
                    <div className="mt-6 text-center">
                      <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        로그인으로 돌아가기
                      </Link>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">아이디 찾기 완료</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      회원님의 아이디는 <strong className="text-primary text-xl tracking-wider">{foundId}</strong> 입니다.
                    </p>
                    <Link
                      to="/login"
                      className="block w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md transition-all"
                    >
                      로그인하러 가기
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* 비밀번호 찾기 폼 */}
            {activeTab === "pw" && (
              <div>
                {!foundTempPw ? (
                  <form className="space-y-4" onSubmit={handleFindPw}>
                    <FormInput
                      label="아이디"
                      placeholder="가입 시 등록한 아이디를 입력하세요"
                      type="text"
                      value={findPwId}
                      onChange={(e) => setFindPwId(e.target.value)}
                    />
                    <FormInput
                      label="이메일"
                      placeholder="가입 시 등록한 이메일을 입력하세요"
                      type="email"
                      value={findPwEmail}
                      onChange={(e) => setFindPwEmail(e.target.value)}
                    />
                    <button
                      className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-6"
                      type="submit"
                    >
                      임시 비밀번호 발급
                    </button>
                    <div className="mt-6 text-center">
                      <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        로그인으로 돌아가기
                      </Link>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">임시 비밀번호 발급 완료</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 px-2">
                      아래의 임시 비밀번호로 로그인하신 후, 반드시 마이페이지에서 비밀번호를 변경해 주세요.
                    </p>
                    <div className="bg-gray-100 dark:bg-zinc-900 rounded-xl p-4 mb-6 border border-gray-200 dark:border-zinc-700">
                      <strong className="text-gray-800 dark:text-gray-200 text-xl tracking-wider select-all">{foundTempPw}</strong>
                    </div>
                    <Link
                      to="/login"
                      className="block w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md transition-all"
                    >
                      로그인하러 가기
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindAccountPage;
