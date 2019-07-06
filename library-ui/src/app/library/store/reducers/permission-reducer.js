import {actions} from "../constants/permission-constants";
import {extractEventData} from "../utils/helper";

export const permissions = (state = [], action) => {
    if (action.type === actions.FETCH_ALL_PERMISSIONS) {
        return extractEventData(action);
    }
    return state;
};