package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.nix.libraryweb.model.entity.OrderInfo;

public interface OrderInfoRepository extends PagingAndSortingRepository<OrderInfo, UUID> {
}
