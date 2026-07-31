package com.cookmate.cookmate_web.domain.users.service;

import com.cookmate.cookmate_web.domain.common.util.KeygenUtil;
import com.cookmate.cookmate_web.domain.global.error.CustomException;
import com.cookmate.cookmate_web.domain.global.error.ErrorCode;
import com.cookmate.cookmate_web.domain.users.dto.SessionUser;
import com.cookmate.cookmate_web.domain.users.dto.UserDTO;
import com.cookmate.cookmate_web.domain.users.mapper.UserMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.cookmate.cookmate_web.domain.file.service.FileService;
import java.util.Collections;

/**
 * @file        UserService.java
 * @description 사용자 정보 서비스 정의
 * @author      강보람
 * @since       2026-01-17
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-17      강보람          최초 생성
 * </pre>
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final HttpSession httpSession;
    private final FileService fileService;

    /*
     * =======================
     * 회원가입/로그인
     * =======================
     */
    /**
     * 회원가입
     * @param request 회원 정보
     */
    @Transactional
    public void insertUser(UserDTO.RegistRequest request, MultipartFile profileImage) {

        // 아이디 중복 체크
        validateDuplicateLoginId(request.getLoginId());

        // 이메일 중복 체크
        validateDuplicateEmail(request.getEmail());

        // 고유 키 생성 및 비밀번호 암호화 준비
        String userKey = KeygenUtil.generateKey();
        String encPswd = passwordEncoder.encode(request.getPswd());

        request.setUserKey(userKey);
        request.setEncPswd(encPswd);

        // 프로필 이미지 저장 처리
        if (profileImage != null && !profileImage.isEmpty()) {
            String fileGrpId = fileService.saveFile(Collections.singletonList(profileImage), null, userKey);
            request.setFileGrpId(fileGrpId);
        }

        // DB 저장
        userMapper.insertUser(request);
    }

    /**
     * 로그인
     * @param loginRequest 아이디, 비밀번호
     * @return 로그인 회원 정보
     */
    public UserDTO.UserInfo login(UserDTO.LoginRequest loginRequest) {
        // 아이디 없음
        UserDTO.UserInfo user = userMapper.selectUserInfo(loginRequest.getLoginId());

        // 비밀번호 비교 (입력 비번 vs DB 암호화 비번)
        if (!passwordEncoder.matches(loginRequest.getPswd(), user.getPswd())) {
            throw new CustomException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        // 세션에 사용자 정보 저장
        httpSession.setAttribute("USER_SESSION", new SessionUser(user));

        return user;
    }

    /*
     * =======================
     * 헬퍼 메소드
     * =======================
     */
    /**
     * 아이디 중복 체크
     * @param loginId 로그인 아이디
     */
    public void validateDuplicateLoginId(String loginId) {
        if (userMapper.selectLoginId(loginId) != null) {
            throw new CustomException(ErrorCode.DUPLICATE_VALUE, new Object[]{"아이디"});
        }
    }

    /**
     * 이메일 중복 체크
     * @param email 이메일
     */
    public void validateDuplicateEmail(String email) {
        if (userMapper.selectEmail(email) != null) {
            throw new CustomException(ErrorCode.DUPLICATE_VALUE, new Object[]{"이메일"});
        }
    }

    /**
     * 이메일 중복 여부 확인 (API용)
     * @param email 이메일
     * @return 사용 가능 여부 (true: 가능, false: 중복)
     */
    public boolean checkEmail(String email) {
        return userMapper.selectEmail(email) == null;
    }

    /**
     * 아이디 중복 여부 확인 (API용)
     * @param loginId 아이디
     * @return 사용 가능 여부 (true: 가능, false: 중복)
     */
    public boolean checkLoginId(String loginId) {
        return userMapper.selectLoginId(loginId) == null;
    }

    /**
     * 닉네임 중복 여부 확인 (API용)
     * @param nickname 닉네임
     * @return 사용 가능 여부 (true: 가능, false: 중복)
     */
    public boolean checkNickname(String nickname) {
        return userMapper.selectNickname(nickname) == null;
    }
}
