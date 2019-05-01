package com.nix.libraryweb.controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nix.libraryweb.file.services.FileService;

@Controller
public class ImageStorageController {
    private final FileService fileService;

    public ImageStorageController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/${upload.context}/book/{fileName}")
    public @ResponseBody
    FileSystemResource
    getBookImages(@PathVariable String fileName) {
        return fileService.getFileSystemResourceByFileName(fileName);
    }
}
