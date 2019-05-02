package com.nix.libraryweb.configuration;

import static com.nix.libraryweb.controllers.constants.ViewUrl.SIGNIN;
import static com.nix.libraryweb.controllers.constants.ViewUrl.SIGNUP;
import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Value("${spring.data.rest.base-path}")
    private String baseUri;

    @Autowired
    public WebSecurityConfig(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder, AuthenticationEntryPoint authenticationEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationEntryPoint = authenticationEntryPoint;
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
        String adminRoleExpression = String.format("hasRole('%s')", ADMIN);
        http.authorizeRequests()
                .antMatchers(GET, baseUri + "/users")
                .hasRole(ADMIN)
                .antMatchers(POST, baseUri + "/users")
                .permitAll()
                .antMatchers(PUT, baseUri + "/users/{id}")
                .access(userIdValidatorExpression)
                .antMatchers(baseUri + "/users/{id}/**")
                .access(userIdValidatorExpression + " or " + adminRoleExpression)
                .antMatchers(GET, baseUri + "/books")
                .authenticated()
                .antMatchers(POST, baseUri + "/books")
                .hasRole(ADMIN)
                .antMatchers(PUT, baseUri + "/books/*")
                .hasRole(ADMIN)
                .antMatchers("/", baseUri + "/**")
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .formLogin()
                .loginPage(SIGNIN.getUrl())
                .and()
                .logout()
                .logoutUrl(SIGNUP.getUrl())
                .logoutSuccessUrl(SIGNIN.getUrl())
                .invalidateHttpSession(true);
    }
}
