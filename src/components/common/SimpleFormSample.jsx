import React from 'react';
import { useForm } from 'react-hook-form';

function SimpleFormSample() {
  // useForm 훅 초기화
  const { 
    register,     // input을 hook form에 등록하는 함수
    handleSubmit, // form 제출을 처리하는 함수
    watch,        // 특정 필드 값을 실시간으로 관찰하는 함수
    formState: { errors } // 유효성 검사 에러 메시지를 담고 있는 객체
  } = useForm({
    mode: 'onSubmit', // 언제 검사할지? (onChange, onBlur, onSubmit 등)
    defaultValues: { // 기본값 설정
      username: '',
      email: '',
      role: 'user',
      agreement: false
    }
  });

  // 폼 제출 성공 시 실행되는 함수 (data에 입력값들이 다 들어옴)
  const onSubmit = (data) => {
    console.log('--- 폼 제출 성공 ---');
    console.log(data);
    alert(`제출 완료!\n이름: ${data.username}\n이메일: ${data.email}`);
  };

  // 폼 제출 실패 시 실행되는 함수 (에러 발생 시)
  const onError = (errors) => {
    console.log('--- 폼 제출 실패 (유효성 에러) ---');
    console.log(errors);
  };

  // 실시간으로 보고 싶은 값이 있다면 watch 사용
  const currentName = watch("username");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        React Hook Form 기본 예제
      </h2>

      {/* handleSubmit이 onSubmit과 onError을 호출 */}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        
        {/* 필수 입력 & 글자 수 제한 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            이름 (필수, 2글자 이상)
          </label>
          <input 
            type="text"
            className={`w-full p-2 border rounded outline-none
              ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}
              dark:bg-zinc-900 dark:text-white`
            }
            
            // register('이름', { 규칙 })
            {...register("username", { 
              required: "이름을 입력해주세요.", 
              minLength: {
                value: 2,
                message: "이름은 최소 2글자 이상이어야 합니다."
              }
            })} 
          />
          {/* 에러 메시지 출력 */}
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* 패턴 검사 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            이메일 (형식 체크)
          </label>
          <input 
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded outline-none dark:bg-zinc-900 dark:text-white"
            
            {...register("email", { 
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "올바른 이메일 형식이 아닙니다."
              }
            })} 
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 셀렉트 박스 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            직업 선택
          </label>
          <select 
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded outline-none dark:bg-zinc-900 dark:text-white"
            {...register("role")}
          >
            <option value="developer">개발자</option>
            <option value="designer">디자이너</option>
            <option value="manager">기획자</option>
          </select>
        </div>

        {/* 체크박스 */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="agreement"
            className="w-4 h-4 text-blue-600"
            {...register("agreement", { 
              required: "약관에 동의해야 합니다." 
            })} 
          />
          <label htmlFor="agreement" className="text-sm text-gray-700 dark:text-gray-300">
            [필수] 개인정보 처리방침 동의
          </label>
        </div>
        {errors.agreement && (
          <p className="text-red-500 text-xs">{errors.agreement.message}</p>
        )}

        {/* 제출 버튼 */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition-colors"
        >
          제출 테스트
        </button>
      </form>

      {/* 디버깅용: 실시간 입력값 확인 */}
      <div className="mt-6 p-3 bg-gray-100 dark:bg-zinc-900 rounded text-xs">
        <p className="font-bold mb-1 text-gray-500">실시간 입력값 (Watch):</p>
        <p className="dark:text-gray-300">이름: {currentName}</p>
      </div>
    </div>
  );
}

export default SimpleFormSample;