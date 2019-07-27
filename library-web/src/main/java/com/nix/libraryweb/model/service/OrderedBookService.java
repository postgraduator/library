package com.nix.libraryweb.model.service;

import java.util.Set;

import com.nix.libraryweb.model.entity.OrderInfo;
import com.nix.libraryweb.model.entity.OrderedBook;

public interface OrderedBookService {
    Set<OrderedBook> saveALlWithOrderInfo(OrderInfo orderInfo, Set<OrderedBook> orderedBooks);
}
