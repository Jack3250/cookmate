package com.cookmate.cookmate_web.domain.file.service;

import com.cookmate.cookmate_web.domain.common.util.KeygenUtil;
import com.cookmate.cookmate_web.domain.file.dto.FileDTO;
import com.cookmate.cookmate_web.domain.file.mapper.FileMapper;
import com.cookmate.cookmate_web.domain.global.error.CustomException;
import com.cookmate.cookmate_web.domain.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @file        FileService.java
 * @description 파일 서비스
 * @since       2026-01-22
 * @author      강보람
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-22      강보람          최초 생성
 * </pre>
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {

    private final FileMapper fileMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    /**
     * 파일 저장
     * @param files 파일
     * @param fileGrpId 파일 그룹 ID
     * @param rgtrKey 등록자 키
     * @return 파일 그룹 ID
     */
    @Transactional
    public String saveFile(List<MultipartFile> files, String fileGrpId, String rgtrKey) {

        if (files == null || files.isEmpty()) {
            return fileGrpId;
        }

        FileDTO.FileGroupInfo fileGroupInfo;
        String folderPath;

        // FileGroup 조회 또는 생성
        if (fileGrpId == null) {
            folderPath = getFolder();

            fileGroupInfo = new FileDTO.FileGroupInfo();

            fileGroupInfo.setFileGrpId(KeygenUtil.generateKey());
            fileGroupInfo.setFilePath(folderPath);
            fileGroupInfo.setRgtrKey(rgtrKey);

            fileMapper.insertFileGroup(fileGroupInfo);
        } else { // 기존 파일 그룹 ID가 있을 경우
            fileGroupInfo = fileMapper.selectFileGroup(fileGrpId);
            if (fileGroupInfo == null) {
                throw new CustomException(ErrorCode.FILE_NOT_FOUND);
            }
            folderPath = fileGroupInfo.getFilePath();
        }

        // 디렉토리 확인 및 생성
        File directory = new File(uploadDir, folderPath);
        if (!directory.exists()) {
            boolean isCreate = directory.mkdirs();
            if (!isCreate) {
                log.warn("디렉토리 생성 실패: {}", directory.getAbsolutePath());
            }
        }

        // 순번 계산 (기존 개수 + 1)
        int fileOdr = fileMapper.countActiveFiles(fileGroupInfo.getFileGrpSeq()) + 1;

        // 파일 저장 반복
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            String fileOrgNm = file.getOriginalFilename();
            String fileExt = getExtension(fileOrgNm);
            String fileSaveNm = UUID.randomUUID() + "." + fileExt;

            // 물리 저장
            File saveFile = new File(directory, fileSaveNm);
            try {
                file.transferTo(saveFile);
            } catch (IOException e) {
                throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
            }

            FileDTO.FileDetailInfo fileDetail = new FileDTO.FileDetailInfo();

            fileDetail.setFileGrpSeq(fileGroupInfo.getFileGrpSeq()); // 연관된 파일 그룹의 PK
            fileDetail.setFileId(KeygenUtil.generateKey());
            fileDetail.setFileOrgNm(fileOrgNm);
            fileDetail.setFileSaveNm(fileSaveNm);
            fileDetail.setFileExt(fileExt);
            fileDetail.setFileSize(file.getSize());
            fileDetail.setFileOdr(fileOdr++);
            fileDetail.setRgtrKey(rgtrKey);

            fileMapper.insertFileDetail(fileDetail);
        }

        return fileGroupInfo.getFileGrpId();
    }

    /**
     * 파일 상세 조회
     * @param fileId 파일 Id
     * @return 파일 상세 정보
     */
    public FileDTO.FileDetailInfo getFileDetail(String fileId) {
        FileDTO.FileDetailInfo fileDetail = fileMapper.selectFileDetail(fileId);
        if (fileDetail == null) {
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);
        }
        return fileDetail;
    }

    /**
     * 파일 객체 조회
     * @param fileId 파일 Id
     * @return 파일 객체
     */
    public File getFile(String fileId) {
        FileDTO.FileDetailInfo fileDetail = getFileDetail(fileId);

        // 연관된 그룹 정보를 PK(fileGrpId)로 조회
        FileDTO.FileGroupInfo fileGroup = fileMapper.selectFileGroup(fileDetail.getFileId());
        if (fileGroup == null) {
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);
        }

        String fullPath = uploadDir + fileGroup.getFilePath() + File.separator + fileDetail.getFileSaveNm();

        File file = new File(fullPath);
        if (!file.exists()) {
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);
        }
        return file;
    }

    /**
     * 단일 파일 삭제
     * @param fileId 파일 ID
     */
    @Transactional
    public void deleteFile(String fileId) {
        // 이미 삭제된 파일인지 체크
        FileDTO.FileDetailInfo fileDetail = fileMapper.selectFileDetail(fileId);
        if (fileDetail == null) {
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);
        }

        // 명시적 파일 삭제 처리 (UPDATE DEL_YN = 'Y')
        fileMapper.deleteFileDetail(fileId);
    }

    /**
     * 파일 그룹 전체 삭제
     * @param fileGrpId 파일 그룹 ID
     */
    @Transactional
    public void deleteFileGroup(String fileGrpId) {
        // 그룹 존재 확인
        FileDTO.FileGroupInfo fileGroup = fileMapper.selectFileGroup(fileGrpId);
        if (fileGroup == null) {
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);
        }

        // 하위 파일들 일괄 삭제
        fileMapper.deleteAllFileDetail(fileGroup.getFileGrpSeq());

        // 그룹 삭제
        fileMapper.deleteFileGroup(fileGrpId);
    }

    /**
     * 파일 수정
     * @param fileGrpId 파일 그룹 ID
     * @param newFiles 새로 추가된 파일 목록
     * @param deleteFiles 삭제 요청된 파일 목록
     * @param rgtrKey 등록자 키
     */
    @Transactional
    public void updateFiles(String fileGrpId, List<MultipartFile> newFiles, List<String> deleteFiles, String rgtrKey) {
        // 삭제 요청된 파일들 처리
        if (deleteFiles != null && !deleteFiles.isEmpty()) {
            for (String fileId : deleteFiles) {
                deleteFile(fileId);
            }
        }

        // 새로 추가된 파일들 저장
        if (newFiles != null && !newFiles.isEmpty()) {
            saveFile(newFiles, fileGrpId, rgtrKey); // 기존 saveFile 재활용
        }
    }

    /**
     * 파일 URL 목록 조회
     * @param fileGrpId 파일 그룹 ID
     * @return 파일 URL 목록
     */
    public List<String> getFileUrls(String fileGrpId) {
        List<String> result = new ArrayList<>();

        if (fileGrpId == null || fileGrpId.isEmpty()) {
            return result;
        }

        FileDTO.FileGroupInfo fileGroup = fileMapper.selectFileGroup(fileGrpId);
        if (fileGroup == null) {
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);
        }

        List<FileDTO.FileDetailInfo> fileDetailList = fileMapper.selectAllFiles(fileGroup.getFileGrpSeq());

        for(FileDTO.FileDetailInfo fileDetail : fileDetailList) {
            String fileUrls = "/files/view/" + fileDetail.getFileId();
            result.add(fileUrls);
        }

        return result;
    }

    /*
    ========================================================
    헬퍼 메소드
    ========================================================
     */

    /**
     * 오늘 날짜 경로 추출 함수
     * @return yyyy/MM/dd 형식의 오늘 날짜
     */
    private String getFolder() {
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        return dateStr.replace("/", File.separator);
    }

    /**
     * 확장자 추출 함수
     * @param fileName 저장 파일명
     * @return 확장자
     */
    private String getExtension(String fileName) {
        // 확장자 없는 경우 기본값
        if (!StringUtils.hasText(fileName) || fileName.lastIndexOf(".") == -1) {
            return "bin";
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}