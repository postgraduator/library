import axios from "axios";
import {CommonRest} from "../../common/rest/common-rest";

const OrderRest = function (apiPath, csrf) {
    CommonRest.call(this, 'order-info');
    this._csrf = csrf;
    this._basePath = apiPath + '/order-info';
};

OrderRest.prototype = Object.create(CommonRest.prototype);

OrderRest.prototype.getOrders = function (params) {
    const orderInfoLink = _.get(params, 'fetchParams.user._links.orderInfos.href');
    return this._getFilteredPagedCollection(params, orderInfoLink);
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