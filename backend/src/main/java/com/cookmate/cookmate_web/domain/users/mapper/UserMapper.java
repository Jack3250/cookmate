package com.cookmate.cookmate_web.domain.users.mapper;

import com.cookmate.cookmate_web.domain.users.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

/**
 * @file        UserMapper.java
 * @description 사용자 정보 Mapper 정의
 * @author      강보람
 * @since       2026-03-04
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-03-04      강보람          최초 생성
 * </pre>
 */

@Mapper
public interface UserMapper {

    /*
     * =======================
     * 회원가입/로그인
     * =======================
     */
    /**
     * 회원가입
     * @param request 회원 정보
     */
    void insertUser(UserDTO.RegistRequest request);

    /**
     * 사용자 정보 조회
     * @param loginId 아이디
     * @return 로그인 회원 정보
     */
    UserDTO.UserInfo selectUserInfo(String loginId);

    /*
     * =======================
     * 헬퍼 메소드
     * =======================
     */
    /**
     * 아이디 중복 체크
     * @param loginId 로그인 아이디
     */
    UserDTO.UserInfo selectLoginId(String loginId);

    /**
     * 이메일 중복 체크
     * @param email 이메일
     */
    UserDTO.UserInfo selectEmail(String email);

    /**
     * 닉네임 중복 체크
     * @param nickname 닉네임
     */
    UserDTO.UserInfo selectNickname(String nickname);
}
