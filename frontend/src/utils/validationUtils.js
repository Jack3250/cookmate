/**
 * 폼 유효성 검사를 위한 정규식(Regex) 모음
 */
export const FORMAT_REGEX = {
  // 아이디: 영문 소문자와 숫자로만 4~20자
  ID: /^[a-z0-9]{4,20}$/,
  
  // 비밀번호: 영문, 숫자, 특수기호 포함 8~16자
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]{8,16}$/,
  
  // 닉네임: 한글/영문/숫자로 2~10자
  NICKNAME: /^[가-힣a-zA-Z0-9]{2,10}$/,
  
  // 전화번호: 010-0000-0000 형식
  PHONE: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
  
  // 이메일: 표준 이메일 형식
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

/**
 * 백엔드 validation 필드명을 사용자에게 표시할 이름으로 변환한다.
 */
export const FIELD_LABELS = {
  loginId: '아이디',
  pswd: '비밀번호',
  userNm: '이름',
  nickname: '닉네임',
  email: '이메일',
  telPhone: '전화번호',
  gender: '성별',
  userBrth: '생년월일',
};

const DEFAULT_VALIDATION_MESSAGE = '입력값이 올바르지 않습니다.';
const VALIDATION_ERROR_PRIORITY = [
  'valid.require.input',
  'valid.require.select',
];

/**
 * validation 오류 중 사용자에게 먼저 보여줄 항목을 선택한다.
 * 필수 입력/선택 오류가 없으면 서버가 반환한 첫 번째 오류를 유지한다.
 *
 * @param {Array<{field: string, code: string}>} errors 백엔드에서 반환한 validation 오류 목록
 * @returns {{field: string, code: string} | null} 우선순위에 따라 선택된 오류, 유효한 목록이 없으면 null
 */
export const selectValidationError = (errors) => {
  if (!Array.isArray(errors) || errors.length === 0) {
    return null;
  }

  for (const code of VALIDATION_ERROR_PRIORITY) {
    const priorityError = errors.find((error) => error?.code === code);
    if (priorityError) {
      return priorityError;
    }
  }

  return errors[0];
};

/**
 * 백엔드의 field + code validation 오류를 CMMN_MSG 문구로 변환한다.
 * 메시지 로딩 전이거나 코드가 없으면 사용자에게 코드 대신 기본 문구를 반환한다.
 *
 * @param {{field: string, code: string} | null | undefined} fieldError 백엔드 validation 오류
 * @param {(messageCode: string, ...params: string[]) => string} getMsgText CMMN_MSG 코드와 치환값으로 메시지를 조회하는 함수
 * @returns {string} 필드명이 치환된 사용자 메시지 또는 fallback 메시지
 */
export const getValidationErrorText = (fieldError, getMsgText) => {
  if (!fieldError?.code || typeof getMsgText !== 'function') {
    return DEFAULT_VALIDATION_MESSAGE;
  }

  const fieldLabel = FIELD_LABELS[fieldError.field] || '입력값';
  return getMsgText(fieldError.code, fieldLabel) || DEFAULT_VALIDATION_MESSAGE;
};

/**
 * 전화번호 입력 시 하이픈(-)을 자동으로 추가하는 포맷팅 함수
 * @param {string} value 입력된 전화번호 문자열
 * @returns {string} 하이픈이 추가된 전화번호
 */
export const formatPhoneNumber = (value) => {
  if (!value) return '';
  const val = value.replace(/[^0-9]/g, '');
  if (val.length < 4) return val;
  if (val.length < 7) return `${val.slice(0, 3)}-${val.slice(3)}`;
  if (val.length < 11) return `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`;
  return `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`;
};
