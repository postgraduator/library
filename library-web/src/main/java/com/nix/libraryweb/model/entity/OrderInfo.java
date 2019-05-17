package com.nix.libraryweb.model.entity;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class OrderInfo {
    @Id
    @GeneratedValue
    private UUID id;
    @CreationTimestamp
    @Column(updatable = false)
    private Date createdOn;
    private Date closedOn;
    @OneToMany
    private Set<OrderedBook> orderedBooks;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Date getClosedOn() {
        return closedOn;
    }

    public void setClosedOn(Date closedOn) {
        this.closedOn = closedOn;
    }

    public Set<OrderedBook> getOrderedBooks() {
        return orderedBooks;
    }

    public void setOrderedBooks(Set<OrderedBook> orderedBooks) {
        this.orderedBooks = orderedBooks;
    }
}
