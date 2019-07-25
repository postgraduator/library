import {crudActions, nonCrudActions} from "../constants/book-constants";
import {setEventData} from "../utils/helper";
import {dangerAction, fetchAction, removeMessage, successCrudAction, warningCrudAction} from "./common-actions";

export const addNewBook = book => setEventData(crudActions.ADD_NEW_BOOK, successCrudAction(`The book '${book.name}' was added.`));

export const updateBook = book => setEventData(crudActions.UPDATE_BOOK, successCrudAction(`The book '${book.name}' was updated.`));

export const deleteBook = book => setEventData(crudActions.DELETE_BOOK, warningCrudAction(`The book '${book.name}' was deleted.`));

export const showBookErrorMessage = text => setEventData(nonCrudActions.SHOW_BOOK_ERROR_MESSAGE, dangerAction(text));

export const getBooks = ({data, pagination, sort, filters}) =>
    setEventData(nonCrudActions.GET_BOOKS, fetchAction(data, pagination, sort, filters));

export const removeBookMessage = () => setEventData(nonCrudActions.REMOVE_BOOK_MESSAGE, removeMessage());