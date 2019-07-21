package com.nix.libraryweb.model.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.model.entity.Book;

public interface BookService {
    Book save(MultipartFile image, Book book);

    Iterable<Book> findByIds(Set<UUID> ids);
}
