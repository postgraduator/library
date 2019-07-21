package com.nix.libraryweb.model.service.impl;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.file.services.FileService;
import com.nix.libraryweb.model.entity.Book;
import com.nix.libraryweb.model.repository.BookRepository;
import com.nix.libraryweb.model.service.BookService;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final FileService fileService;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, FileService fileService) {
        this.bookRepository = bookRepository;
        this.fileService = fileService;
    }

    @Override
    @Transactional
    public Book save(MultipartFile image, Book book) {
        Book saved = bookRepository.save(book);
        if (image != null) {
            String savedImageName = fileService.save(saved.getId(), image);
            saved.setPicturePath(savedImageName);
        }
        return saved;
    }

    @Override
    public Iterable<Book> findByIds(Set<UUID> ids) {
        return bookRepository.findAllById(ids);
    }
}
