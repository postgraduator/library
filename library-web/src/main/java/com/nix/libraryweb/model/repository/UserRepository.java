package com.nix.libraryweb.model.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.LibraryUser;
import com.nix.libraryweb.model.projection.SecurityUser;

@RestResource(path = "/users")
public interface UserRepository extends PagingAndSortingRepository<LibraryUser, UUID> {
    @RestResource(exported = false)
    Optional<SecurityUser> findByName(String name);

    @Override
    @RestResource(exported = false)
    <S extends LibraryUser> S save(S entity);

    @Query(value = "FROM LibraryUser WHERE id = ?#{@userServiceImpl.getCurrentLibraryUserId()}")
    @RestResource(rel = "current", path = "current")
    Optional<LibraryUser> findCurrentUser();
}
