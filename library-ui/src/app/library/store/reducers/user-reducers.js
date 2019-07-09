import {actions} from "../constants/user-constants";
import {createReducer} from "../utils/helper";

export const users = createReducer({
        message: {},
        items: [],
        pagination: {number: 0}
    },
    actions);