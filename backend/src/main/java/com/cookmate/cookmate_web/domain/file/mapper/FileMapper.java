package com.cookmate.cookmate_web.domain.file.mapper;

import com.cookmate.cookmate_web.domain.file.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @file        FileMapper.java
 * @description 파일 Mapper 정의
 * @author      강보람
 * @since       2026-03-05
 * @version     1.0
 *
 * <pre>
 * 수정일          수정자          수정내용
 * ----------    ----------    ---------------------------
 * 2026-03-05      강보람       최초 생성
 * </pre>
 */

@Mapper
public interface FileMapper {
    /*
     * =======================
     * 파일 그룹
     * =======================
     */
    /**
     * 파일 그룹 등록
     * @param fileGroupInfo 파일 그룹 정보
     */
    void insertFileGroup(FileDTO.FileGroupInfo fileGroupInfo);

    /**
     * 파일 그룹 조회
     * @param fileGrpId 파일 그룹 ID
     * @return 파일 그룹 정보
     */
    FileDTO.FileGroupInfo selectFileGroup(String fileGrpId);

    /**
     * 파일 그룹 삭제
     * @param fileGrpId 파일 그룹 ID
     */
    void deleteFileGroup(String fileGrpId);

    /*
     * =======================
     * 파일 상세
     * =======================
     */
    /**
     * 파일 상세 등록
     * @param fileDetailInfo 파일 상세 정보
     */
    void insertFileDetail(FileDTO.FileDetailInfo fileDetailInfo);

    /**
     * 해당 그룹 미삭제 파일 수 조회
     * @param fileGrpSeq 파일 그룹 Seq
     * @return 파일 상세 정보
     */
    int countActiveFiles(Long fileGrpSeq);

    /**
     * 파일 목록 조회
     * @param fileGrpSeq 파일 그룹 Seq
     * @return 파일 목록
     */
    List<FileDTO.FileDetailInfo> selectAllFiles(Long fileGrpSeq);

    /**
     * 파일 상세 조회
     * @param fileId 파일 ID
     * @return 파일 상세 정보
     */
    FileDTO.FileDetailInfo selectFileDetail(String fileId);

    /**
     * 파일 삭제
     * @param fileId 파일 ID
     */
    void deleteFileDetail(String fileId);

    /**
     * 파일 그룹에 해당하는 파일 삭제
     * @param fileGrpSeq 파일 그룹 Seq
     */
    void deleteAllFileDetail(Long fileGrpSeq);

    /**
     * 삭제한지 오래된 파일 조회
     * @param standardDt 기준일
     * @return 삭제한지 오래된 파일 목록
     */
    List<FileDTO.FileDetailInfo> selectOldDeletedFiles(String standardDt);

    /**
     * 파일 물리 삭제
     * @param fileId 파일 ID
     */
    void deletePhysicalFileDetail(String fileId);
}
