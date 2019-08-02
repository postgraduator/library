import {actions} from "../constants/order-info-constants";
import {createReducerWithSpecialActions} from "../utils/helper";

export const DEFAULT_PAGE_STATE = {
    sort: {createdOn: 'desc'},
    items: [],
    pagination: {number: 0}
};

const specialActions = _.set({}, actions.GET_USER_ORDER_INFO, (state, {items, pagination, sort, filters, userId}) => {
    const pageState = _.defaults({sort, pagination, items}, _.cloneDeep(DEFAULT_PAGE_STATE));
    return _.set(_.clone(state), userId, {...pageState, filters});
});

export const orderInfo = createReducerWithSpecialActions({
    message: {}
}, actions, specialActions);