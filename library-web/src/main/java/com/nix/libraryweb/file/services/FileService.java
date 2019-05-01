package com.nix.libraryweb.file.services;

import java.util.UUID;

import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String save(UUID id, MultipartFile file);

    FileSystemResource getFileSystemResourceByFileName(String name);

    void delete(String name);
}
