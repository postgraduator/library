package com.nix.libraryweb.model.dto;

import java.util.UUID;

public class OrderDto {
    private UUID bookId;
    private Integer count;

    public UUID getBookId() {
        return bookId;
    }

    public void setBookId(UUID bookId) {
        this.bookId = bookId;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
