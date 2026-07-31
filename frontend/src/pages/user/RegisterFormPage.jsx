import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistHeader from '../../components/regist/RegistHeader';
import FormInput from '../../components/regist/FormInput';
import AddressSearch from '../../components/common/AddressSearch';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { FORMAT_REGEX, formatPhoneNumber } from '../../utils/validationUtils';

function RegisterFormPage() {
  const navigate = useNavigate();
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  // 커스텀 훅에서 비즈니스 로직 및 폼 상태 가져오기
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    pswd,
    getMsg,

    isSubmitting,

    isIdChecked,
    idCheckError,
    handleCheckId,

    isNicknameChecked,
    nicknameCheckError,
    handleCheckNickname,

    isEmailChecked,
    handleCheckEmail,

    profilePreview,
    handleImageChange,

    onSubmit,
  } = useRegisterForm();

  // 주소 검색 완료 핸들러 (AddressSearch 연동)
  const handleAddressComplete = (data) => {
    setValue('zipCd', data.zonecode);
    setValue('addr', data.address);
    setIsPostcodeOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900 flex flex-col">
      <RegistHeader currentStep={2} />
      <div className="flex-grow py-10 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white dark:bg-zinc-800 rounded-[1.5rem] shadow-sm p-6 sm:p-8">

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">회원가입</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              쿡메이트의 회원이 되어 다양한 레시피를 만나보세요!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* 프로필 이미지 (선택) */}
            <div className="flex flex-col items-center justify-center mb-2">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 border border-gray-200 dark:bg-zinc-700 dark:border-zinc-600 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-icons text-4xl text-gray-400 dark:text-gray-500">person</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 dark:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-700 transition-colors">
                  <span className="material-icons text-white text-[16px]">photo_camera</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-5">

              <FormInput
                label="아이디"
                required
                placeholder="영문 소문자/숫자 4~20자"
                autoComplete="username"
                register={register('loginId', {
                  required: getMsg('valid.require.input', '아이디'),
                  pattern: { value: FORMAT_REGEX.ID, message: getMsg('valid.format.id') },
                  onBlur: handleCheckId
                })}
                error={errors.loginId?.message}
                checkError={idCheckError}
                isSuccess={isIdChecked}
                successMsg={getMsg('valid.common.available', '아이디')}
              />

              <FormInput
                label="비밀번호"
                required
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8~16자"
                autoComplete="new-password"
                register={register('pswd', {
                  required: getMsg('valid.require.input', '비밀번호'),
                  pattern: { value: FORMAT_REGEX.PASSWORD, message: getMsg('valid.format.password') }
                })}
                error={errors.pswd?.message}
              />

              <FormInput
                label="비밀번호 확인"
                required
                type="password"
                placeholder="비밀번호 다시 입력"
                autoComplete="new-password"
                register={register('pswdConfirm', {
                  required: getMsg('valid.require.input', '비밀번호 확인'),
                  validate: value => value === pswd || getMsg('valid.password.mismatch')
                })}
                error={errors.pswdConfirm?.message}
              />

              <FormInput
                label="이름"
                required
                placeholder="홍길동"
                autoComplete="name"
                register={register('userNm', { required: getMsg('valid.require.input', '이름') })}
                error={errors.userNm?.message}
              />

              <FormInput
                label="닉네임"
                required
                placeholder="2~10자 한글/영문/숫자"
                autoComplete="nickname"
                register={register('nickname', {
                  required: getMsg('valid.require.input', '닉네임'),
                  pattern: { value: FORMAT_REGEX.NICKNAME, message: getMsg('valid.format.nickname') },
                  onBlur: handleCheckNickname
                })}
                error={errors.nickname?.message}
                checkError={nicknameCheckError}
                isSuccess={isNicknameChecked}
                successMsg={getMsg('valid.common.available', '닉네임')}
              />

              <FormInput
                label="휴대폰번호"
                required
                type="tel"
                placeholder="010-0000-0000"
                autoComplete="tel-national"
                register={register('telPhone', {
                  required: getMsg('valid.require.input', '전화번호'),
                  pattern: { value: FORMAT_REGEX.PHONE, message: getMsg('valid.format.tel') },
                  onChange: (e) => {
                    setValue('telPhone', formatPhoneNumber(e.target.value), { shouldValidate: true });
                  }
                })}
                error={errors.telPhone?.message}
              />

              <FormInput
                label="이메일"
                required
                type="email"
                placeholder="example@cookmate.com"
                autoComplete="email"
                register={register('email', {
                  required: getMsg('valid.require.input', '이메일'),
                  pattern: { value: FORMAT_REGEX.EMAIL, message: getMsg('valid.format.invalid', '이메일') }
                })}
                error={errors.email?.message}
                actionButton={
                  <button
                    type="button"
                    onClick={handleCheckEmail}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${isEmailChecked
                      ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                      : 'text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-600 dark:text-gray-300'
                      }`}
                  >
                    {isEmailChecked ? '확인 완료' : '중복 확인'}
                  </button>
                }
              />

              {/* 생년월일 & 성별 (가로 배치) */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <FormInput
                    label="생년월일"
                    required
                    type="date"
                    autoComplete="bday"
                    register={register('userBrth', { required: getMsg('valid.require.select', '생년월일') })}
                    error={errors.userBrth?.message}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 ml-1">성별 <span className="text-red-500">*</span></label>
                  <div className={`flex items-center justify-between h-[48px] px-2 rounded-xl bg-gray-50 border dark:bg-zinc-700/50 transition-all ${errors.gender ? 'border-red-200 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent focus-within:bg-white focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10 dark:focus-within:bg-zinc-700'
                    }`}>
                    <label className="flex-1 flex justify-center items-center gap-1.5 cursor-pointer h-full">
                      <input type="radio" value="01" className="w-4 h-4 text-primary focus:ring-primary accent-primary" {...register('gender', { required: getMsg('valid.require.select', '성별') })} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">남</span>
                    </label>
                    <label className="flex-1 flex justify-center items-center gap-1.5 cursor-pointer h-full">
                      <input type="radio" value="02" className="w-4 h-4 text-primary focus:ring-primary accent-primary" {...register('gender', { required: getMsg('valid.require.select', '성별') })} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">여</span>
                    </label>
                    <label className="flex-1 flex justify-center items-center gap-1.5 cursor-pointer h-full">
                      <input type="radio" value="03" className="w-4 h-4 text-primary focus:ring-primary accent-primary" {...register('gender', { required: getMsg('valid.require.select', '성별') })} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">비공개</span>
                    </label>
                  </div>
                  {errors.gender && <p className="mt-1.5 ml-1 text-xs text-red-500">{errors.gender.message}</p>}
                </div>
              </div>

              {/* 주소 */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 ml-1">주소</label>
                <div className="flex flex-col gap-2">
                  <FormInput
                    placeholder="우편번호"
                    readOnly
                    autoComplete="postal-code"
                    register={register('zipCd')}
                    actionButton={
                      <button
                        type="button"
                        onClick={() => setIsPostcodeOpen(true)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold rounded-lg text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
                      >
                        우편번호 찾기
                      </button>
                    }
                  />

                  <FormInput
                    placeholder="기본 주소"
                    readOnly
                    autoComplete="address-line1"
                    register={register('addr')}
                  />

                  <FormInput
                    placeholder="상세 주소를 입력해주세요 (선택)"
                    autoComplete="address-line2"
                    register={register('addrDtl')}
                  />
                </div>
              </div>

            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-white text-base font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/20'
                  }`}
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                )}
                {isSubmitting ? '가입 중입니다...' : '회원가입 완료하기'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-bold"
            >
              로그인하기
            </button>
          </div>

        </div>

        {/* 다음 주소 모달 */}
        {isPostcodeOpen && (
          <AddressSearch
            onClose={() => setIsPostcodeOpen(false)}
            onComplete={handleAddressComplete}
          />
        )}

      </div>
    </div>
  );
}

export default RegisterFormPage;