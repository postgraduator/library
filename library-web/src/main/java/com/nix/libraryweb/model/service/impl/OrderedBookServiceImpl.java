package com.nix.libraryweb.model.service.impl;

import static java.util.stream.Collectors.toSet;
import static com.google.common.collect.Sets.newHashSet;

import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nix.libraryweb.model.entity.OrderInfo;
import com.nix.libraryweb.model.entity.OrderedBook;
import com.nix.libraryweb.model.repository.OrderedBookRepository;
import com.nix.libraryweb.model.service.OrderedBookService;

@Service
public class OrderedBookServiceImpl implements OrderedBookService {

    private final OrderedBookRepository orderedBookRepository;

    public OrderedBookServiceImpl(OrderedBookRepository orderedBookRepository) {
        this.orderedBookRepository = orderedBookRepository;
    }

    @Override
    @Transactional
    public Set<OrderedBook> saveALlWithOrderInfo(OrderInfo orderInfo, Set<OrderedBook> orderedBooks) {
        Set<OrderedBook> orderedBooksWithInfo = orderedBooks.stream()
                .peek(orderedBook -> orderedBook.setOrderInfo(orderInfo))
                .collect(toSet());
        return newHashSet(orderedBookRepository.saveAll(orderedBooksWithInfo));
    }
}
