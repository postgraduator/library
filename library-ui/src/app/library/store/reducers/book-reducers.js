import {actions} from "../constants/book-constants";
import {extractEventData} from "../utils/helper";

export const books = (state = {message: {}, items: []}, action) => {
    switch (action.type) {
        case actions.ADD_NEW_BOOK :
            return _.assign({...state}, extractEventData(action));
        case actions.GET_BOOKS :
            return  _.assign({...state}, {items: extractEventData(action)});
        case actions.REMOVE_BOOK_MESSAGE :
            return _.assign({...state}, {message: {}});
        case action.MULTI_BOOK_ACTION:
            const batchedActions = extractEventData(action);
            return _(batchedActions)
                .reject(batchedAction => {
                    const {reducer, data} = batchedAction;
                    return reducer(data).type === actions.MULTI_BOOK_ACTION;
                })
                .reduce((result, batchedAction) => {
                    const {reducer, data} = batchedAction;
                    return _.assign(result, books(result, reducer(data)));
                }, {...state});
        default :
            return state;
    }
};