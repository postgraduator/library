package com.nix.libraryweb.model.projection;

import java.util.UUID;

import com.nix.libraryweb.model.entity.Permission;

public interface SecurityUser {
    UUID getId();
    String getPassword();
    Permission getPermission();
}
