package com.cookmate.cookmate_web.domain.recipe.mapper;

import com.cookmate.cookmate_web.domain.recipe.dto.RecipeRequestDTO;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeResponseDTO;
import org.apache.ibatis.annotations.Mapper;

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

    /**
     * 레시피 정보 목록 페이징 및 조건 조회
     * @param request 검색 및 페이징 조건 DTO
     * @return 레시피 페이징 목록
     */
    List<RecipeResponseDTO.Summary> selectRecipeInfoList(RecipeRequestDTO.Search request);

    /**
     * 레시피 정보 등록
     * @param recipe 레시피 등록 정보
     * @return 생성된 레시피 시퀀스
     */
    int insertRecipeInfo(RecipeRequestDTO.Recipe recipe);

    /**
     * 레시피 재료 정보 등록
     * @param ingredient 재료 정보
     */
    void insertRecipeIngredient(RecipeRequestDTO.Ingredient ingredient);

    /**
     * 레시피 단계 정보 등록
     * @param step 단계 정보
     */
    void insertRecipeStep(RecipeRequestDTO.Step step);

    /**
     * 레시피 정보 상세 조회
     * @param recipeId 레시피 ID
     * @return 레시피 상세 정보
     */
    RecipeResponseDTO.Detail retrieveRecipeInfo(String recipeId);

    /**
     * 레시피 재료 목록 조회
     * @param recipeSeq 레시피 시퀀스
     * @return 재료 목록
     */
    List<RecipeResponseDTO.Ingredient> selectRecipeIngredientList(long recipeSeq);

    /**
     * 레시피 단계 목록 조회
     * @param recipeSeq 레시피 시퀀스
     * @return 단계 목록
     */
    List<RecipeResponseDTO.Step> selectRecipeStepList(long recipeSeq);

    /**
     * 레시피 정보 수정
     * @param recipe 수정할 레시피 정보
     */
    void updateRecipeInfo(RecipeRequestDTO.Recipe recipe);

    /**
     * 레시피 재료 정보 삭제
     * @param recipeSeq 레시피 시퀀스
     */
    void deleteRecipeIngredientList(long recipeSeq);

    /**
     * 레시피 단계 정보 삭제
     * @param recipeSeq 레시피 시퀀스
     */
    void deleteRecipeStepList(long recipeSeq);

    /**
     * 레시피 정보 삭제
     * @param recipeId 레시피 ID
     */
    void deleteRecipeInfo(String recipeId);
}
