import {actions} from "../constants/book-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, fetchAction, removeMessage, successCrudAction, warningCrudAction} from "./common-actions";

export const addNewBook = book => setEventData(actions.ADD_NEW_BOOK, successCrudAction(`The book '${book.name}' was added.`));

export const updateBook = book => setEventData(actions.UPDATE_BOOK, successCrudAction(`The book '${book.name}' was updated.`));

export const deleteBook = book => setEventData(actions.DELETE_BOOK, warningCrudAction(`The book '${book.name}' was deleted.`));

export const showBookErrorMessage = text => setEventData(actions.SHOW_BOOK_ERROR_MESSAGE, dangerAction(text));

export const getBooks = ({data, pagination, sort, filters}) =>
    setEventData(actions.GET_BOOKS, fetchAction(data, pagination, sort, filters));

export const removeBookMessage = () => setEventData(actions.REMOVE_BOOK_MESSAGE, removeMessage());

export const sortBooks = sort => setEventData(actions.SORT_BOOKS, sort);