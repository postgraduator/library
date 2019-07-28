package com.nix.libraryweb.model.repository;

import java.util.UUID;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.Book;

public interface BookRepository extends PagingAndSortingRepository<Book, UUID> {
    @Override
    @RestResource(exported = false)
    <S extends Book> Iterable<S> saveAll(Iterable<S> entities);

    @Override
    @RestResource(exported = false)
    <S extends Book> S save(S entity);

    @RestResource(rel = "name-contains", path = "name-contains")
    Page<Book> findAllByNameContains(String name, Pageable pageable);

    @RestResource(rel = "greater-than", path = "greater-than")
    Page<Book> findBooksByCountGreaterThan(Integer count, Pageable pageable);

    @Override
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints(@QueryHint(name = "javax.persistence.lock.timeout", value = "5000"))
    Iterable<Book> findAllById(Iterable<UUID> uuids);
}
