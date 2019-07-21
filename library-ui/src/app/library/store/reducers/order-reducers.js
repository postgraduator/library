import {actions} from "../constants/order-constants";
import {createReducerWithSpecialActions} from "../utils/helper";

export const order = createReducerWithSpecialActions({
        message: {},
        items: []
    },
    actions,
    _.set({}, actions.ADD_TO_ORDER, (state, {book, count}) => {
        const newState = _.cloneDeep(state);
        const orderedBook = _.find(newState.items, ['name', book.name]);
        orderedBook ? _.set(orderedBook, 'count', count) : newState.items.push({book, count});
        return newState;
    }));