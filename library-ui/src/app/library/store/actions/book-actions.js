import {actions} from "../constants/book-constants";
import {setEventData} from "../utils/helper";

export const addNewBook = book => setEventData(actions.ADD_NEW_BOOK, {
    message: {
        text: `The book '${book.name}' was added.`,
        className: 'alert alert-success'
    },
    refreshed: false
});

export const updateBook = book => setEventData(actions.UPDATE_BOOK, {
    message: {
        text: `The book '${book.name}' was updated.`,
        className: 'alert alert-success'
    },
    refreshed: false
});

export const deleteBook = book => setEventData(actions.DELETE_BOOK, {
    message: {
        text: `The book '${book.name}' was deleted.`,
        className: 'alert alert-warning'
    },
    refreshed: false
});

export const showBookErrorMessage = text => setEventData(actions.SHOW_BOOK_ERROR_MESSAGE, {
    message: {
        text,
        className: 'alert alert-danger'
    }
});

export const getBooks = ({books, pagination}) => setEventData(actions.GET_BOOKS, {
    items: _.isArray(books) ? [...books] : [],
    pagination,
    refreshed: true
});

export const removeBookMessage = () => setEventData(actions.REMOVE_BOOK_MESSAGE, {message: {}});