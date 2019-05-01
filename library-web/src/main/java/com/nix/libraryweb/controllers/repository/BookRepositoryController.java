package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.UUID;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.model.entity.Book;
import com.nix.libraryweb.model.service.BookService;

@RepositoryRestController
public class BookRepositoryController {
    private final BookService bookService;

    public BookRepositoryController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/books")
    public @ResponseBody
    ResponseEntity<Resource> saveNewBook(@RequestPart("image") MultipartFile file,
                                         @RequestPart("book") Book book) {
        Book newBook = bookService.save(file, book);
        Resource<Book> bookResource = new Resource<>(newBook);
        bookResource.add(linkTo(methodOn(BookRepositoryController.class).saveNewBook(file, newBook)).withSelfRel());
        return ResponseEntity.ok(bookResource);
    }

    @PutMapping("/books/{id}")
    public @ResponseBody
    ResponseEntity<Resource> updateBook(@PathVariable("id") UUID bookId,
                                         @RequestPart("image") MultipartFile file,
                                         @RequestPart("book") Book book) {
        book.setId(bookId);
        Book updatedBook = bookService.save(file, book);
        Resource<Book> bookResource = new Resource<>(updatedBook);
        bookResource.add(linkTo(methodOn(BookRepositoryController.class).updateBook(bookId, file, updatedBook)).withSelfRel());
        return ResponseEntity.ok(bookResource);
    }


}
