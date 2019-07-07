import {actions} from "../constants/gender-constants";
import {extractEventData} from "../utils/helper";

export const genders = (state = [], action) => {
    if (action.type === actions.FETCH_GENDERS) {
        return extractEventData(action);
    }
    return state;
};