package com.cookmate.cookmate_web.domain.common.service;

import com.cookmate.cookmate_web.domain.common.dto.CmmnMsgDTO;
import com.cookmate.cookmate_web.domain.common.mapper.CmmnMsgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @file        CmmnMsgService.java
 * @description 공통 메시지 서비스 정의
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

@Service
@RequiredArgsConstructor
public class CmmnMsgService {

    private final CmmnMsgMapper cmmnMsgMapper;

    /**
     * 공통 메세지 목록 전체 조회
     * @return 메세지 목록
     */
    @Transactional(readOnly = true)
    public List<CmmnMsgDTO> selectCmmnMsgList() {
        return cmmnMsgMapper.selectCmmnMsgList();
    }
}
