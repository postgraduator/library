package com.nix.libraryweb.model.service.impl;

import static com.nix.libraryweb.security.constants.LibraryRole.VISITOR;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nix.libraryweb.exceptions.EntityNotFoundException;
import com.nix.libraryweb.model.entity.LibraryUser;
import com.nix.libraryweb.model.entity.Permission;
import com.nix.libraryweb.model.projection.SecurityUser;
import com.nix.libraryweb.model.repository.UserRepository;
import com.nix.libraryweb.model.service.PermissionService;
import com.nix.libraryweb.model.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PermissionService permissionService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PermissionService permissionService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.permissionService = permissionService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<SecurityUser> getSecurityUserByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public LibraryUser createUser(LibraryUser user) {
        user.setPermission(permissionService.findPermissionByName(VISITOR));
        return saveUserWithNewPassword(user);
    }

    @Override
    @Transactional
    public LibraryUser updateUser(UUID id, LibraryUser user) {
        user.setId(id);
        if (isBlank(user.getPassword())) {
            return saveUserWithCurrentPassword(user);
        }
        return saveUserWithNewPassword(user);
    }

    @Override
    @Transactional
    public LibraryUser changeUserPermission(UUID userId, String permissionName) {
        Permission permission = permissionService.findPermissionByName(permissionName);
        return userRepository.findById(userId)
                .map(user -> {
                    user.setPermission(permission);
                    return user;
                })
                .orElseThrow(() -> new EntityNotFoundException("User", "id", userId.toString()));
    }

    private LibraryUser saveUserWithNewPassword(LibraryUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    private LibraryUser saveUserWithCurrentPassword(LibraryUser libraryUser) {
        UUID userId = libraryUser.getId();
        return userRepository
                .findById(userId)
                .map(user -> {
                    libraryUser.setPassword(user.getPassword());
                    libraryUser.setPermission(user.getPermission());
                    return libraryUser;
                })
                .map(userRepository::save)
                .orElseThrow(() -> new EntityNotFoundException("Library user", "id", userId.toString()));
    }
}
