package com.cookmate.cookmate_web.domain.common.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @file        CmmnCodeDTO.java
 * @description 공통코드 DTO
 * @author      강보람
 * @since       2026-07-16
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-07-16      강보람          최초 생성
 * </pre>
 */

public class CmmnCodeDTO {

    @Getter
    @Setter
    public static class Request {
        private String grpCd;
    }

    @Getter
    @Setter
    public static class Response {
        private String cd;
        private String cdNm;
        private int sortOrd;
    }
}
