package com.cookmate.cookmate_web.domain.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @file        LikeDTO.java
 * @description 좋아요 DTO 정의
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
public class LikeDTO {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private Long tgtSeq;
        private String tgtTy;
        private String userKey;
        private String delYn;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Integer likeStatus;
    }
}
