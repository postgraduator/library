package com.nix.libraryweb.controllers.constants;

public enum  ViewUrl {
    SIGNIN("/signin"), SIGNUP("/signup");

    private String url;

    ViewUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
