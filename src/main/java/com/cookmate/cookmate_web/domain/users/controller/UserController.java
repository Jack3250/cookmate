package com.cookmate.cookmate_web.domain.users.controller;

import com.cookmate.cookmate_web.domain.users.dto.UserDTO;
import com.cookmate.cookmate_web.domain.users.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @PostMapping("/regist")
    public ResponseEntity<Void> regist(@Valid @RequestBody UserDTO.RegistRequest request) {
        userService.insertUser(request);
        return ResponseEntity.ok().build();
    }

    /**
     * 로그인
     * @param loginRequest 아이디, 비밀번호
     * @return 로그인 회원 정보
     */
    @PostMapping("/login")
    public ResponseEntity<UserDTO.UserInfo> login(@Valid @RequestBody UserDTO.LoginRequest loginRequest) {
        UserDTO.UserInfo userInfo = userService.login(loginRequest);
        return ResponseEntity.ok(userInfo);
    }

    /**
     * 로그아웃
     * @param session 세션
     * @return ok 응답상태
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate(); // 세션 삭제
        return ResponseEntity.ok().build();
    }

}
