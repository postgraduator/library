package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nix.libraryweb.model.dto.LibraryUserGenderDto;
import com.nix.libraryweb.model.service.GenderService;

@RepositoryRestController
public class GenderController {
    private final GenderService genderService;

    public GenderController(GenderService genderService) {
        this.genderService = genderService;
    }

    @GetMapping("/genders")
    public @ResponseBody
    ResponseEntity<Resource> getGenders() {
        Resource<List<LibraryUserGenderDto>> resource = new Resource<>(genderService.getLibraryUserGenderDtos());
        resource.add(linkTo(methodOn(GenderController.class).getGenders()).withSelfRel());
        return ResponseEntity.ok(resource);
    }
}
