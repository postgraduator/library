package com.nix.libraryweb.model.repository;

import java.util.UUID;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.Book;

public interface BookRepository extends PagingAndSortingRepository<Book, UUID> {
    @Override
    @RestResource(exported = false)
    <S extends Book> Iterable<S> saveAll(Iterable<S> entities);

    @Override
    @RestResource(exported = false)
    <S extends Book> S save(S entity);

    @RestResource(rel = "by-name-contains-and-author", path = "by-name-contains-and-author")
    @Query(value = "FROM Book b WHERE (:name IS NULL OR b.name LIKE %:name%) AND (:author IS NULL OR b.author LIKE %:author%)")
    Page<Book> findAllByNameContainsAndAuthor(@Param("name") String name, @Param("author") String author, Pageable pageable);

    @RestResource(rel = "greater-than", path = "greater-than")
    Page<Book> findBooksByCountGreaterThan(Integer count, Pageable pageable);

    @Override
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints(@QueryHint(name = "javax.persistence.lock.timeout", value = "5000"))
    Iterable<Book> findAllById(Iterable<UUID> uuids);
}
