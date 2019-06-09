package com.nix.libraryweb.file.services.impl;

import static java.nio.file.Files.createFile;
import static java.nio.file.Files.deleteIfExists;
import static java.nio.file.Files.write;
import static org.apache.commons.lang3.StringUtils.substringAfterLast;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nix.libraryweb.exceptions.FileProcessingException;
import com.nix.libraryweb.file.services.FileService;

@Service
public class FileServiceImpl implements FileService {

    private final String uploadPath;

    public FileServiceImpl(@Value("${upload.path}") String uploadPath) {
        this.uploadPath = uploadPath;
    }

    @Override
    public String save(UUID id, MultipartFile file) {
        try {
            String fileName = createFileName(id, file.getOriginalFilename());
            String fullPath = getFullFilePath(fileName);
            Path newFile = createFile(Paths.get(fullPath));
            write(newFile, file.getBytes());
            return fileName;
        } catch (IOException e) {
            throw new FileProcessingException("The file " + file.getName() + " can not be saved", e);
        }
    }

    @Override
    public FileSystemResource getFileSystemResourceByFileName(String name) {
        return Optional.of(new FileSystemResource(Paths.get(getFullFilePath(name))))
                .filter(FileSystemResource::isFile)
                .orElseThrow(() -> new FileProcessingException("The problem occured during retrieving file " + name));

    }

    @Override
    public void delete(String name) {
        try {
            deleteIfExists(Paths.get(getFullFilePath(name)));
        } catch (IOException e) {
            throw new FileProcessingException("The problem occured during file deletion " + name, e);
        }
    }

    private String createFileName(UUID id, String multipartFileName) {
        String dot = ".";
        return id.toString() + dot + substringAfterLast(multipartFileName, dot);
    }

    private String getFullFilePath(String fileName) {
        return uploadPath + FileSystems.getDefault().getSeparator() + fileName;

    }
}
