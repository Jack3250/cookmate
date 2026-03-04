package com.cookmate.cookmate_web.domain.common.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @file        CmmnMsgDTO.java
 * @description 공통 메시지 DTO 정의
 * @author      강보람
 * @since       2026-03-05
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-17      강보람          최초 생성
 * 2026-03-05      강보람          JPA -> MyBatis 변경
 * </pre>
 */

@Getter
@Setter
public class CmmnMsgDTO {
    private String msgCd;
    private String msgCn;
    private String msgTy;
    private String rgtrKey;

    private String regDt;

    private String mdfrKey;
    private String mdfcnDt;
}
