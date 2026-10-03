package com.cookmate.cookmate_web.domain.users.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

/**
 * @file        UserDTO.java
 * @description 사용자 정보 DTO 정의
 * @author      강보람
 * @since       2026-01-17
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-17      강보람          최초 생성
 * 2026-03-04      강보람          JPA -> MyBatis 변경
 * </pre>
 */

public class UserDTO {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class RegistRequest { // 회원가입 요청 데이터

        private String userKey;

        @NotBlank(message = "valid.require.input")
        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "valid.format.id")
        private String loginId;

        @NotBlank(message = "valid.require.input")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?~`])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?~`]{8,16}$", message = "valid.format.password")
        private String pswd;

        private String encPswd;

        @NotBlank(message = "valid.require.input")
        private String userNm;

        @NotBlank(message = "valid.require.input")
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]{2,10}$", message = "valid.format.nickname")
        private String nickname;

        @NotBlank(message = "valid.require.input")
        @Email(message = "valid.format.invalid")
        private String email;

        @NotBlank(message = "valid.require.input")
        private String telPhone;

        @NotBlank(message = "valid.require.select")
        private String gender;

        @NotNull(message = "valid.require.input")
        private String userBrth;

        private String zipCd;
        private String addr;
        private String addrDtl;
        private String mrktAgreYn; // 마케팅 수신 동의 여부 ('Y' or 'N')
        private String fileGrpId; // 프로필 사진 파일 그룹 ID
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest { // 로그인 요청 데이터
        @NotBlank(message = "valid.require.input")
        private String loginId;

        @NotBlank(message = "valid.require.input")
        private String pswd;
        
        private boolean keepLoggedIn; // 로그인 상태 유지 여부
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FindIdRequest { // 아이디 찾기 요청 데이터
        @NotBlank(message = "valid.require.input")
        private String userNm;

        @NotBlank(message = "valid.require.input")
        @Email(message = "valid.format.invalid")
        private String email;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FindPwRequest { // 비밀번호 찾기 요청 데이터
        @NotBlank(message = "valid.require.input")
        private String loginId;

        @NotBlank(message = "valid.require.input")
        @Email(message = "valid.format.invalid")
        private String email;
        
        private String encPswd; // 임시 비밀번호 암호화 저장용
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class UserInfo { // 회원 정보 응답 데이터
        private String userKey;
        
        @JsonIgnore
        private String pswd;
        
        private String loginId;
        private String userNm;
        private String nickname;
        private String email;
        private String fileGrpId;
    }
}
