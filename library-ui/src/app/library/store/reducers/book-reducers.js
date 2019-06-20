import {actions} from "../constants/book-constants";
import {extractEventData} from "../utils/helper";

export const books = (state = {message: {}, items: [], pagination: {number: 0}, refreshed: false}, action) => {
    switch (action.type) {
        case actions.ADD_NEW_BOOK :
            return _.assign({...state}, extractEventData(action));
        case actions.UPDATE_BOOK :
            return _.assign({...state}, extractEventData(action));
        case actions.GET_BOOKS :
            const eventData = extractEventData(action);
            return  _.assign({...state}, {
                items: _.get(eventData, 'items'),
                pagination: _.get(eventData, 'pagination'),
                refreshed: _.get(eventData, 'refreshed')
            });
        case actions.SHOW_BOOK_ERROR_MESSAGE :
            return _.assign({...state}, extractEventData(action));
        case actions.REMOVE_BOOK_MESSAGE :
            return _.assign({...state}, {message: {}});
        default :
            return state;
    }
};