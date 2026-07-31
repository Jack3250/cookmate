import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RegistHeader from '../../components/regist/RegistHeader';

function TermsPage() {
  const navigate = useNavigate();

  // 전체 동의
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({ // 약관 체크박스 상태
    terms: false, // 이용약관 동의
    privacy: false, // 개인정보 수집 및 이용 동의
    marketing: false, // 마케팅 정보 수신 동의
  });

  // 전체 동의 핸들러
  const handleAllAgree = (e) => {
    const isChecked = e.target.checked;
    setAllAgreed(isChecked);
    setAgreements({ terms: isChecked, privacy: isChecked, marketing: isChecked });
  };

  // 개별 약관 동의 핸들러
  const handleAgree = (name, checked) => {
    const newAgreements = { ...agreements, [name]: checked };
    setAgreements(newAgreements);

    // 개별 약관 상태에 따른 전체 동의 체크박스 상태 업데이트
    setAllAgreed(newAgreements.terms && newAgreements.privacy && newAgreements.marketing);
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (!agreements.terms || !agreements.privacy) {
      toast.error('모든 필수 약관에 동의해주세요.');
      return;
    }
    navigate('/join/form', { state: { marketing: agreements.marketing } });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900 flex flex-col">
      <style>{`
        .terms-scroll::-webkit-scrollbar { width: 6px; }
        .terms-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .terms-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>

      {/* 회원가입 헤더 */}
      <RegistHeader currentStep={1} />

      {/* 메인 컨텐츠 */}
      <div className="flex-grow py-10 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white dark:bg-zinc-800 rounded-[1.5rem] shadow-sm p-6 sm:p-8 flex flex-col gap-8">

          {/* 페이지 헤더 */}
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">서비스 이용약관 동의</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">쿡메이트 서비스 시작을 위해 약관에 동의해주세요.</p>
          </div>

          {/* 전체 동의 */}
          <div className="bg-gray-50 dark:bg-zinc-700/50 rounded-xl shadow-sm border border-transparent p-5 transition-colors">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  checked={allAgreed}
                  onChange={handleAllAgree}
                  className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer transition-colors accent-primary"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">전체 동의하기</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  이용약관(필수), 개인정보 수집 및 이용(필수), 마케팅 정보 수신(선택)에 모두 동의합니다.
                </p>
              </div>
            </label>
          </div>

          {/* 약관 동의 섹션 */}
          <div className="flex flex-col gap-6 px-1 sm:px-5">

            {/* 이용약관 */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={(e) => handleAgree('terms', e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-base font-medium text-gray-900 dark:text-white">이용약관 동의 <span className="text-primary text-sm">(필수)</span></span>
              </label>
              <div className="h-40 w-full rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4 overflow-y-auto terms-scroll text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="font-bold mb-2">제 1 조 (목적)</p>
                <p className="mb-2">본 약관은 쿡메이트(이하 "회사")가 제공하는 요리 커뮤니티 및 관련 제반 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                <p className="font-bold mb-2">제 2 조 (정의)</p>
                <p className="mb-2">1. "서비스"란 구현되는 단말기(PC, 휴대형단말기 등 각종 유무선 장치를 포함)와 상관없이 "회원"이 이용할 수 있는 쿡메이트 및 쿡메이트 관련 제반 서비스를 의미합니다.</p>
                <p className="mb-2">2. "회원"이란 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다.</p>
                <p className="mb-2">3. "아이디(ID)"란 "회원"의 식별과 "서비스" 이용을 위하여 "회원"이 정하고 "회사"가 승인하는 문자와 숫자의 조합을 의미합니다.</p>
                <p className="font-bold mb-2">제 3 조 (약관의 게시와 개정)</p>
                <p>1. "회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
              </div>
            </div>

            {/* 개인정보 수집 및 이용약관 */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.privacy}
                  onChange={(e) => handleAgree('privacy', e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-base font-medium text-gray-900 dark:text-white">개인정보 수집 및 이용 동의 <span className="text-primary text-sm">(필수)</span></span>
              </label>
              <div className="h-40 w-full rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4 overflow-y-auto terms-scroll text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="mb-2">쿡메이트는 원활한 서비스 제공을 위해 최소한의 범위 내에서 아래와 같이 개인정보를 수집・이용합니다.</p>
                <table className="w-full text-left border-collapse mb-4 text-xs">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-zinc-600">
                      <th className="py-2">수집항목</th>
                      <th className="py-2">수집목적</th>
                      <th className="py-2">보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-zinc-700">
                      <td className="py-2">이메일, 비밀번호, 닉네임</td>
                      <td className="py-2">회원가입 및 식별</td>
                      <td className="py-2">회원탈퇴 시까지</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mb-2 text-gray-500">※ 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 단, 동의를 거부할 경우 회원가입이 제한될 수 있습니다.</p>
              </div>
            </div>

            {/* 마케팅 정보 수신 동의 */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.marketing}
                  onChange={(e) => handleAgree('marketing', e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-base font-medium text-gray-900 dark:text-white">마케팅 정보 수신 동의 <span className="text-gray-400 text-sm">(선택)</span></span>
              </label>
              <div className="h-28 w-full rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4 overflow-y-auto terms-scroll text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="mb-2">다양한 이벤트 및 혜택 정보를 이메일, SMS, 앱 푸시 알림 등으로 받아보실 수 있습니다.</p>
                <p>선택 항목에 동의하지 않으셔도 회원가입 및 기본 서비스 이용에는 제한이 없습니다. 다만, 이벤트 당첨 안내 및 할인 혜택 등 유용한 정보 제공이 제한될 수 있습니다.</p>
              </div>
            </div>

          </div>

          {/* 버튼 섹션 */}
          <div className="pt-2">
            <button
              onClick={handleNext}
              className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-2xl shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              다음으로
              <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              이미 계정이 있으신가요?{' '}
              <button onClick={() => navigate('/login')} className="text-primary hover:underline font-bold">
                로그인하기
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TermsPage;