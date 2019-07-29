CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE BOOK
(
    id           UUID PRIMARY KEY,
    name         VARCHAR(256) UNIQUE NOT NULL,
    picture_path VARCHAR(256),
    count        INT                 NOT NULL CHECK ( count >= 0 ),
    price        DECIMAL(20, 2)      NOT NULL
);

CREATE TABLE LIBRARY_USER
(
    id            UUID PRIMARY KEY,
    name          CITEXT UNIQUE NOT NULL CHECK ( length(name) <= 30 ),
    email         CITEXT UNIQUE NOT NULL CHECK ( length(email) <= 30 ),
    password      VARCHAR(60)   NOT NULL,
    birthday      DATE,
    gender        VARCHAR(6),
    permission_id NUMERIC(2)    NOT NULL
);

CREATE TABLE ORDERED_BOOK
(
    id            UUID PRIMARY KEY,
    book_id       UUID,
    order_info_id UUID,
    count         INT            NOT NULL CHECK ( count > 0 ),
    price         DECIMAL(20, 2) NOT NULL
);

CREATE TABLE ORDER_INFO
(
    id              UUID PRIMARY KEY,
    library_user_id UUID,
    created_on      TIMESTAMP NOT NULL,
    closed_on       TIMESTAMP
);

CREATE TABLE PERMISSION
(
    id   NUMERIC(2) PRIMARY KEY,
    name VARCHAR(20) UNIQUE
);

ALTER TABLE LIBRARY_USER
    ADD CONSTRAINT "fk_library_user_permission_id" FOREIGN KEY (permission_id) REFERENCES PERMISSION (id);
ALTER TABLE ORDERED_BOOK
    ADD CONSTRAINT "fk_ordered_book_book_id" FOREIGN KEY (book_id) REFERENCES BOOK (id);
ALTER TABLE ORDERED_BOOK
    ADD CONSTRAINT "fk_ordered_book_ordered_info_id" FOREIGN KEY (order_info_id) REFERENCES ORDER_INFO (id);
ALTER TABLE ORDER_INFO
    ADD CONSTRAINT "fk_library_library_user_id" FOREIGN KEY (library_user_id) REFERENCES LIBRARY_USER (id);
