import {actions} from "../constants/user-constants";
import {setEventData} from "../utils/helper";

export const fetchUser = user => setEventData(actions.GET_USER, {
    current: {...user}
});

export const getUsers = ({users, pagination}) => setEventData(actions.GET_PAGE_OF_USERS, {
    items: _.isArray(users) ? users : [],
    pagination,
    refreshed: true
});

export const showUserErrorMessage = text => setEventData(actions.SHOW_USER_ERROR_MESSAGE, {
    message: {
        text,
        className: 'alert alert-danger'
    }
});

export const removeUserMessage = () => setEventData(actions.REMOVE_USER_MESSAGE, {
    message: {}
});