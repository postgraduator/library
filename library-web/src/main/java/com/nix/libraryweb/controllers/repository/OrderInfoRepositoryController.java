package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/users/{userId}/order-info")
    public ResponseEntity<PagedResources> getOrders(@PathVariable UUID userId, Pageable pageable, @RequestParam(required = false) String sort) {
        Pageable sortPageable =createSortedPageable(pageable, sort);
        Page<OrderInfo> orderInfos = orderInfoService.getOrdersByUserId(userId, sortPageable);
        PagedResources orderInfoResources = PagedResources.wrap(
                orderInfos.getContent(),
                new PagedResources.PageMetadata(orderInfos.getSize(), orderInfos.getNumber(), orderInfos.getTotalElements(), orderInfos.getTotalPages()));
        Link resourceLink = basePathAwareLinkBuilderService.buildSelfLink(linkTo(methodOn(OrderInfoRepositoryController.class).getOrders(userId, sortPageable, sort)));
        orderInfoResources.add(resourceLink);
        return ResponseEntity.ok(orderInfoResources);
    }

    private Pageable createSortedPageable(Pageable pageable, String sortString) {
        if (sortString == null) {
            return pageable;
        }
        String[] sortParams = sortString.split(",");
        String property = sortParams[0];
        String direction = sortParams.length > 1 ? sortParams[1] : null;
        Sort.Order order = Sort.Order.by(property).with(createDirection(direction));
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(order));
    }

    private Sort.Direction createDirection(String direction) {
        if (direction == null) {
            return Sort.Direction.ASC;
        }
        return Sort.Direction.fromString(direction.toLowerCase());
    }
}
