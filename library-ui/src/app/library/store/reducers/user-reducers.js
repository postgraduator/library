import actions from "../constants/user-constants";
import {extractEventData} from "../utils/helper";

export const user = (state = {}, action) => {
    if (action.type === actions.GET_USER) {
        return extractEventData(action);
    }
    return state;
};