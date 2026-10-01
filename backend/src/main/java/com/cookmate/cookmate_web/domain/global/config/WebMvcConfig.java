package com.cookmate.cookmate_web.domain.global.config;

import com.cookmate.cookmate_web.domain.global.resolver.LoginUserArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * @file        WebMvcConfig.java
 * @description MVC Config 정의
 * @author      강보람
 * @since       2026-01-18
 * @version     1.0
 *
 * <pre>
 * 수정일           수정자          수정내용
 * -------------------------------------------------------
 * 2026-01-18      강보람          최초 생성
 * </pre>
 */

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final LoginUserArgumentResolver loginUserArgumentResolver;
    private final DatabaseMessageSource databaseMessageSource;

    /**
     * Bean Validation 메시지만 CookMate의 DB 기반 메시지 소스를 사용한다.
     * Spring Framework 전역 MessageSource와는 분리한다.
     */
    @Bean
    public LocalValidatorFactoryBean databaseMessageValidator() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.setValidationMessageSource(databaseMessageSource);
        return validator;
    }

    @Override
    public Validator getValidator() {
        return databaseMessageValidator();
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginUserArgumentResolver);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins("http://localhost:5173") // React 호스트 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 메소드
                .allowCredentials(true); // 쿠키(JSESSIONID)를 주고받기 위해 필수!
    }
}
