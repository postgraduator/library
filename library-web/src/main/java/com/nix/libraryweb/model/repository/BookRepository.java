package com.nix.libraryweb.model.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
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
    List<Book> findAllByNameContains(String name, Pageable pageable);
}
