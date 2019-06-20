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
    const preparedBook = _.flow(_.omit, this._removeEntityLinks.bind(this))(book, 'picture');
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
    return axios.get(this._basePath, {params})
        .then(({data}) => ({
            ...this._getEmbeddedCollection({data}),
            pagination: _.get(data, 'page')
        }));
};

export const createBookRest = ({apiPath, csrf}) => new BookRest(apiPath, csrf);
