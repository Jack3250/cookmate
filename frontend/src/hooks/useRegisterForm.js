import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerApi, checkIdApi, checkNicknameApi, checkEmailApi } from '../api/userApi';
import { useMessageStore } from '../stores/useMessageStore';
import { gfnToast, gfnError } from '../utils/toastUtils';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const marketingAgreed = location.state?.marketing || false;

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 메시지 스토어에서 텍스트 조회 함수 가져오기
  const getMsg = useMessageStore((state) => state.getMsgText);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const pswd = watch('pswd');
  const loginId = watch('loginId');
  const nickname = watch('nickname');
  const email = watch('email');

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckError, setIdCheckError] = useState('');

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameCheckError, setNicknameCheckError] = useState('');

  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // 아이디/닉네임/이메일 변경 시 중복 확인 상태 초기화
  useEffect(() => {
    setIsIdChecked(false);
    setIdCheckError('');
  }, [loginId]);

  useEffect(() => {
    setIsNicknameChecked(false);
    setNicknameCheckError('');
  }, [nickname]);

  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  // 아이디 중복 확인 핸들러
  const handleCheckId = async () => {
    if (!loginId || errors.loginId) return;
    try {
      const isAvailable = await checkIdApi(loginId);
      if (isAvailable) {
        setIsIdChecked(true);
        setIdCheckError('');
      } else {
        setIsIdChecked(false);
        setIdCheckError(getMsg('valid.common.duplicate', '아이디'));
      }
    } catch (e) {
      setIsIdChecked(false);
      setIdCheckError(getMsg('sys.process.error', '아이디 중복 확인'));
    }
  };

  // 닉네임 중복 확인 핸들러
  const handleCheckNickname = async () => {
    if (!nickname || errors.nickname) return;
    try {
      const isAvailable = await checkNicknameApi(nickname);
      if (isAvailable) {
        setIsNicknameChecked(true);
        setNicknameCheckError('');
      } else {
        setIsNicknameChecked(false);
        setNicknameCheckError(getMsg('valid.common.duplicate', '닉네임'));
      }
    } catch (e) {
      setIsNicknameChecked(false);
      setNicknameCheckError(getMsg('sys.process.error', '닉네임 중복 확인'));
    }
  };

  // 이메일 중복 확인 핸들러
  const handleCheckEmail = async () => {
    const isValid = await trigger('email');
    if (!isValid || !email) {
      gfnToast('valid.format.invalid', ['이메일']);
      return;
    }
    try {
      const isAvailable = await checkEmailApi(email);
      if (isAvailable) {
        gfnToast('valid.common.available', ['이메일']);
        setIsEmailChecked(true);
      } else {
        gfnToast('valid.common.duplicate', ['이메일']);
        setIsEmailChecked(false);
      }
    } catch (e) {
      gfnToast('sys.process.error', ['중복 확인']);
    }
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    if (!isIdChecked) {
      gfnToast('valid.require.check', ['아이디 중복 확인']);
      return;
    }
    if (!isNicknameChecked) {
      gfnToast('valid.require.check', ['닉네임 중복 확인']);
      return;
    }
    if (!isEmailChecked) {
      gfnToast('valid.require.check', ['이메일 중복 확인']);
      return;
    }

    setIsSubmitting(true);
    try {
      const { pswdConfirm, ...submitData } = data;
      submitData.mrktAgreYn = marketingAgreed ? 'Y' : 'N';

      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(submitData)], { type: 'application/json' }));
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      await registerApi(formData);

      gfnToast('common.success.join');
      navigate('/join/complete');
    } catch (error) {
      console.error('회원가입 에러:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
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
  };
};
