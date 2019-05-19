package com.nix.libraryweb.model.dto;


import com.nix.libraryweb.model.entity.LibraryUser.Gender;

public class LibraryUserGenderDto {
    private String value;
    private String view;

    public LibraryUserGenderDto(String value, String view) {
        this.value = value;
        this.view = view;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getView() {
        return view;
    }

    public void setView(String view) {
        this.view = view;
    }
}
