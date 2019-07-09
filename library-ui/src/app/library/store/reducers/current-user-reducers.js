import {actions} from "../constants/current-user-constant";
import {createReducer} from "../utils/helper";

export const current = createReducer({user: {}, message: {}}, actions);