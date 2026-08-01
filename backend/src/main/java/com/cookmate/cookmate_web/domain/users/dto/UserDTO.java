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

        @NotBlank(message = "{valid.user.id.required}")
        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "{valid.user.id.pattern}")
        private String loginId;

        @NotBlank(message = "{valid.user.pswd.required}")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?~`])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?~`]{8,16}$", message = "{valid.user.pswd.pattern}")
        private String pswd;

        private String encPswd;

        @NotBlank(message = "{valid.user.nm.required}")
        private String userNm;

        @NotBlank(message = "{valid.user.nickname.required}")
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]{2,10}$", message = "{valid.user.nickname.pattern}")
        private String nickname;

        @NotBlank(message = "{valid.user.email.required}")
        @Email(message = "{valid.user.email.format}")
        private String email;

        @NotBlank(message = "{valid.user.phone.required}")
        private String telPhone;

        @NotBlank(message = "{valid.user.gender.required}")
        private String gender;

        @NotNull(message = "{valid.user.brth.required}")
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
        @NotBlank(message = "{valid.user.id.required}")
        private String loginId;

        @NotBlank(message = "{valid.user.pswd.required}")
        private String pswd;
        
        private boolean keepLoggedIn; // 로그인 상태 유지 여부
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
