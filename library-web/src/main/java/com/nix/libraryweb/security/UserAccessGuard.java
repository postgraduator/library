package com.nix.libraryweb.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class UserAccessGuard {
    public boolean validateUserId(Authentication authentication, String id) {
        return authentication.getName().equals(id);
    }
}
