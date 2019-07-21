import axios from "axios";
import {CommonRest} from "../../common/rest/common-rest";

const OrderRest = function (apiPath, csrf) {
    CommonRest.call(this, 'orderInfos');
    this._csrf = csrf;
    this._basePath = apiPath + '/order-info';
};

OrderRest.prototype.getOrders = function (params) {
    return this._getPagedCollection(params);
};

OrderRest.prototype.makeOrder = function (orderedBooks, params) {
    const requestBody = _.map(orderedBooks, ({book, count}) => {
        const bookId = _(this._getEntityLink(book))
            .split('/')
            .last();
        return {bookId, count};
    });
    return axios.post(this._basePath, requestBody, {
        headers: {
            ...this._csrf
        },
        params
    });
};

export const createOrderRest = ({apiPath, csrf}) => new OrderRest(apiPath, csrf);