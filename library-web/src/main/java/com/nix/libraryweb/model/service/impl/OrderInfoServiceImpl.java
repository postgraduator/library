package com.nix.libraryweb.model.service.impl;

import static java.util.stream.Collectors.toSet;
import static java.util.stream.StreamSupport.stream;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nix.libraryweb.exceptions.BadOrderException;
import com.nix.libraryweb.model.dto.OrderDto;
import com.nix.libraryweb.model.entity.Book;
import com.nix.libraryweb.model.entity.OrderInfo;
import com.nix.libraryweb.model.entity.OrderedBook;
import com.nix.libraryweb.model.repository.OrderInfoRepository;
import com.nix.libraryweb.model.service.BookService;
import com.nix.libraryweb.model.service.OrderInfoService;
import com.nix.libraryweb.model.service.UserService;

@Service
public class OrderInfoServiceImpl implements OrderInfoService {

    private final BookService bookService;
    private final OrderInfoRepository orderInfoRepository;
    private final UserService userService;

    public OrderInfoServiceImpl(BookService bookService, OrderInfoRepository orderInfoRepository, UserService userService) {
        this.bookService = bookService;
        this.orderInfoRepository = orderInfoRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public OrderInfo makeOrder(UUID userId, Set<OrderDto> orderDtos) {
        Iterable<Book> books = fetchOrderedBooks(orderDtos);
        validateBooks(books, orderDtos);
        Set<OrderedBook> orderedBooks = stream(books.spliterator(), false)
                .map(this::mapBook)
                .collect(toSet());
        return saveOrderInfo(userId, orderedBooks);
    }

    private OrderedBook mapBook(Book book) {
        OrderedBook orderedBook = new OrderedBook();
        orderedBook.setBook(book);
        orderedBook.setPrice(book.getPrice());
        return orderedBook;
    }

    private Iterable<Book> fetchOrderedBooks(Set<OrderDto> orderDtos) {
        Set<UUID> requestedBookIds = orderDtos.stream()
                .map(OrderDto::getBookId)
                .collect(toSet());
        return bookService.findByIds(requestedBookIds);
    }

    private void validateBooks(Iterable<Book> books, Set<OrderDto> orderDtos) {
        if (books.spliterator().getExactSizeIfKnown() != orderDtos.size() && areAllBookAvailable(books, orderDtos)) {
            throw new BadOrderException("Some of the books can not be ordered.");
        }

    }

    private boolean areAllBookAvailable(Iterable<Book> books, Set<OrderDto> orderDtos) {
        int availableForOrderBookCount = stream(books.spliterator(), false)
                .filter(book -> isBookAvailableForOrder(book, orderDtos))
                .map(Book::getId)
                .collect(toSet())
                .size();
        return orderDtos.size() == availableForOrderBookCount;
    }

    private boolean isBookAvailableForOrder(Book book, Set<OrderDto> orderDtos) {
        return orderDtos.stream()
                .filter(orderDto -> Objects.equals(orderDto.getBookId(), book.getId()))
                .findFirst()
                .filter(orderDto -> book.getCount() >= orderDto.getCount())
                .isPresent();
    }

    private OrderInfo saveOrderInfo(UUID userId, Set<OrderedBook> orderedBooks) {
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setLibraryUser(userService.getLibraryUserById(userId));
        orderInfo.setOrderedBooks(orderedBooks);
        return orderInfoRepository.save(orderInfo);
    }

}
