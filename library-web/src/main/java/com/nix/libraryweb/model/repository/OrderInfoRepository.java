package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.OrderInfo;

@RestResource(rel = "order-info", path = "order-info")
public interface OrderInfoRepository extends PagingAndSortingRepository<OrderInfo, UUID> {
    @Override
    @RestResource(exported = false)
    <S extends OrderInfo> S save(S entity);
}
