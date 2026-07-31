package com.cookmate.cookmate_web.domain.common.controller;

import com.cookmate.cookmate_web.domain.common.dto.CmmnMsgDTO;
import com.cookmate.cookmate_web.domain.common.service.CmmnMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @file        CmmnMsgController.java
 * @description 공통 메시지 컨트롤러 정의
 * @author      강보람
 * @since       2026-07-31
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-07-31      강보람          최초 생성
 * </pre>
 */

@RestController
@RequestMapping("/common/messages")
@RequiredArgsConstructor
public class CmmnMsgController {

    private final CmmnMsgService cmmnMsgService;

    /**
     * 공통 메세지 목록 전체 조회
     * @return 메세지 목록
     */
    @GetMapping
    public ResponseEntity<List<CmmnMsgDTO>> selectCmmnMsgList() {
        return ResponseEntity.ok(cmmnMsgService.selectCmmnMsgList());
    }
}
