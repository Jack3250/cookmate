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
