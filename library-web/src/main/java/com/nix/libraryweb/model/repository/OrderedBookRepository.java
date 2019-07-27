package com.nix.libraryweb.model.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.nix.libraryweb.model.entity.OrderedBook;

@RestResource(exported = false)
public interface OrderedBookRepository extends CrudRepository<OrderedBook, UUID> {
}
