package com.cookmate.cookmate_web.domain.menu.service;

import com.cookmate.cookmate_web.domain.menu.dto.MenuDTO;
import com.cookmate.cookmate_web.domain.menu.mapper.MenuMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @file        MenuService.java
 * @description 메뉴 서비스
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

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuMapper menuMapper;

    /**
     * 사용 가능한 전체 메뉴 목록 조회
     * @return 전체 메뉴 목록
     */
    public List<MenuDTO.Response> selectMenuList() {
        return menuMapper.selectMenuList();
    }
}
