package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.core.EmbeddedWrapper;
import org.springframework.hateoas.core.EmbeddedWrappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nix.libraryweb.controllers.helper.BasePathAwareLinkBuilderService;
import com.nix.libraryweb.model.dto.LibraryUserGenderDto;
import com.nix.libraryweb.model.service.GenderService;

@BasePathAwareController
public class GenderController {
    private final GenderService genderService;
    private final BasePathAwareLinkBuilderService basePathAwareLinkBuilderService;

    public GenderController(GenderService genderService, BasePathAwareLinkBuilderService basePathAwareLinkBuilderService) {
        this.genderService = genderService;
        this.basePathAwareLinkBuilderService = basePathAwareLinkBuilderService;
    }

    @GetMapping("/genders")
    public @ResponseBody
    ResponseEntity<Resources> getGenders() {
        List<LibraryUserGenderDto> libraryUserGenderDtos = genderService.getLibraryUserGenderDtos();
        EmbeddedWrappers wrapper = new EmbeddedWrappers(false);
        List<EmbeddedWrapper> genders = libraryUserGenderDtos.stream()
                .map(gender -> wrapper.wrap(gender, "genders")).collect(Collectors.toList());
        Resources<EmbeddedWrapper> resource = new Resources<>(genders);
        Link resourceLink = basePathAwareLinkBuilderService
                .buildSelfLink(linkTo(methodOn(GenderController.class).getGenders()));
        resource.add(resourceLink);
        return ResponseEntity.ok(resource);
    }
}
