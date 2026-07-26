package com.cookmate.cookmate_web.domain.file.scheduler;

import com.cookmate.cookmate_web.domain.file.dto.FileDTO;
import com.cookmate.cookmate_web.domain.file.mapper.FileMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * @file        FileCleanupScheduler.java
 * @description 파일 삭제 스케줄러
 * @author      강보람
 * @since       2026-01-25
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-25      강보람          최초 생성
 * </pre>
 */

@Slf4j
@Component
@RequiredArgsConstructor
public class FileDeleteScheduler {

    private final FileMapper fileMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 새벽 3시
    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void deleteExpiredFiles() {
        log.warn("=== 파일 삭제 스케줄러 시작 ===");
        // 기준일 설정 (30일 전)
        LocalDateTime threshold = LocalDateTime.now().minusDays(30);
        String standardDt = threshold.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // 삭제 대상 조회
        List<FileDTO.FileDetailInfo> oldFiles = fileMapper.selectOldDeletedFiles(standardDt);
        log.warn("삭제 대상 파일 개수: {}", oldFiles.size());

        for (FileDTO.FileDetailInfo fileDetail : oldFiles) {
            try {
                FileDTO.FileGroupInfo fileGroup = fileMapper.selectFileGroupBySeq(fileDetail.getFileGrpSeq());

                if (fileGroup != null) {
                    String fullPath = uploadDir + fileGroup.getFilePath() + File.separator + fileDetail.getFileSaveNm();
                    File file = new File(fullPath);

                    if (file.exists()) {
                        if (file.delete()) {
                            log.warn("디스크 파일 삭제 성공 : {}", fullPath);
                        } else {
                            log.warn("디스크 파일 삭제 실패 : {}", fullPath);
                        }
                    } else {
                        log.warn("파일이 디스크에 존재하지 않음 : {}", fullPath);
                    }
                }

                // 물리삭제
                fileMapper.deletePhysicalFileDetail(fileDetail.getFileId());

            } catch (Exception e) {
                log.error("파일 삭제 중 오류 발생 ID: {}", fileDetail.getFileId(), e);
            }
        }
        log.warn("=== 물리적 파일 삭제 스케줄러 종료 ===");
    }
}
