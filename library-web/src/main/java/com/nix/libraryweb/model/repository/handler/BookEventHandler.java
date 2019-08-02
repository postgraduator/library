package com.nix.libraryweb.model.repository.handler;

import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import com.nix.libraryweb.file.services.FileService;
import com.nix.libraryweb.model.entity.Book;

@Component
@RepositoryEventHandler
public class BookEventHandler {

    private final FileService fileService;

    public BookEventHandler(FileService fileService) {
        this.fileService = fileService;
    }

    @HandleAfterDelete
    public void deleteBookFile(Book book) {
        if (book.getPicturePath() != null) {
            fileService.delete(book.getPicturePath());
        }
    }
}
