import React from 'react';

/**
 * 공통 입력 컴포넌트
 */
function FormInput({
  label,
  required = false,
  type = 'text',
  placeholder = '',
  register,
  error,
  checkError,
  isSuccess = false,
  successMsg,
  actionButton,
  readOnly = false,
  onClick,
  ...rest
}) {
  // 에러 상태 판단 (form 에러 또는 중복확인 실패 에러)
  const hasError = !!error || !!checkError;
  const errorMessage = error || checkError;

  return (
    <div>
      {/* 라벨 영역 */}
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* 입력창 영역 */}
      <div className="relative">
        <input
          type={type}
          readOnly={readOnly}
          onClick={onClick}
          className={`w-full px-4 py-3.5 text-sm rounded-xl outline-none transition-all dark:text-white border ${actionButton ? 'pr-24' : ''
            } ${hasError
              ? 'bg-red-50/50 border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:bg-red-900/10'
              : 'bg-gray-50 border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 dark:bg-zinc-700/50 dark:focus:bg-zinc-700'
            }`}
          placeholder={placeholder}
          {...(register || {})}
          {...rest}
        />
        {/* 인라인 액션 버튼 (예: 중복확인 버튼) */}
        {actionButton && actionButton}
      </div>

      {/* 에러 메시지 */}
      {hasError && (
        <p className="mt-1.5 ml-1 text-xs text-red-500">{errorMessage}</p>
      )}

      {/* 성공 메시지 (예: 사용 가능한 아이디입니다.) */}
      {!hasError && isSuccess && successMsg && (
        <p className="mt-1.5 ml-1 text-xs text-green-600 dark:text-green-400">
          {successMsg}
        </p>
      )}
    </div>
  );
}

export default FormInput;
