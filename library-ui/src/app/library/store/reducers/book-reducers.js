import {actions} from "../constants/book-constants";
import {createReducer} from "../utils/helper";

export const books = createReducer({
        message: {},
        sort: {name: ''},
        items: [],
        pagination: {number: 0}
    },
    actions
);