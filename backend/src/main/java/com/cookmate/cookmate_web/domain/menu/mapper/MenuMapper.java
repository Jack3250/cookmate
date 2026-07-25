package com.cookmate.cookmate_web.domain.menu.mapper;

import com.cookmate.cookmate_web.domain.menu.dto.MenuDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @file        MenuMapper.java
 * @description 메뉴 매퍼
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

@Mapper
public interface MenuMapper {

    /**
     * 사용 가능한 전체 메뉴 목록 조회
     * @return 전체 메뉴 목록
     */
    List<MenuDTO.Response> selectMenuList();
}
