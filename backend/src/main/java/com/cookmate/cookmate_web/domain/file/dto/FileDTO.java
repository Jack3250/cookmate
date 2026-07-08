package com.cookmate.cookmate_web.domain.file.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @file        FileDTO.java
 * @description 파일 DTO 정의
 * @author      강보람
 * @since       2026-03-05
 * @version     1.0
 *
 * <pre>
 * 수정일          수정자           수정내용
 * -------------------------------------------------------
 * 2026-03-05     강보람           최초 생성                 
 * </pre>
 */
 
public class FileDTO {

    @Getter
    @Setter
    public static class FileGroupInfo {
        private Long fileGrpSeq;
        private String fileGrpId;
        private String filePath;
        private String rgtrKey;
        private String regDt;
        private String delYn;
    }

    @Getter
    @Setter
    public static class FileDetailInfo {
        private Long fileGrpSeq;
        private Long fileSeq;
        private String fileId;
        private String fileOrgNm;
        private String fileSaveNm;
        private String fileExt;
        private Long fileSize;
        private Integer fileOdr;
        private String rgtrKey;
        private String regDt;
        private String delYn;
        private String delDt;
    }

}
