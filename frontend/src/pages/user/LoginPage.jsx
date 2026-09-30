import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/userApi";
import { gfnToast } from "../../utils/toastUtils";
import FormInput from "../../components/regist/FormInput";
import useUserStore from "../../stores/useUserStore";
import logo from "../../assets/common/Logo.png";

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [pswd, setPswd] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginId) {
      gfnToast("valid.require.input", ["아이디"]);
      return;
    }

    if (!pswd) {
      gfnToast("valid.require.input", ["비밀번호"]);
      return;
    }

    try {
      const data = await loginApi({ loginId, pswd, keepLoggedIn });
      login(data);
      gfnToast("login.success", [data.nickname || data.userNm || "회원"]);
      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="bg-gray-50/50 dark:bg-zinc-900 min-h-screen flex flex-col items-center justify-center p-4 relative font-body text-gray-800 dark:text-gray-200">

      <div className="w-full max-w-[460px]">
        {/* 로고 영역 */}
        <div className="text-center mb-10">
          <Link to="/main" className="inline-flex items-center justify-center group decoration-transparent">
            <img
              src={logo}
              alt="CookMate Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* 폼 컨테이너 */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-8 sm:p-10">
          <form className="space-y-4" onSubmit={handleLogin}>
            <FormInput
              label="아이디"
              placeholder="아이디를 입력하세요"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoComplete="username"
            />
            <FormInput
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={pswd}
              onChange={(e) => setPswd(e.target.value)}
              autoComplete="current-password"
            />
            <button
              className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-2"
              type="submit"
            >
              로그인
            </button>
          </form>

          {/* 보조 기능 영역 */}
          <div className="flex items-center justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center cursor-pointer group">
              <input
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer transition-colors dark:border-zinc-600 dark:bg-zinc-900"
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <span className="ml-2 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">로그인 상태 유지</span>
            </label>
          </div>

          <div className="border-t border-gray-200 dark:border-zinc-700 my-8"></div>

          {/* 소셜 로그인 */}
          <div className="flex justify-center gap-4">
            <button className="block w-12 h-12" type="button" aria-label="Naver Login">
              <div className="w-full h-full rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <span className="font-bold text-xl">N</span>
              </div>
            </button>
            <button className="block w-12 h-12" type="button" aria-label="Kakao Login">
              <div className="w-full h-full rounded-full bg-[#FEE500] flex items-center justify-center text-[#391B1B] hover:opacity-90 transition-opacity">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c5.523 0 10 3.582 10 8 0 2.87-1.9 5.43-4.85 6.78-.33.15-.36.26-.2.63l1.1 2.3c.09.2.04.37-.15.47-.2.1-.4.04-.57-.07-2.6-1.7-4.43-2.9-4.72-3.08-.2-.14-.42-.16-.65-.16C6.477 17.87 2 14.288 2 9.87 2 5.452 6.477 3 12 3z"></path>
                </svg>
              </div>
            </button>
            <button className="block w-12 h-12" type="button" aria-label="Google Login">
              <div className="w-full h-full rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
              </div>
            </button>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8 text-sm text-gray-500 dark:text-gray-400">
            <Link className="hover:underline hover:text-gray-800 dark:hover:text-gray-200" to="/find-account">아이디 찾기</Link>
            <span className="w-[1px] h-3 bg-gray-300 dark:bg-zinc-600"></span>
            <Link className="hover:underline hover:text-gray-800 dark:hover:text-gray-200" to="/find-account" state={{ tab: 'pw' }}>비밀번호 찾기</Link>
            <span className="w-[1px] h-3 bg-gray-300 dark:bg-zinc-600"></span>
            <Link className="hover:underline hover:text-gray-800 dark:hover:text-gray-200 font-bold text-primary" to="/join">회원가입</Link>
          </div>
        </div>

        {/* 푸터 영역 */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <Link className="hover:underline" to="#">이용약관</Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link className="font-bold text-gray-700 dark:text-gray-300 hover:underline" to="#">개인정보처리방침</Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link className="hover:underline" to="#">책임의 한계와 법적고지</Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link className="hover:underline" to="#">회원정보 고객센터</Link>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Copyright © <strong className="text-gray-600 dark:text-gray-400 font-bold">CookMate</strong> Corp. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default LoginPage;
