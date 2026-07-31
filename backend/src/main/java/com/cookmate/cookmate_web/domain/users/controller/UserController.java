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
