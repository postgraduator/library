package com.nix.libraryweb.configuration;

import static com.nix.libraryweb.controllers.constants.ViewUrl.SIGNIN;
import static org.apache.commons.lang3.StringUtils.startsWith;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class SecurityBeanConfig {

    private final String baseUri;
    private final String contextPath;

    public SecurityBeanConfig(@Value("${spring.data.rest.base-path}") String baseUri,
                              @Value("${server.servlet.context-path}") String contextPath) {
        this.baseUri = baseUri;
        this.contextPath = contextPath;
    }

    @Bean
    public AuthenticationEntryPoint apiAuthenticationEntryPoint() {
        return (HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) -> {
            if (startsWith(request.getPathInfo(), baseUri + "/")) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
            response.sendRedirect(contextPath + SIGNIN.getUrl());
        };
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
        };
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return ((request, response, authentication) -> response.setStatus(HttpStatus.OK.value()));
    }
}
