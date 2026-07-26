package com.cookmate.cookmate_web.domain.recipe.mapper;

import com.cookmate.cookmate_web.domain.common.dto.LikeDTO;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeRequestDTO;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeResponseDTO;
import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @file        RecipeMapper.java
 * @description 레시피 정보 Mapper
 * @author      강보람
 * @since       2026-07-08
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-07-08      강보람          최초 생성
 * </pre>
 */
@Mapper
public interface RecipeMapper {

    /*
    ======================
    레시피 관련
    ======================
     */
    /**
     * 레시피 정보 목록 페이징 및 조건 조회
     * @param request 검색 및 페이징 조건 DTO
     * @return 레시피 페이징 목록
     */
    List<RecipeResponseDTO.Summary> selectRecipeInfoList(RecipeRequestDTO.Search request);

    /**
     * 레시피 정보 상세 조회
     * @param recipeId 레시피 ID
     * @return 레시피 상세 정보
     */
    RecipeResponseDTO.Detail retrieveRecipeInfo(String recipeId);

    /**
     * 레시피 정보 등록
     * @param recipe 레시피 등록 정보
     * @return 생성된 레시피 시퀀스
     */
    int insertRecipeInfo(RecipeRequestDTO.Recipe recipe);

    /**
     * 레시피 정보 수정
     * @param recipe 수정할 레시피 정보
     */
    void updateRecipeInfo(RecipeRequestDTO.Recipe recipe);

    /**
     * 레시피 정보 삭제
     * @param recipeId 레시피 ID
     */
    void deleteRecipeInfo(String recipeId);

    /*
    ======================
    재료 관련
    ======================
     */
    /**
     * 레시피 재료 목록 조회
     * @param recipeSeq 레시피 시퀀스
     * @return 재료 목록
     */
    List<RecipeResponseDTO.Ingredient> selectRecipeIngredientList(Long recipeSeq);

    /**
     * 레시피 재료 정보 등록
     * @param ingredient 재료 정보
     */
    void insertRecipeIngredient(RecipeRequestDTO.Ingredient ingredient);

    /**
     * 레시피 재료 정보 삭제
     * @param recipeSeq 레시피 시퀀스
     */
    void deleteRecipeIngredientList(long recipeSeq);

    /*
    ======================
    조리 단계 관련
    ======================
     */
    /**
     * 레시피 단계 목록 조회
     * @param recipeSeq 레시피 시퀀스
     * @return 단계 목록
     */
    List<RecipeResponseDTO.Step> selectRecipeStepList(long recipeSeq);

    /**
     * 레시피 단계 정보 등록
     * @param step 단계 정보
     */
    void insertRecipeStep(RecipeRequestDTO.Step step);

    /**
     * 레시피 단계 정보 삭제
     * @param recipeSeq 레시피 시퀀스
     */
    void deleteRecipeStepList(long recipeSeq);

    /*
    ======================
    해시태그 관련
    ======================
     */
    /**
     * 해시태그명으로 시퀀스 조회
     * @param tagNm 해시태그명
     * @return 해시태그 시퀀스
     */
    Long selectHashtagSeqByName(String tagNm);

    /**
     * 해시태그 등록 (존재하면 무시)
     * @param tagNm 해시태그명
     */
    void insertHashtag(@Param("hstgId") String hstgId, @Param("tagNm") String tagNm);

    /**
     * 레시피 해시태그 목록 조회
     * @param recipeSeq 레시피 시퀀스
     * @return 해시태그 이름 목록
     */
    List<String> selectRecipeHashtags(Long recipeSeq);

    /**
     * 레시피 해시태그 매핑 등록
     * @param recipeSeq 레시피 시퀀스
     * @param hstgSeq 해시태그 시퀀스
     */
    void insertRecipeHashtag(@Param("recipeSeq") Long recipeSeq, @Param("hstgSeq") Long hstgSeq);

    /**
     * 레시피 해시태그 매핑 전체 삭제
     * @param recipeSeq 레시피 시퀀스
     */
    void deleteRecipeHashtags(Long recipeSeq);

    /*
    ======================
    좋아요 관련
    ======================
     */
    /**
     * 사용자 좋아요 상태 확인
     * @param request 좋아요 토글 요청 데이터
     * @return 1: 좋아요, -1: 좋아요 취소, null: 내역 없음
     */
    LikeDTO.Response checkUserLike(LikeDTO.Request request);

    /**
     * 좋아요 신규 등록 및 상태 변경
     * @param request 좋아요 토글 요청 데이터
     * @return 변경된 좋아요 상태
     */
    LikeDTO.Response upsertLike(LikeDTO.Request request);
}
