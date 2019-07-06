package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nix.libraryweb.model.entity.Permission;
import com.nix.libraryweb.model.service.PermissionService;

@BasePathAwareController
public class PermissionRepositoryController {

    private final PermissionService permissionService;

    public PermissionRepositoryController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("/permissions")
    @ResponseBody
    public ResponseEntity<Resources> getAll() {
        List<Permission> permissions = permissionService.findAll();
        Resources<Permission> resources = new Resources<>(permissions);
        resources.add(linkTo(methodOn(PermissionRepositoryController.class).getAll()).withSelfRel());
        return ResponseEntity.ok(resources);
    }
}
