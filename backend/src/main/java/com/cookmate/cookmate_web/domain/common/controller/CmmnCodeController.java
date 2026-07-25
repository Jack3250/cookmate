package com.cookmate.cookmate_web.domain.common.controller;

import com.cookmate.cookmate_web.domain.common.dto.CmmnCodeDTO;
import com.cookmate.cookmate_web.domain.common.service.CmmnCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @file        CmmnCodeController.java
 * @description 공통코드 컨트롤러
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

@RestController
@RequestMapping("/common")
@RequiredArgsConstructor
public class CmmnCodeController {

    private final CmmnCodeService cmmnCodeService;

    /**
     * 공통코드 상세 목록 조회
     * @param request 그룹 코드
     * @return 공통코드 상세 목록
     */
    @GetMapping("/code/{grpCd}")
    public ResponseEntity<List<CmmnCodeDTO.Response>> selectCmmnCodeList(@ModelAttribute CmmnCodeDTO.Request request) {
        return ResponseEntity.ok(cmmnCodeService.selectCmmnCodeList(request));
    }
}
