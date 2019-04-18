package com.nix.libraryweb.exceptions;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String name, String parameterName, String parameter) {
        super(String.format("%s with %s %s was not found", name, parameterName, parameter));
    }
}
