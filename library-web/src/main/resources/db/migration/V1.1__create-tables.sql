CREATE TABLE BOOK
(
  id           BINARY(16) PRIMARY KEY,
  name         VARCHAR(256) UNIQUE NOT NULL,
  picture_path VARCHAR(256),
  count        INT                 NOT NULL CHECK ( count >= 0 ),
  price        DECIMAL(20, 2)      NOT NULL
);

CREATE TABLE LIBRARY_USER
(
  id            BINARY(16) PRIMARY KEY,
  name          VARCHAR(30) UNIQUE  NOT NULL,
  email         VARCHAR(256) UNIQUE NOT NULL,
  password      VARCHAR(60)         NOT NULL,
  birthday      DATE,
  gender        VARCHAR(6),
  permission_id INT(2)              NOT NULL
);

CREATE TABLE ORDERED_BOOK
(
  id            BINARY(16) PRIMARY KEY,
  book_id       BINARY(16)     NOT NULL,
  order_info_id BINARY(16)     NOT NULL,
  price         DECIMAL(20, 2) NOT NULL
);

CREATE TABLE ORDER_INFO
(
  id              BINARY(16) PRIMARY KEY,
  library_user_id BINARY(16) NOT NULL,
  created_on      TIMESTAMP  NOT NULL,
  closed_on       TIMESTAMP  NOT NULL
);

CREATE TABLE PERMISSION
(
  id   INT(2) PRIMARY KEY,
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
