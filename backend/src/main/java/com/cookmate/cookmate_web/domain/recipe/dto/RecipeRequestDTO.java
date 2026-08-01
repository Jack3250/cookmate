package com.cookmate.cookmate_web.domain.recipe.dto;

import com.cookmate.cookmate_web.domain.common.dto.PageInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @file        RecipeRequestDTO.java
 * @description 레시피 등록, 수정 요청 DTO
 * @author      강보람
 * @since       2026-01-26
 * @version     1.0
 *
 * <pre>
 * 수정일          수정자          수정내용
 * ----------    ----------    ---------------------------
 * 2026-01-26      강보람       최초 생성
 * </pre>
 */
public class RecipeRequestDTO {

    @Getter
    @Setter
    public static class Search extends PageInfoDTO {
        private String categoryCd;        // 카테고리 코드
        private String recipeDifficultCd; // 레시피 난이도 코드
        private String searchKeyword;     // 검색어
        private String dateRange;         // 작성일 기간 (1D, 1W, 1M, 전체: 빈 값 '')
        private String sortType;          // 정렬 기준 (popular, latest, views, comment)
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Recipe {
        private Long recipeSeq;            // 레시피 시퀀스
        private String recipeId;           // 레시피 ID
        private String recipeTtl;          // 레시피 제목
        private String dishNm;             // 음식 명
        private String recipeCn;           // 레시피 내용
        private Integer cookingTime;       // 조리 시간
        private String recipeDifficultCd;  // 레시피 난이도 코드
        private String categoryCd;         // 카테고리 코드
        private String recipeStatus;       // 레시피 상태
        private String openYn;             // 공개 여부
        private String fileGrpId;          // 파일 그룹 ID
        private String rgtrKey;            // 등록자 키
        private String mdfrKey;            // 수정자 키

        private List<String> deleteFileIds;   // 삭제 파일 ID

        private List<String> hashtags;        // 해시태그 목록
        private List<Ingredient> ingredients; // 재료
        private List<Step> steps;             // 단계
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Ingredient {
        private Long recipeSeq;  // 레시피 시퀀스
        private String ingrdNm;  // 재료 명
        private Float ingrdAmt;  // 재료 양
        private String ingrdUnt; // 재료 단위
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Step {
        private Long recipeSeq;   // 레시피 시퀀스
        private Integer stepNo;   // 단계 번호
        private String stepCn;    // 단계 내용
        private String fileGrpId; // 파일 그룹 ID

        private List<String> deleteFileIds; // 삭제 파일 ID
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HashtagDTO {
        private String hstgId;
        private String tagNm;
        private String rgtrKey;
        private Long recipeSeq;
        private Long hstgSeq;
    }
}
