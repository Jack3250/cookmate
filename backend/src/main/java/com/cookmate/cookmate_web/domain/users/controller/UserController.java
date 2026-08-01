package com.cookmate.cookmate_web.domain.users.controller;

import com.cookmate.cookmate_web.domain.users.dto.UserDTO;
import com.cookmate.cookmate_web.domain.users.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.cookmate.cookmate_web.domain.users.dto.SessionUser;

/**
 * @file        UserController.java
 * @description 사용자 정보 컨트롤러 정의
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

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /*
     * =======================
     * 회원가입/로그인
     * =======================
     */
    /**
     * 회원가입
     * @param request 회원 정보
     * @return ok 응답상태
     */
    @PostMapping(value = "/regist", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> regist(
            @Valid @RequestPart("data") UserDTO.RegistRequest request,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        userService.insertUser(request, profileImage);
        return ResponseEntity.ok().build();
    }

    /**
     * 아이디 중복 확인
     * @param loginId 확인할 아이디
     * @return 사용 가능 여부 (true: 사용 가능)
     */
    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkId(@RequestParam String loginId) {
        return ResponseEntity.ok(userService.checkLoginId(loginId));
    }

    /**
     * 닉네임 중복 확인
     * @param nickname 확인할 닉네임
     * @return 사용 가능 여부 (true: 사용 가능)
     */
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkNickname(nickname));
    }

    /**
     * 이메일 중복 확인
     * @param email 확인할 이메일
     * @return 사용 가능 여부 (true: 사용 가능)
     */
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.checkEmail(email));
    }

    /**
     * 로그인
     * @param loginRequest 아이디, 비밀번호 및 유지 여부
     * @return 로그인 회원 정보
     */
    @PostMapping("/login")
    public ResponseEntity<UserDTO.UserInfo> login(
            @Valid @RequestBody UserDTO.LoginRequest loginRequest, 
            HttpServletRequest request, 
            HttpServletResponse response) {
        
        UserDTO.UserInfo userInfo = userService.login(loginRequest);
        HttpSession session = request.getSession(false);
        
        // 로그인 상태 유지 처리 (JSESSIONID 쿠키 수명 연장)
        if (session != null) {
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setPath("/");
            if (loginRequest.isKeepLoggedIn()) {
                cookie.setMaxAge(60 * 60 * 24 * 30); // 30일 (초 단위)
                session.setMaxInactiveInterval(60 * 60 * 24 * 30); // 서버 세션 만료도 30일로 연장
            } else {
                cookie.setMaxAge(-1); // 브라우저 종료 시 소멸
            }
            response.addCookie(cookie);
        }

        return ResponseEntity.ok(userInfo);
    }

    /**
     * 로그아웃
     * @param session 세션
     * @return ok 응답상태
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        
        // JSESSIONID 쿠키 삭제
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        
        return ResponseEntity.ok().build();
    }

    /**
     * 내 정보 조회 (새로고침 시 세션 복구용)
     */
    @GetMapping("/me")
    public ResponseEntity<SessionUser> getMe(HttpSession session) {
        SessionUser user = (SessionUser) session.getAttribute("USER_SESSION");
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(user);
    }
}
