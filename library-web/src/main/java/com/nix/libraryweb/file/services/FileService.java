package com.nix.libraryweb.file.services;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String save(UUID id, MultipartFile file);

    byte[] getFileByName(String name);

    void delete(String name);
}
