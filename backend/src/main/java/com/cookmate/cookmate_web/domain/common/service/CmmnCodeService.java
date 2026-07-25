package com.cookmate.cookmate_web.domain.common.service;

import com.cookmate.cookmate_web.domain.common.dto.CmmnCodeDTO;
import com.cookmate.cookmate_web.domain.common.mapper.CmmnCodeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @file        CmmnCodeService.java
 * @description 공통코드 서비스
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

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CmmnCodeService {

    private final CmmnCodeMapper cmmnCodeMapper;

    /**
     * 공통코드 상세 목록 조회
     * @param request 그룹 코드
     * @return 공통코드 상세 목록
     */
    public List<CmmnCodeDTO.Response> selectCmmnCodeList(CmmnCodeDTO.Request request) {
        return cmmnCodeMapper.selectCmmnCodeList(request);
    }
}
