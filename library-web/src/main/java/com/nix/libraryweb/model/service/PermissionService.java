package com.nix.libraryweb.model.service;

import java.util.List;

import com.nix.libraryweb.model.entity.Permission;

public interface PermissionService {
    Permission findPermissionByName(String name);

    List<Permission> findAll();
}
