import {actions} from "../constants/book-constants";
import {setEventData} from "../utils/helper";

export const addNewBook = book => setEventData(actions.ADD_NEW_BOOK, {
    message: {
        text: `The book '${book.name}' was added.`,
        className: 'alert alert-success'
    }
});

export const getBooks = books => setEventData(actions.GET_BOOKS, _.isArray(books) ? [...books] : []);

export const removeBookMessage = () => setEventData(actions.REMOVE_BOOK_MESSAGE, {message: {}});

export const batchActions = batchedContainer => setEventData(actions.MULTI_ACTION, batchedContainer);