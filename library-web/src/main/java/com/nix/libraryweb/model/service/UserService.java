package com.nix.libraryweb.model.service;

import java.util.Optional;
import java.util.UUID;

import com.nix.libraryweb.model.entity.LibraryUser;
import com.nix.libraryweb.model.projection.SecurityUser;

public interface UserService {
    Optional<SecurityUser> getSecurityUserByName(String name);

    LibraryUser createUser(LibraryUser user);

    LibraryUser updateUser(UUID id, LibraryUser user);

    LibraryUser changeUserPermission(UUID userId, String permissionName);
}
