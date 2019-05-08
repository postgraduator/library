package com.nix.libraryweb.security;

import static com.nix.libraryweb.utils.SecurityUtils.createPasswordEncoder;
import static com.nix.libraryweb.utils.SecurityUtils.validatePassword;
import static java.util.Collections.unmodifiableMap;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LibraryUserPasswordEncoder implements PasswordEncoder {

    private final PasswordEncoder encoder = createPasswordEncoder();
    private final Map<String, Predicate<String>> predicateMap;

    public LibraryUserPasswordEncoder(@Value("${constraint.password.min}") int rawPasswordMinLength,
                                      @Value("${constraint.password.max}") int rawPasswordMaxLength,
                                      @Value("${constraint.password.pattern}") String passwordPattern) {
        Map<String, Predicate<String>> modifiablePredicateMap = new HashMap<>();
        modifiablePredicateMap.put("min", password -> password.length() >= rawPasswordMinLength);
        modifiablePredicateMap.put("max", password -> password.length() <= rawPasswordMaxLength);
        modifiablePredicateMap.put("pattern", password -> password.matches(passwordPattern));
        predicateMap = unmodifiableMap(modifiablePredicateMap);
    }

    @Override
    public String encode(CharSequence rawPassword) {
        validatePassword(String.valueOf(rawPassword), predicateMap);
        return encoder.encode(rawPassword);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public boolean upgradeEncoding(String encodedPassword) {
        return encoder.upgradeEncoding(encodedPassword);
    }
}
