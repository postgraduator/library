package com.nix.libraryweb.model.service;

import com.nix.libraryweb.model.entity.Permission;

public interface PermissionService {
    Permission findPermissionByName(String name);
}
