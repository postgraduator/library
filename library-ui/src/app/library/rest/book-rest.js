import axios from "axios";
import {CommonRest} from "../../common/rest/common-rest";

const BookRest = function (apiPth, csrf) {
    CommonRest.call(this, 'books');
    this._basePath = apiPth + '/books';
    this._csrf = csrf;
};

BookRest.prototype = Object.create(CommonRest.prototype);

BookRest.prototype.addNewBook = function(book, file) {
    const formData = new FormData();
    formData.append('book', new Blob([JSON.stringify(book)], {type: 'application/json'}));
    formData.append('image', file);
    return axios.post(this._basePath, formData, {headers:{...this._csrf.header, 'content-type': 'multipart/form-data'}});
};

BookRest.prototype.getBooks = function (params) {
    return axios.get(this._basePath, {params}).then(this._getEmbeddedCollection.bind(this));
};

export const createBookRest = ({apiPath, csrf}) => new BookRest(apiPath, csrf);
