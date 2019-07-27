import {actions} from "../constants/order-constants";
import {createReducerWithSpecialActions} from "../utils/helper";

const specialActions = _.set({}, actions.ADD_TO_ORDER, (state, {book, count}) => {
    const newState = _.cloneDeep(state);
    const orderedBook = _.find(newState.items, ['book.name', book.name]);
    orderedBook ? _.set(orderedBook, 'count', count) : newState.items.push({book, count});
    return newState;
});

_.set(specialActions, actions.ADD_ONE_TO_ORDER, (state, book) => {
    const newState = _.cloneDeep(state);
    const orderedBook = _.find(newState.items, ['book.name', book.name]);
    orderedBook ? _.set(orderedBook, 'count', ++orderedBook.count) : newState.items.push({book, count: 1});
    return newState;
});

_.set(specialActions, actions.REMOVE_ORDER_ITEM, (state, book) => {
    const newState = _.cloneDeep(state);
    const orderedBooks = _.reject(newState.items, ['book.name', book.name]);
    return _.set(newState, 'items', orderedBooks);
});

export const order = createReducerWithSpecialActions({
        message: {},
        items: []
    },
    actions,
    specialActions
    );