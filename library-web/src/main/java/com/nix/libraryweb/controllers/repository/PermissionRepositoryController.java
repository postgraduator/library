package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nix.libraryweb.controllers.helper.BasePathAwareLinkBuilderService;
import com.nix.libraryweb.model.entity.Permission;
import com.nix.libraryweb.model.service.PermissionService;

@BasePathAwareController
public class PermissionRepositoryController {

    private final PermissionService permissionService;
    private final BasePathAwareLinkBuilderService basePathAwareLinkBuilderService;

    public PermissionRepositoryController(PermissionService permissionService, BasePathAwareLinkBuilderService basePathAwareLinkBuilderService) {
        this.permissionService = permissionService;
        this.basePathAwareLinkBuilderService = basePathAwareLinkBuilderService;
    }

    @GetMapping("/permissions")
    @ResponseBody
    public ResponseEntity<Resources> getAll() {
        List<Permission> permissions = permissionService.findAll();
        Resources<Permission> resources = new Resources<>(permissions);
        Link resourceLink = basePathAwareLinkBuilderService
                .buildSelfLink(linkTo(methodOn(PermissionRepositoryController.class).getAll()));
        resources.add(resourceLink);
        return ResponseEntity.ok(resources);
    }
}
