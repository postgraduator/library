package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nix.libraryweb.model.entity.LibraryUser;
import com.nix.libraryweb.model.service.UserService;

@RepositoryRestController
public class UserRepositoryController {
    private final UserService userService;

    @Autowired
    public UserRepositoryController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public @ResponseBody ResponseEntity<Resource> createLibraryUser(@RequestBody LibraryUser user) {
        LibraryUser createdUser = userService.createUser(user);
        Resource<LibraryUser> userResource = new Resource<>(createdUser);
        userResource.add(linkTo(methodOn(UserRepositoryController.class).createLibraryUser(createdUser)).withSelfRel());
        return ResponseEntity.ok(userResource);
    }

    @PutMapping("/users/{id}")
    public @ResponseBody ResponseEntity<Resource> saveLibraryUser(@PathVariable UUID id, @RequestBody LibraryUser user) {
        LibraryUser updatedUser = userService.updateUser(id, user);
        Resource<LibraryUser> userResource = new Resource<>(updatedUser);
        userResource.add(linkTo(methodOn(UserRepositoryController.class).saveLibraryUser(id, updatedUser)).withSelfRel());
        return ResponseEntity.ok(userResource);
    }

    @PutMapping("/users/{id}/change-permission")
    public @ResponseBody ResponseEntity<Resource> changeUserPermission(@PathVariable UUID id, @RequestParam String name) {
        LibraryUser libraryUser = userService.changeUserPermission(id, name);
        Resource<LibraryUser> userResource = new Resource<>(libraryUser);
        userResource.add(linkTo(methodOn(UserRepositoryController.class).changeUserPermission(id, name)).withSelfRel());
        return ResponseEntity.ok(userResource);
    }


}
