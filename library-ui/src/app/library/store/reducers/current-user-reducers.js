import {actions} from "../constants/current-user-constant";
import {extractEventData} from "../utils/helper";

export const current = (state = {user: {}, message: {}}, action) => {
    switch (action.type) {
        case actions.GET_CURRENT_USER :
            return _.assign({...state}, extractEventData(action));
        case actions.UPDATE_CURRENT_USER :
            return _.assign({...state}, extractEventData(action));
        case actions.REMOVE_CURRENT_USER_MESSAGE :
            return _.assign({...state}, extractEventData(action));
        case actions.SHOW_CURRENT_USER_ERROR_MESSAGE :
            return _.assign({...state}, extractEventData(action));
        default :
            return state;
    }
};