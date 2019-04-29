package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.Book;

public interface BookRepository extends PagingAndSortingRepository<Book, UUID> {
    @Override
    @RestResource(exported = false)
    <S extends Book> Iterable<S> saveAll(Iterable<S> entities);
}
