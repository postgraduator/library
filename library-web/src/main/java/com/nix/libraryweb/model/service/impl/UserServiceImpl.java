package com.nix.libraryweb.model.service.impl;

import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nix.libraryweb.exceptions.EntityNotFoundException;
import com.nix.libraryweb.model.entity.LibraryUser;
import com.nix.libraryweb.model.projection.SecurityUser;
import com.nix.libraryweb.model.repository.UserRepository;
import com.nix.libraryweb.model.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<SecurityUser> getSecurityUserByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public LibraryUser createUser(LibraryUser user) {
        return saveUserWithNewPassword(user);
    }

    @Override
    @Transactional
    public LibraryUser updateUser(UUID id, LibraryUser user) {
        if (isBlank(user.getPassword())) {
            return saveUserWithCurrentPassword(id, user);
        }
        return saveUserWithNewPassword(user);
    }

    private LibraryUser saveUserWithNewPassword(LibraryUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    private LibraryUser saveUserWithCurrentPassword(UUID userId, LibraryUser user) {
        return userRepository
                .findById(userId)
                .map(LibraryUser::getPassword)
                .map(password -> {
                    user.setPassword(password);
                    return user;
                })
                .map(userRepository::save)
                .orElseThrow(() -> new EntityNotFoundException("Library user", "id", userId.toString()));
    }
}
