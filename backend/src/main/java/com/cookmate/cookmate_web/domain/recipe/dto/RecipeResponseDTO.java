package com.cookmate.cookmate_web.domain.recipe.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @file        RecipeResponseDTO.java
 * @description 레시피 응답 DTO
 * @author      강보람
 * @since       2026-01-26
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-26      강보람          최초 생성
 * </pre>
 */
public class RecipeResponseDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Summary {
        private int totalCount;           // 총 데이터 건수
        private String recipeId;          // 레시피 ID
        private String recipeTtl;         // 레시피 제목
        private String dishNm;            // 음식 명
        private String writerName;        // 작성자 명
        private Integer viewCnt;          // 조회 수
        private Integer likeCnt;          // 좋아요 수
        private String categoryCd;        // 카테고리 코드
        private String recipeDifficultCd; // 레시피 난이도 코드
        private LocalDateTime regDt;      // 등록 일시
        private String mainImageUrl;      // 메인 이미지 URL
        private String fileGrpId;         // 파일 그룹 ID
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ListInfo {
        private int totalCount;     // 전체 데이터 개수
        private int totalPageCount; // 전체 페이지 개수
        private int page;           // 현재 페이지 번호
        private int pageSize;       // 페이지당 출력 개수
        private List<Summary> list; // 목록 데이터
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Detail {
        private Long recipeSeq;           // 레시피 시퀀스
        private String recipeId;          // 레시피 ID
        private String recipeTtl;         // 레시피 제목
        private String dishNm;            // 음식 명
        private String recipeCn;          // 레시피 내용
        private Integer cookingTime;      // 조리 시간
        private String recipeDifficultCd; // 레시피 난이도 코드
        private String categoryCd;        // 카테고리 코드
        private Integer viewCnt;          // 조회 수
        private Integer likeCnt;          // 좋아요 수
        private Boolean isLiked;          // 좋아요 여부
        private String writerName;        // 작성자 명
        private LocalDateTime regDt;      // 등록 일시
        private String recipeStatus;      // 레시피 상태
        private String openYn;            // 공개 여부
        private String fileGrpId;         // 파일 그룹 ID

        private List<String> hashtags;        // 해시태그 목록
        private List<String> mainImageUrls;   // 메인 이미지 URL
        private List<Ingredient> ingredients; // 재료
        private List<Step> steps;             // 단계
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Ingredient {
        private String ingrdNm;  // 재료 명
        private Float ingrdAmt;  // 재료 양
        private String ingrdUnt; // 재료 단위
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Step {
        private Integer stepNo;   // 단계 번호
        private String stepCn;    // 단계 내용
        private String fileGrpId; // 파일 그룹 ID

        private List<String> stepImageUrls; // 단계 이미지 URL
    }
}
