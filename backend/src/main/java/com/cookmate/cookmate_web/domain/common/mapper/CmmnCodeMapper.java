package com.cookmate.cookmate_web.domain.common.mapper;

import com.cookmate.cookmate_web.domain.common.dto.CmmnCodeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @file        CmmnCodeMapper.java
 * @description 공통코드 매퍼
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

@Mapper
public interface CmmnCodeMapper {

    /**
     * 공통코드 상세 목록 조회
     * @param request 그룹 코드
     * @return 공통코드 상세 목록
     */
    List<CmmnCodeDTO.Response> selectCmmnCodeList(CmmnCodeDTO.Request request);
}
