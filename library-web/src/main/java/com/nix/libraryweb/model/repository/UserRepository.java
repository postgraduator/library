package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.nix.libraryweb.model.entity.User;

public interface UserRepository extends PagingAndSortingRepository<User, UUID> {
}
