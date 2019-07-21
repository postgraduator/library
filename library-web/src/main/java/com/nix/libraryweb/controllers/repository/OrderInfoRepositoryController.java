package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.nix.libraryweb.controllers.helper.BasePathAwareLinkBuilderService;
import com.nix.libraryweb.model.dto.OrderDto;
import com.nix.libraryweb.model.entity.OrderInfo;
import com.nix.libraryweb.model.service.OrderInfoService;

@RepositoryRestController
public class OrderInfoRepositoryController {

    private final OrderInfoService orderInfoService;
    private final BasePathAwareLinkBuilderService basePathAwareLinkBuilderService;

    public OrderInfoRepositoryController(OrderInfoService orderInfoService, BasePathAwareLinkBuilderService basePathAwareLinkBuilderService) {
        this.orderInfoService = orderInfoService;
        this.basePathAwareLinkBuilderService = basePathAwareLinkBuilderService;
    }

    @PostMapping("/users/{userId}/order-info")
    public ResponseEntity<Resource> makeOrder(@PathVariable UUID userId, @RequestBody Set<OrderDto> orderDtos) {
        OrderInfo orderInfo = orderInfoService.makeOrder(userId, orderDtos);
        Resource<OrderInfo> orderInfoResource = new Resource<>(orderInfo);
        Link resourceLink = basePathAwareLinkBuilderService.buildSelfLink(linkTo(methodOn(OrderInfoRepositoryController.class).makeOrder(userId, orderDtos)));
        orderInfoResource.add(resourceLink);
        return ResponseEntity.ok(orderInfoResource);
    }
}
