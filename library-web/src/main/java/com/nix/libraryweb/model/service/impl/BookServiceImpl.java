package com.nix.libraryweb.model.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.model.entity.Book;
import com.nix.libraryweb.model.service.BookService;

@Service
public class BookServiceImpl implements BookService {
    private final BookService bookService;

    @Autowired
    public BookServiceImpl(BookService bookService) {
        this.bookService = bookService;
    }

    @Override
    public Book save(MultipartFile image, Book book) {
        return null;
    }
}
