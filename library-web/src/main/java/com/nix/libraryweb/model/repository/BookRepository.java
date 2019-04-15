package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.nix.libraryweb.model.entity.Book;

public interface BookRepository extends PagingAndSortingRepository<Book, UUID> {
}
