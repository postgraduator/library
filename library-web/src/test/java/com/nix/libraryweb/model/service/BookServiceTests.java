package com.nix.libraryweb.model.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.file.services.FileService;
import com.nix.libraryweb.model.entity.Book;
import com.nix.libraryweb.model.repository.BookRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookServiceTests {
    @Autowired
    private BookService bookService;

    @MockBean
    private FileService fileService;

    @MockBean
    private BookRepository bookRepository;

    @Test
    public void testSaveWithoutFile() {
        bookService.save(null, any(Book.class));
        verify(fileService, never()).save(any(UUID.class), any());
    }

    @Test
    public void testSaveWithFile() {
        UUID bookId = UUID.randomUUID();
        String savedFileName = "something.jpg";
        Book saved = mock(Book.class);
        when(saved.getId()).thenReturn(bookId);
        MultipartFile file = mock(MultipartFile.class);
        when(bookRepository.save(saved)).thenReturn(saved);
        when(fileService.save(bookId, file)).thenReturn(savedFileName);
        bookService.save(file, saved);
        verify(fileService).save(bookId, file);
        verify(saved).setPicturePath(savedFileName);
    }

}
