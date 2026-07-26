package com.cookmate.cookmate_web.domain.recipe.service;

import com.cookmate.cookmate_web.domain.common.util.KeygenUtil;
import com.cookmate.cookmate_web.domain.file.service.FileService;
import com.cookmate.cookmate_web.domain.global.error.CustomException;
import com.cookmate.cookmate_web.domain.global.error.ErrorCode;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeRequestDTO;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeResponseDTO;
import com.cookmate.cookmate_web.domain.recipe.mapper.RecipeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @file RecipeService.java
 * @description 레시피 정보 서비스
 * @since 2026-01-25
 * @author 강보람
 * @version 1.0
 *
 * <pre>
 * 수정일          수정자          수정내용
 * ----------    ----------    ---------------------------
 * 2026-01-25      강보람       최초 생성
 * </pre>
 */

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeMapper recipeMapper;
    private final FileService fileService;

    /*
    ======================
    레시피 관련
    ======================
     */
    /**
     * 레시피 정보 목록 페이징 및 조건 조회
     * @param request 검색 및 페이징 조건 DTO
     * @return 레시피 목록 및 페이징 정보 응답 DTO
     */
    @Transactional(readOnly = true)
    public RecipeResponseDTO.ListInfo selectRecipeInfoList(RecipeRequestDTO.Search request) {
        // 1개 통합 쿼리로 레시피 목록 페이징 및 totalCount 조회
        List<RecipeResponseDTO.Summary> recipeList = recipeMapper.selectRecipeInfoList(request);

        int totalCount = 0;
        int totalPageCount = 0;

        if (recipeList != null && !recipeList.isEmpty()) {
            for (RecipeResponseDTO.Summary recipe : recipeList) {
                // 메인 이미지 url 조회
                List<String> urls = fileService.getFileUrls(recipe.getFileGrpId());

                String mainImageUrl = null;
                if (!urls.isEmpty()) {
                    mainImageUrl = urls.get(0);
                }
                recipe.setMainImageUrl(mainImageUrl);
            }
            totalCount = recipeList.get(0).getTotalCount();
            totalPageCount = (int) Math.ceil((double) totalCount / request.getPageSize());
        } else {
            recipeList = java.util.List.of();
        }

        return RecipeResponseDTO.ListInfo.builder()
                .totalCount(totalCount)
                .totalPageCount(totalPageCount)
                .page(request.getPage())
                .pageSize(request.getPageSize())
                .list(recipeList)
                .build();
    }

    /**
     * 레시피 정보 상세 조회
     * @param recipeId 레시피 ID
     * @return 레시피 상세 정보
     */
    @Transactional(readOnly = true)
    public RecipeResponseDTO.Detail retrieveRecipeInfo(String recipeId) {
        // 레시피 정보 상세 조회
        RecipeResponseDTO.Detail recipe = recipeMapper.retrieveRecipeInfo(recipeId);
        if (recipe == null) {
            throw new CustomException(ErrorCode.RECIPE_NOT_FOUND);
        }

        // 이미지 url 조회
        List<String> mainImageUrls = fileService.getFileUrls(recipe.getFileGrpId());
        recipe.setMainImageUrls(mainImageUrls);

        // 레시피 재료 목록 조회
        List<RecipeResponseDTO.Ingredient> ingredients = recipeMapper.selectRecipeIngredientList(recipe.getRecipeSeq());
        recipe.setIngredients(ingredients);

        // 레시피 단계 목록 조회
        List<RecipeResponseDTO.Step> steps = recipeMapper.selectRecipeStepList(recipe.getRecipeSeq());
        for (RecipeResponseDTO.Step step : steps) {
            // 레시피 단계 이미지 세팅
            step.setStepImageUrls(fileService.getFileUrls(step.getFileGrpId()));
        }
        recipe.setSteps(steps);

        // 레시피 해시태그 목록 조회
        List<String> hashtags = recipeMapper.selectRecipeHashtags(recipe.getRecipeSeq());
        recipe.setHashtags(hashtags);

        return recipe;
    }

    /**
     * 레시피 정보 등록
     * @param loginId       로그인 ID
     * @param recipe       저장 요청 데이터
     * @param mainImage     메인 사진
     * @param stepImagesMap 단계별 사진 목록
     * @return 레시피 ID
     */
    @Transactional
    public String insertRecipeInfo(String loginId,
                                   RecipeRequestDTO.Recipe recipe,
                                   List<MultipartFile> mainImage,
                                   Map<Integer, List<MultipartFile>> stepImagesMap) {
        String rgtrKey = "testuserkey";

        // 파일 저장
        String mainFileGrpId = null;
        if (mainImage != null && !mainImage.isEmpty()) {
            mainFileGrpId = fileService.saveFile(mainImage, null, rgtrKey);
        }

        String recipeId = KeygenUtil.generateKey();
        recipe.setRecipeId(recipeId);
        recipe.setFileGrpId(mainFileGrpId);
        recipe.setRgtrKey(rgtrKey);

        // 레시피 정보 등록
        recipeMapper.insertRecipeInfo(recipe);
        Long recipeSeq = recipe.getRecipeSeq();

        // 레시피 재료, 단계 정보 등록
        insertRecipeIngredient(recipe, recipeSeq);
        insertRecipeSteps(recipe, stepImagesMap, rgtrKey, recipeSeq);
        insertRecipeHashtags(recipe.getHashtags(), recipeSeq);

        return recipeId;
    }

    /**
     * 레시피 정보 수정
     * @param loginId       로그인 ID
     * @param request       수정 요청 데이터
     * @param mainImages    메인 사진
     * @param stepImagesMap 단계별 사진 목록
     * @return 레시피 ID
     */
    @Transactional
    public Long updateRecipeInfo(String loginId,
                                 RecipeRequestDTO.Recipe request,
                                 List<MultipartFile> mainImages,
                                 Map<Integer, List<MultipartFile>> stepImagesMap) {
        // 레시피 정보 상세 조회
        RecipeResponseDTO.Detail recipe = recipeMapper.retrieveRecipeInfo(request.getRecipeId());
        if (recipe == null) {
            throw new CustomException(ErrorCode.RECIPE_NOT_FOUND);
        }
        Long recipeSeq = recipe.getRecipeSeq();
        request.setRecipeSeq(recipeSeq);

        String mdfrKey = "testuserkey";

        String mainFileGrpId = request.getFileGrpId();

        if (mainFileGrpId != null) {
            // 기존 파일이 있을 경우 수정
            fileService.updateFiles(mainFileGrpId, mainImages, request.getDeleteFileIds(), mdfrKey);
        } else if (mainImages != null && !mainImages.isEmpty()) {
            // 기존 파일이 없을 경우 신규 파일 저장
            mainFileGrpId = fileService.saveFile(mainImages, null, mdfrKey);
        }
        request.setFileGrpId(mainFileGrpId);

        recipeMapper.updateRecipeInfo(request);             // 레시피 정보 수정
        recipeMapper.deleteRecipeIngredientList(recipeSeq); // 레시피 재료 목록 삭제
        recipeMapper.deleteRecipeStepList(recipeSeq);       // 레시피 단계 목록 삭제

        // 레시피 재료, 단계, 해시태그 정보 등록
        insertRecipeIngredient(request, recipeSeq);
        insertRecipeSteps(request, stepImagesMap, mdfrKey, recipeSeq);
        insertRecipeHashtags(request.getHashtags(), recipeSeq);

        return recipe.getRecipeSeq();
    }

    /**
     * 레시피 정보 삭제
     * @param recipeId 레시피 ID
     * @param loginId  로그인 ID
     */
    @Transactional
    public void deleteRecipeInfo(String recipeId, String loginId) {
        // 레시피 정보 상세 조회
        RecipeResponseDTO.Detail recipe = recipeMapper.retrieveRecipeInfo(recipeId);
        if (recipe == null) {
            throw new CustomException(ErrorCode.RECIPE_NOT_FOUND);
        }

        // 레시피 재료, 단계 정보 삭제
        recipeMapper.deleteRecipeIngredientList(recipe.getRecipeSeq());
        recipeMapper.deleteRecipeStepList(recipe.getRecipeSeq());

        // 레시피 정보 삭제
        recipeMapper.deleteRecipeInfo(recipeId);
    }

    /*
    ========================================================
    헬퍼 메소드
    ========================================================
     */
    /**
     * 레시피 재료 정보 등록
     * @param recipe   저장 요청 데이터
     * @param recipeSeq 레시피 시퀀스
     */
    private void insertRecipeIngredient(RecipeRequestDTO.Recipe recipe, Long recipeSeq) {
        if (recipe.getIngredients() != null) {
            for (RecipeRequestDTO.Ingredient ingredient : recipe.getIngredients()) {
                ingredient.setRecipeSeq(recipeSeq);
                recipeMapper.insertRecipeIngredient(ingredient);
            }
        }
    }

    /**
     * 레시피 단계 정보 등록
     * @param recipe       저장 요청 데이터
     * @param stepImagesMap 단계별 사진 목록
     * @param userKey       등록자 키
     * @param recipeSeq     레시피 시퀀스
     */
    private void insertRecipeSteps(RecipeRequestDTO.Recipe recipe, Map<Integer, List<MultipartFile>> stepImagesMap, String userKey, Long recipeSeq) {
        if (recipe.getSteps() != null) {
            List<RecipeRequestDTO.Step> steps = recipe.getSteps();

            for (int i = 0; i < steps.size(); i++) {
                RecipeRequestDTO.Step step = steps.get(i);

                // 단계별 사진 저장
                String stepFileGrpId = step.getFileGrpId();
                List<MultipartFile> stepImages = stepImagesMap.get(i);

                if (stepFileGrpId != null) {
                    // 기존 파일이 있을 경우 수정
                    fileService.updateFiles(stepFileGrpId, stepImages, step.getDeleteFileIds(), userKey);
                } else if (stepImages != null && !stepImages.isEmpty()) {
                    // 기존 파일이 없을 경우 신규 파일 저장
                    stepFileGrpId = fileService.saveFile(stepImages, null, userKey);
                }
                step.setFileGrpId(stepFileGrpId);
                step.setRecipeSeq(recipeSeq);

                // 레시피 단계 정보 등록
                recipeMapper.insertRecipeStep(step);
            }
        }
    }

    /**
     * 레시피 해시태그 정보 등록
     * @param hashtags  해시태그 목록
     * @param recipeSeq 레시피 시퀀스
     */
    private void insertRecipeHashtags(List<String> hashtags, Long recipeSeq) {
        recipeMapper.deleteRecipeHashtags(recipeSeq); // 기존 매핑 삭제
        if (hashtags == null || hashtags.isEmpty()) {
            return;
        }

        for (String tag : hashtags) {
            // 해시태그가 기존에 존재하면 무시, 없으면 생성
            recipeMapper.insertHashtag(KeygenUtil.generateKey(), tag);

            // 해시태그명으로 시퀀스 조회
            Long hstgSeq = recipeMapper.selectHashtagSeqByName(tag);
            if (hstgSeq != null) {
                // 레시피 해시태그 매핑 등록
                recipeMapper.insertRecipeHashtag(recipeSeq, hstgSeq);
            }
        }
    }

    /**
     * 단계별 사진 추출
     * @param recipe          저장 요청 데이터
     * @param multipartRequest 단계별 사진을 추출하기 위한 요청 객체
     * @return 단계별 사진 목록
     */
    public Map<Integer, List<MultipartFile>> extractStepImages(RecipeRequestDTO.Recipe recipe,
                                                               MultipartHttpServletRequest multipartRequest) {
        Map<Integer, List<MultipartFile>> stepImagesMap = new HashMap<>();

        if (recipe.getSteps() != null) {
            for (int i = 0; i < recipe.getSteps().size(); i++) {
                String key = "stepImages_" + i;
                List<MultipartFile> files = multipartRequest.getFiles(key);
                if (!files.isEmpty()) {
                    stepImagesMap.put(i, files);
                }
            }
        }

        return stepImagesMap;
    }
}
