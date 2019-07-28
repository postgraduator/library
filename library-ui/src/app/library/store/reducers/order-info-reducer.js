import {actions} from "../constants/order-info-constants";
import {createReducer} from "../utils/helper";

export const orderInfo = createReducer({
    message: {},
    sort: {createdOn: 'asc'},
    items: [],
    pagination: {number: 0}
}, actions);