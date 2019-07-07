package com.nix.libraryweb.controllers.helper.impl;

import java.net.URI;

import javax.servlet.ServletContext;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.support.BaseUriLinkBuilder;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.stereotype.Service;

import com.nix.libraryweb.controllers.helper.BasePathAwareLinkBuilderService;

@Service
public class BasePathAwareLinkBuilderServiceImpl implements BasePathAwareLinkBuilderService {

    private final URI contextBaseURI;
    private final URI restBaseURI;

    public BasePathAwareLinkBuilderServiceImpl(ServletContext servletContext, RepositoryRestConfiguration config) {
        contextBaseURI = URI.create(servletContext.getContextPath());
        restBaseURI = config.getBasePath();
    }

    @Override
    public Link buildSelfLink(ControllerLinkBuilder linkBuilder) {
        return BaseUriLinkBuilder.create(contextBaseURI)
                .slash(restBaseURI)
                .slash(contextBaseURI.relativize(URI.create(linkBuilder.toUri().getPath()))).withSelfRel();
    }
}
