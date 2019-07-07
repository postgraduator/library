package com.nix.libraryweb.controllers.helper;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public interface BasePathAwareLinkBuilderService {
    Link buildSelfLink(ControllerLinkBuilder linkBuilder);
}
