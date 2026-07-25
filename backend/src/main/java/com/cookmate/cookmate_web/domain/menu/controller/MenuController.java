package com.cookmate.cookmate_web.domain.menu.controller;

import com.cookmate.cookmate_web.domain.menu.dto.MenuDTO;
import com.cookmate.cookmate_web.domain.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @file        MenuController.java
 * @description 메뉴 컨트롤러
 * @author      강보람
 * @since       2026-07-25
 * @version     1.0
 *
 * <pre>
 * 수정일          수정자          수정내용
 * ----------    ----------    ---------------------------
 * 2026-07-25      강보람       최초 생성
 * </pre>
 */

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    /**
     * 전체 메뉴 목록 조회
     * @return 전체 메뉴 목록
     */
    @GetMapping("/list")
    public ResponseEntity<List<MenuDTO.Response>> selectMenuList() {
        return ResponseEntity.ok(menuService.selectMenuList());
    }
}
