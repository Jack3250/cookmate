package com.cookmate.cookmate_web.domain.recipe.controller;

import com.cookmate.cookmate_web.domain.global.annotation.LoginUser;
import com.cookmate.cookmate_web.domain.global.error.CustomException;
import com.cookmate.cookmate_web.domain.global.error.ErrorCode;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeRequestDTO;
import com.cookmate.cookmate_web.domain.recipe.dto.RecipeResponseDTO;
import com.cookmate.cookmate_web.domain.recipe.service.RecipeService;
import com.cookmate.cookmate_web.domain.users.dto.SessionUser;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

/**
 * @file        RecipeController.java
 * @description 레시피 정보 컨트롤러
 * @author      강보람
 * @since       2026-01-25
 * @version     1.0
 *
 * <pre>
 * 수정일          수정자          수정내용
 * ----------    ----------    ---------------------------
 * 2026-01-25      강보람       최초 생성
 * </pre>
 */

@RestController
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    /**
     * 레시피 정보 목록 페이징 및 조건 조회
     * @param request 검색 및 페이징 파라미터 DTO
     * @return 레시피 목록 및 페이징 응답 DTO
     */
    @GetMapping("/list")
    public ResponseEntity<RecipeResponseDTO.ListInfo> selectRecipeInfoList(@ModelAttribute RecipeRequestDTO.Search request) {
        return ResponseEntity.ok(recipeService.selectRecipeInfoList(request));
    }

    /**
     * 임시저장 레시피 목록 조회
     * @param userKey 세션 사용자 키
     * @return 임시저장 레시피 목록
     */
    @GetMapping("/selectTempRecipeList")
    public ResponseEntity<List<RecipeResponseDTO.Summary>> selectTempRecipeList(@LoginUser String userKey) {
        return ResponseEntity.ok(recipeService.selectTempRecipeList(userKey));
    }

    /**
     * 레시피 정보 등록
     * @param userKey 세션 사용자 키
     * @param request 등록 요청 데이터
     * @param mainImage 메인 사진
     * @param multipartRequest 단계별 사진을 추출하기 위한 요청 객체
     * @return 레시피 ID
     */
    @PostMapping(value = "/insert", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> insertRecipeInfo(
            @LoginUser String userKey,
            @RequestPart(value = "data") RecipeRequestDTO.Recipe request,
            @RequestPart(value = "mainImage", required = false) List<MultipartFile> mainImage,
            MultipartHttpServletRequest multipartRequest
    ) {
        // 단계별 사진 추출
        Map<Integer, List<MultipartFile>> stepImagesMap = recipeService.extractStepImages(request, multipartRequest);

        return ResponseEntity.ok(recipeService.insertRecipeInfo(userKey, request, mainImage, stepImagesMap));
    }

    /**
     * 레시피 정보 상세 조회
     * @param recipeId 레시피 ID
     * @param userKey 세션 사용자 키
     * @return 레시피 상세 정보
     */
    @GetMapping("/detail/{recipeId}")
    public ResponseEntity<RecipeResponseDTO.Detail> retrieveRecipeInfo(@PathVariable String recipeId, @LoginUser String userKey) {
        return ResponseEntity.ok(recipeService.retrieveRecipeInfo(recipeId, userKey));
    }

    /**
     * 레시피 정보 수정
     * @param userKey 세션 사용자 키
     * @param request 수정 요청 데이터
     * @param mainImage 메인 사진
     * @param multipartRequest 단계별 사진을 추출하기 위한 요청 객체
     * @return 레시피 ID
     */
    @PutMapping(value = "/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> updateRecipeInfo(
            @LoginUser String userKey,
            @RequestPart(value = "data") RecipeRequestDTO.Recipe request,
            @RequestPart(value = "mainImage", required = false) List<MultipartFile> mainImage,
            MultipartHttpServletRequest multipartRequest
    ) {
        // 단계별 사진 추출
        Map<Integer, List<MultipartFile>> stepImagesMap = recipeService.extractStepImages(request, multipartRequest);

        return ResponseEntity.ok(recipeService.updateRecipeInfo(userKey, request, mainImage, stepImagesMap));
    }

    /**
     * 레시피 정보 삭제
     * @param recipeId 레시피 ID
     * @param userKey 세션 사용자 키
     * @return 삭제 성공 여부
     */
    @DeleteMapping("/delete/{recipeId}")
    public ResponseEntity<Void> deleteRecipeInfo(@PathVariable String recipeId, @LoginUser String userKey) {
        recipeService.deleteRecipeInfo(recipeId, userKey);
        return ResponseEntity.ok().build();
    }

    /**
     * 레시피 좋아요 토글
     * @param recipeId 레시피 ID
     * @param userKey 세션 사용자 키
     * @return 현재 좋아요 상태 (true: 좋아요, false: 취소)
     */
    @PostMapping("/{recipeId}/like")
    public ResponseEntity<Boolean> toggleRecipeLike(@PathVariable String recipeId, @LoginUser String userKey) {
        return ResponseEntity.ok(recipeService.toggleRecipeLike(recipeId, userKey));
    }
}
