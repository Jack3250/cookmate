package com.cookmate.cookmate_web.domain.global.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @file        LoginUser.java
 * @description 로그인 세션 유저 키 추출용 어노테이션
 * @author      강보람
 * @since       2026-08-01
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-08-01      강보람          최초 생성
 * </pre>
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginUser {
}
