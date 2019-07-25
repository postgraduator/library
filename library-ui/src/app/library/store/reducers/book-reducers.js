import {crudActions, nonCrudActions} from "../constants/book-constants";
import {createReducer} from "../utils/helper";

export const books = createReducer({
        message: {},
        sort: {name: ''},
        items: [],
        pagination: {number: 0}
    },
    _.assign(_.clone(crudActions), nonCrudActions)
);

export const availableBooks = createReducer({
    message: {},
    sort: {name: 'asc'},
    filters: {count: 0},
    items: [],
    pagination: {number: 0}
}, nonCrudActions);