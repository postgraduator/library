package com.nix.libraryweb.model.service;

import java.util.Set;
import java.util.UUID;

import com.nix.libraryweb.model.dto.OrderDto;
import com.nix.libraryweb.model.entity.OrderInfo;

public interface OrderInfoService {
    OrderInfo makeOrder(UUID userId, Set<OrderDto> orderDtos);
}
