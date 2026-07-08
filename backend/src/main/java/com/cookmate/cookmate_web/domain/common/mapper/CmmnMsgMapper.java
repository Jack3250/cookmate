package com.cookmate.cookmate_web.domain.common.mapper;

import com.cookmate.cookmate_web.domain.common.dto.CmmnMsgDTO;
import org.apache.ibatis.annotations.Mapper;

/**
 * @file        CmmnMsgMapper.java
 * @description 공통 메시지 Mapper 정의
 * @author      강보람
 * @since       2026-03-05
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-03-05      강보람          최초 생성
 * </pre>
 */

@Mapper
public interface CmmnMsgMapper {

    /**
     * 공통 메세지 단건 조회
     * @param msgCd 메세지 코드
     * @return 메세지 정보
     */
    CmmnMsgDTO selectCmmnMsg(String msgCd);
}
