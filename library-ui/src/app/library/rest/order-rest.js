import axios from "axios";
import {CommonRest} from "../../common/rest/common-rest";

const OrderRest = function (apiPath, csrf) {
    CommonRest.call(this, 'order-info');
    this._csrf = csrf;
    this._entityPath = 'order-info';
    this._basePath = apiPath + '/users';
};

OrderRest.prototype = Object.create(CommonRest.prototype);

OrderRest.prototype.getOrders = function (params) {
    const orderInfoLink = () => this.buildBaseLink(_.get(params, 'fetchParams.userId'));
    return this._getFilteredPagedCollection(params, orderInfoLink);
};

OrderRest.prototype.buildBaseLink = function (userId) {
    return `${this._basePath}/${userId}/${this._entityPath}`
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