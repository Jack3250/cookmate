package com.cookmate.cookmate_web.domain.menu.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @file        MenuDTO.java
 * @description 메뉴 DTO
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
public class MenuDTO {

    @Getter
    @Setter
    public static class Response {
        private String menuId;     // 메뉴 ID
        private String upMenuId;   // 상위 메뉴 ID
        private String menuNm;     // 메뉴명
        private String menuUrl;    // 메뉴 URL
        private String iconNm;     // 아이콘 명
        private String categoryCd; // 카테고리 코드
        private String menuGrpCd;  // 메뉴 그룹 코드
        private int sortOrd;       // 정렬 순서
    }
}
