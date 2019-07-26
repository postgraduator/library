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

OrderRest.prototype.makeOrder = function (user, orderedBooks) {
    const userPath = _.get(user, '_links.self.href');
    const requestBody = _.map(orderedBooks, (value, key) => ({count: value, bookId: key}));
    return axios.post(`${userPath}/order-info`, requestBody, {
        headers: {
            ...this._csrf.header
        }
    });
};

export const createOrderRest = ({apiPath, csrf}) => new OrderRest(apiPath, csrf);