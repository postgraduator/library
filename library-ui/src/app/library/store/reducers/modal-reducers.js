import {actions} from "../constants/modal-constants";
import {extractEventData} from "../utils/helper";

export const modal = (state = {}, action) => {
    if (_.includes(actions, action.type)) {
        return _.assign({...state}, extractEventData(action));
    }
    return state;
};