import {actions} from "../constants/user-constants";
import {extractEventData} from "../utils/helper";

export const users = (state = {message: {}, items: [], pagination: {number: 0}, refreshed: false}, action) => {
    switch (action.type) {
        case actions.GET_PAGE_OF_USERS :
            return _.assign({...state}, extractEventData(action));
        case actions.DELETE_USER :
            return _.assign({...state}, extractEventData(action));
        case actions.UPDATE_USER_PERMISSION :
            return _.assign({...state}, extractEventData(action));
        case actions.REMOVE_USER_MESSAGE :
            return _.assign({...state}, extractEventData(action));
        default :
            return state;
    }
};