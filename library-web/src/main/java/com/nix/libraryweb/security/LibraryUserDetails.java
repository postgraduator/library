package com.nix.libraryweb.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nix.libraryweb.model.projection.SecurityUser;
import com.nix.libraryweb.model.service.UserService;

@Service
public class LibraryUserDetails implements UserDetailsService {

    private final UserService userService;

    public LibraryUserDetails(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.getSecurityUserByName(username)
                .map(this::buildUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + " was not found."));
    }

    private UserDetails buildUserDetails(SecurityUser user) {
        return User.withUsername(user.getId().toString())
                .roles(user.getPermission().getName())
                .password(user.getPassword())
                .build();
    }
}
