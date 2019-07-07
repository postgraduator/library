import {actions} from "../constants/current-user-constant";
import {setEventData} from "../utils/helper";
import {dangerAction, removeMessage} from "./common-actions";

export const fetchUser = user => setEventData(actions.GET_CURRENT_USER, {user});

export const removeCurrentUserMessage = () => setEventData(actions.REMOVE_CURRENT_USER_MESSAGE, removeMessage());

export const updateCurrentUser = user => setEventData(actions.UPDATE_CURRENT_USER, {
    message: {
        text: 'Profile was updated',
        className: 'alert alert-success'
    },
    user
});

export const showCurrentUserErrorMessage = text => setEventData(actions.SHOW_CURRENT_USER_ERROR_MESSAGE, dangerAction(text));