package com.nix.libraryweb.controllers.repository;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

import java.util.UUID;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.controllers.helper.BasePathAwareLinkBuilderService;
import com.nix.libraryweb.model.entity.Book;
import com.nix.libraryweb.model.service.BookService;

@RepositoryRestController
public class BookRepositoryController {
    private final BookService bookService;
    private final BasePathAwareLinkBuilderService basePathAwareLinkBuilderService;

    public BookRepositoryController(BookService bookService, BasePathAwareLinkBuilderService basePathAwareLinkBuilderService) {
        this.bookService = bookService;
        this.basePathAwareLinkBuilderService = basePathAwareLinkBuilderService;
    }

    @PostMapping(value = "/books", consumes = MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody
    ResponseEntity<Resource> saveNewBook(@RequestPart(value = "image", required = false) MultipartFile file,
                                         @RequestPart("book") Book book) {
        Book newBook = bookService.save(file, book);
        Resource<Book> bookResource = new Resource<>(newBook);
        Link resourceLink = basePathAwareLinkBuilderService
                .buildSelfLink(linkTo(methodOn(BookRepositoryController.class).saveNewBook(file, newBook)));
        bookResource.add(resourceLink);
        return ResponseEntity.ok(bookResource);
    }

    @PutMapping(value = "/books/{id}", consumes = MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody
    ResponseEntity<Resource> updateBook(@PathVariable("id") UUID bookId,
                                         @RequestPart(value = "image", required = false) MultipartFile file,
                                         @RequestPart("book") Book book) {
        book.setId(bookId);
        Book updatedBook = bookService.save(file, book);
        Resource<Book> bookResource = new Resource<>(updatedBook);
        Link resourceLink = basePathAwareLinkBuilderService
                .buildSelfLink(linkTo(methodOn(BookRepositoryController.class).updateBook(bookId, file, updatedBook)));
        bookResource.add(resourceLink);
        return ResponseEntity.ok(bookResource);
    }
}
