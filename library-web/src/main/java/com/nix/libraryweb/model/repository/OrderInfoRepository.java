package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.OrderInfo;

@RestResource(rel = "order-info", path = "order-info")
public interface OrderInfoRepository extends Repository<OrderInfo, UUID> {
    @RestResource(exported = false)
    <S extends OrderInfo> S save(S entity);

    @RestResource(exported = false)
    Page<OrderInfo> findAllByLibraryUserId(UUID userId, Pageable pageable);
}
