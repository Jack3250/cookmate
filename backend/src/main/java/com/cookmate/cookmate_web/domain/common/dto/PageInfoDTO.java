package com.cookmate.cookmate_web.domain.common.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @file        PageInfoDTO.java
 * @description 공통 페이징 정보 DTO
 * @author      강보람
 * @since       2026-07-26
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-07-26      강보람          최초 생성
 * </pre>
 */

@Getter
@Setter
public class PageInfoDTO {
    private int page = 1;           // 현재 페이지
    private int pageSize = 9;       // 출력 수
    private int totalCount = 0;     // 전체 건 수
    private int totalPageCount = 0; // 전체 페이지 수

    /**
     * SQL LIMIT OFFSET 계산 메소드
     * @return offset 위치
     */
    public int getOffset() {
        return (this.page - 1) * this.pageSize;
    }
}
