import {getUniqueKey} from "../../utils/data-utils";
import {actions} from "../constants/user-constants";
import {createReducerWithSpecialActions} from "../utils/helper";

const specialActions = _.set({}, actions.GET_USER_BY_ID, (state, user) => {
    const getItemsWithUser = items => {
        const userId = getUniqueKey(user);
        const updatedItems = _.cloneDeep(items);
        const savedUser = _.find(updatedItems, item => getUniqueKey(item) === userId);
        savedUser || _.assign(savedUser, user);
        return savedUser ? updatedItems : [{...user}];
    };

    const newSate = _.clone(state);
    newSate.items = getItemsWithUser(newSate.items);
    return newSate;
});

export const users = createReducerWithSpecialActions({
        message: {},
        items: [],
        pagination: {number: 0}
    },
    actions,
    specialActions
);