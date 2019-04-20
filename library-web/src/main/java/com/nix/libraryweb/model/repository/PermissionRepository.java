package com.nix.libraryweb.model.repository;

import java.util.Optional;

import com.nix.libraryweb.model.entity.Permission;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource(exported = false)
public interface PermissionRepository extends Repository<Permission, Long> {
    Optional<Permission> findByName(String name);
}
