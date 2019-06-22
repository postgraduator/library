import {actions} from "../constants/book-constants";
import {extractEventData} from "../utils/helper";

export const books = (state = {message: {}, items: [], pagination: {number: 0}, refreshed: false}, action) => {
    switch (action.type) {
        case actions.ADD_NEW_BOOK :
            return _.assign({...state}, extractEventData(action));
        case actions.UPDATE_BOOK :
            return _.assign({...state}, extractEventData(action));
        case actions.GET_BOOKS :
            return  _.assign({...state}, extractEventData(action));
        case actions.DELETE_BOOK :
            return _.assign({...state}, extractEventData(action));
        case actions.SHOW_BOOK_ERROR_MESSAGE :
            return _.assign({...state}, extractEventData(action));
        case actions.REMOVE_BOOK_MESSAGE :
            return _.assign({...state}, {message: {}});
        default :
            return state;
    }
};