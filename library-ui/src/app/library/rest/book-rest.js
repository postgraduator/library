import axios from "axios";
import {CommonRest} from "../../common/rest/common-rest";

const BookRest = function (apiPth, csrf) {
    CommonRest.call(this, 'books');
    this._basePath = apiPth + '/books';
    this._csrf = csrf;
};

BookRest.prototype = Object.create(CommonRest.prototype);

BookRest.prototype.addNewBook = function (book) {
    const formData = new FormData();
    const file = _.head(book.picture) || null;
    formData.append('book', new Blob([JSON.stringify(_.omit(book, 'picture'))], {type: 'application/json'}));
    formData.append('image', file);
    return axios.post(this._basePath, formData, {
        headers: {
            ...this._csrf.header,
            'content-type': 'multipart/form-data'
        }
    });
};

BookRest.prototype.updateBook = function (book) {
    const formData = new FormData();
    const file = _.head(book.picture) || null;
    const preparedBook = _.flow(_.omit, this._removeEntityLinks)(book, 'picture');
    formData.append('book', new Blob([JSON.stringify(preparedBook)], {type: 'application/json'}));
    formData.append('image', file);
    return axios.put(this._getEntityLink(book), formData, {
        headers: {
            ...this._csrf.header,
            'content-type': 'multipart/form-data'
        }
    });
};

BookRest.prototype.getBooks = function (params) {
    return this._getPagedCollection(params);
};

BookRest.prototype.deleteBook = function (book) {
    return axios.delete(this._getEntityLink(book), {headers: {...this._csrf.header}})
        .then(() => this._removeEntityLinks(book));
};

export const createBookRest = ({apiPath, csrf}) => new BookRest(apiPath, csrf);
