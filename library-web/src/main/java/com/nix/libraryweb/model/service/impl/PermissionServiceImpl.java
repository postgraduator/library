package com.nix.libraryweb.model.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nix.libraryweb.exceptions.EntityNotFoundException;
import com.nix.libraryweb.model.entity.Permission;
import com.nix.libraryweb.model.repository.PermissionRepository;
import com.nix.libraryweb.model.service.PermissionService;

@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionServiceImpl(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Permission findPermissionByName(String name) {
        return permissionRepository.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Permission", "name", name));
    }
}
