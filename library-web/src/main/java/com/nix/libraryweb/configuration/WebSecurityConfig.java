package com.nix.libraryweb.configuration;

import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static com.nix.libraryweb.security.constants.LibraryRole.VISITOR;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.data.rest.base-path}")
    private String baseUri;

    @Autowired
    public WebSecurityConfig(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String userIdValidatorExpression = "@userAccessGuard.validateUserId(authentication, #id)";
        String adminRoleExpression = String.format("hasRole('%s')", ADMIN.getName());
        http.authorizeRequests()
                .antMatchers("/")
                .hasAnyRole(ADMIN.getName(), VISITOR.getName())
                .antMatchers(POST, baseUri + "/users")
                .permitAll()
                .antMatchers(PUT, baseUri + "/users/{id}")
                .access(userIdValidatorExpression)
                .antMatchers(baseUri + "/users/{id}/**")
                .access(userIdValidatorExpression + " or " + adminRoleExpression)
                .antMatchers(POST, baseUri + "/books/**")
                .hasRole(ADMIN.getName());
    }
}
