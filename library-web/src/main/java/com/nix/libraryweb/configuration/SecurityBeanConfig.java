package com.nix.libraryweb.configuration;

import static com.nix.libraryweb.controllers.constants.ViewUrl.SIGNIN;
import static org.apache.commons.lang3.StringUtils.startsWith;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
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
    @Autowired
    public AuthenticationFailureHandler authenticationFailureHandler(ReloadableResourceBundleMessageSource messageSource) {
        String[] codes = {"message.badCredentials"};
        MessageSourceResolvable messageResolvable = new DefaultMessageSourceResolvable(codes, UNAUTHORIZED.getReasonPhrase());
        return (request, response, exception) -> {
            response.setStatus(UNAUTHORIZED.value());
            String authMessage = messageSource.getMessage(messageResolvable, response.getLocale());
            response.getWriter().print(String.format("{\"message\": \"%s\"}", authMessage));
            response.setContentType(APPLICATION_JSON_VALUE);
        };
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return ((request, response, authentication) -> response.setStatus(HttpStatus.OK.value()));
    }
}
