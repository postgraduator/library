package com.nix.libraryweb.utils;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nix.libraryweb.exceptions.PasswordValidationException;

public final class SecurityUtils {
    private SecurityUtils() {
    }

    public static PasswordEncoder createPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void validatePassword(String rawPassword, Map<String, Predicate<String>> validators) {
        String brokenConstraints = validators.entrySet().stream()
                .filter(entry -> !entry.getValue().test(rawPassword))
                .map(Map.Entry::getKey)
                .collect(Collectors.joining(", "));
        if (isNotBlank(brokenConstraints)) {
            throw new PasswordValidationException("The password violates constraint " + brokenConstraints);
        }
    }
}
